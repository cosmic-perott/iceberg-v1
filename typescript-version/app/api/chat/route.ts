import { NextRequest, NextResponse } from 'next/server';
import { GoogleAuth } from 'google-auth-library';

// The production regional Agent Studio execution endpoint
const ENDPOINT = 'https://us-central1-aiplatform.googleapis.com/v1/projects/project-b86e0955-d007-4347-bf5/locations/us-central1/agents/agent_1779541809524:predict';

export async function POST(req: NextRequest) {
  try {
    // Proxy the raw incoming payload text seamlessly
    const payload = await req.json();

    // Initialize GoogleAuth without hardcoded keys to use ADC automatically
    // This will pick up the built-in credentials from the Compute Engine VM / Cloud Shell
    const auth = new GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });
    
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();

    if (!accessToken.token) {
      throw new Error("Failed to retrieve access token from Google Auth ADC context.");
    }

    // Execute POST request directly to the production regional Agent Studio execution endpoint
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Vertex AI Error (${response.status}): ${errorText}`);
    }

    // Clean up the chunk packets to stream the data back to the client
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }
        
        const decoder = new TextDecoder();
        const encoder = new TextEncoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          buffer += decoder.decode(value, { stream: true });
          
          // Attempt to parse and clean up Vertex AI JSON response chunks (handles NDJSON streaming)
          const lines = buffer.split('\n');
          if (lines.length > 1) {
            for (let i = 0; i < lines.length - 1; i++) {
              const line = lines[i].trim();
              if (!line) continue;
              
              try {
                const data = JSON.parse(line);
                let outputText = '';
                
                // Extract the actual text content from common Vertex AI Agent response structures
                if (data.predictions && data.predictions.length > 0) {
                  const pred = data.predictions[0];
                  outputText = typeof pred === 'string' ? pred : (pred.content || pred.text || JSON.stringify(pred));
                } else if (data.text) {
                  outputText = data.text;
                } else if (data.output) {
                  outputText = data.output;
                } else {
                  outputText = line; // fallback
                }
                
                controller.enqueue(encoder.encode(outputText));
              } catch (e) {
                // If not valid JSON, just send the raw line
                controller.enqueue(encoder.encode(line + '\n'));
              }
            }
            buffer = lines[lines.length - 1]; // Keep the last incomplete line
          }
        }
        
        // Flush any remaining data in the buffer
        if (buffer.trim()) {
          try {
            const data = JSON.parse(buffer);
            let outputText = '';
            if (data.predictions && data.predictions.length > 0) {
              const pred = data.predictions[0];
              outputText = typeof pred === 'string' ? pred : (pred.content || pred.text || JSON.stringify(pred));
            } else if (data.text) {
              outputText = data.text;
            } else if (data.output) {
              outputText = data.output;
            } else {
              outputText = buffer;
            }
            controller.enqueue(encoder.encode(outputText));
          } catch (e) {
            controller.enqueue(encoder.encode(buffer));
          }
        }
        
        controller.close();
      }
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error: any) {
    console.error('Backend Proxy Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}
