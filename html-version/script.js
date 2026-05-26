const searchBar = document.getElementById('search-bar');
        const timeline = document.getElementById('timeline');
        const spinner = document.getElementById('status-spinner');

        searchBar.addEventListener('keydown', async (e) => {
            if (e.key === 'Enter' && searchBar.value.trim() !== '') {
                const userPrompt = searchBar.value;
                
                // Slide up view panels immediately
                document.body.classList.add('active-chat');
                
                // Append User prompt node
                appendMessage(userPrompt, 'user-message');
                searchBar.value = '';
                
                // Launch network sequence to your python agent server
                spinner.style.display = 'block';
                timeline.appendChild(spinner);
                timeline.scrollTop = timeline.scrollHeight;

                try {
                    const response = await fetch('http://127.0.0.1:8000/api/chat', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ prompt: userPrompt })
                    });
                    
                    const data = await response.json();
                    spinner.style.display = 'none';
                    
                    if (data.response) {
                        appendMessage(data.response, 'agent-message');
                    } else {
                        appendMessage("Error parsing context matrix from agent node.", 'agent-message');
                    }
                } catch (err) {
                    spinner.style.display = 'none';
                    appendMessage(`Network Connection Failure: Ensure server.py is running on port 8000. Stack: ${err.message}`, 'agent-message');
                }
            }
        });

        function appendMessage(text, className) {
            const el = document.createElement('div');
            el.className = `message ${className}`;
            el.textContent = text;
            timeline.appendChild(el);
            timeline.scrollTop = timeline.scrollHeight;
        }
