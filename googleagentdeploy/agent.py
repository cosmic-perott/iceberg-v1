from google.adk.agents import LlmAgent
from google.adk.tools import agent_tool
from google.adk.tools.google_search_tool import GoogleSearchTool
from google.adk.tools import url_context
from google.adk.tools.mcp_tool import McpToolset
from google.adk.tools.mcp_tool.mcp_session_manager import StdioConnectionParams
from mcp import StdioServerParameters

CONNECTION_STRING = [URI]


hotel_expert_agent_mongodb_agent = LlmAgent(
    name="hotel_expert_agent_mongodb",
    model="gemini-2.5-flash",
    description='A database assistant that MUST use its McpToolset to execute live MongoDB queries.',
    sub_agents=[],
    instruction="CRITICAL: You have active, real-time administrative access to a live MongoDB Atlas cluster via your McpToolset. Do not tell the user you cannot access a database. When you receive a request, you MUST call your provided MCP tools (like mongodb_list_databases, mongodb_find_documents, etc.) to fetch or update the data.",
    tools=[
        McpToolset(
            connection_params=StdioConnectionParams(
                server_params=StdioServerParameters(
                    command="npx",
                    args=["-y", "mongodb-mcp-server"],
                    env={"MDB_MCP_CONNECTION_STRING": CONNECTION_STRING},
                ),
                timeout=30,
            ),
        )
    ],
)

memory_agent_mongodb_agent = LlmAgent(
    name="memory_agent_mongodb",
    model="gemini-2.5-flash",
    description='A database assistant that MUST use its McpToolset to execute live MongoDB queries.',
    sub_agents=[],
    instruction="CRITICAL: You have active, real-time administrative access to a live MongoDB Atlas cluster via your McpToolset. Do not tell the user you cannot access a database. When you receive a request, you MUST call your provided MCP tools (like mongodb_list_databases, mongodb_find_documents, etc.) to fetch or update the data.",
    tools=[
        McpToolset(
            connection_params=StdioConnectionParams(
                server_params=StdioServerParameters(
                    command="npx",
                    args=["-y", "mongodb-mcp-server"],
                    env={"MDB_MCP_CONNECTION_STRING": CONNECTION_STRING},
                ),
                timeout=30,
            ),
        )
    ],
)

food_critic_agent_mongodb_agent = LlmAgent(
    name="food_critic_agent_mongodb",  
    model="gemini-2.5-flash",
    description='A database assistant that MUST use its McpToolset to execute live MongoDB queries.',
    sub_agents=[],
    instruction="CRITICAL: You have active, real-time administrative access to a live MongoDB Atlas cluster via your McpToolset. Do not tell the user you cannot access a database. When you receive a request, you MUST call your provided MCP tools (like mongodb_list_databases, mongodb_find_documents, etc.) to fetch or update the data.",
    tools=[
        McpToolset(
            connection_params=StdioConnectionParams(
                server_params=StdioServerParameters(
                    command="npx",
                    args=["-y", "mongodb-mcp-server"],
                    env={"MDB_MCP_CONNECTION_STRING": CONNECTION_STRING},
                ),
                timeout=30,
            ),
        )
    ],
)

attraction_scout_agent_mongodb_agent = LlmAgent(
    name="attraction_scout_agent_mongodb",  
    model="gemini-2.5-flash",
    description='A database assistant that MUST use its McpToolset to execute live MongoDB queries.',
    sub_agents=[],
    instruction="CRITICAL: You have active, real-time administrative access to a live MongoDB Atlas cluster via your McpToolset. Do not tell the user you cannot access a database. When you receive a request, you MUST call your provided MCP tools (like mongodb_list_databases, mongodb_find_documents, etc.) to fetch or update the data.",
    tools=[
        McpToolset(
            connection_params=StdioConnectionParams(
                server_params=StdioServerParameters(
                    command="npx",
                    args=["-y", "mongodb-mcp-server"],
                    env={"MDB_MCP_CONNECTION_STRING": CONNECTION_STRING},
                ),
                timeout=30,
            ),
        )
    ],
)


hotel_expert_agent_google_search_agent = LlmAgent(
  name='Hotel_Expert_Agent_google_search_agent',
  model='gemini-2.5-flash',
  description='Agent specialized in performing Google searches.',
  sub_agents=[],
  instruction='Use the GoogleSearchTool to find information on the web.',
  tools=[GoogleSearchTool()],
)
hotel_expert_agent_url_context_agent = LlmAgent(
  name='Hotel_Expert_Agent_url_context_agent',
  model='gemini-2.5-flash',
  description='Agent specialized in fetching content from URLs.',
  sub_agents=[],
  instruction='Use the UrlContextTool to retrieve content from provided URLs.',
  tools=[url_context],
)

food_critic_agent_google_search_agent = LlmAgent(
  name='Food_Critic_Agent_google_search_agent',
  model='gemini-2.5-flash',
  description='Agent specialized in performing Google searches.',
  sub_agents=[],
  instruction='Use the GoogleSearchTool to find information on the web.',
  tools=[GoogleSearchTool()],
)
food_critic_agent_url_context_agent = LlmAgent(
  name='Food_Critic_Agent_url_context_agent',
  model='gemini-2.5-flash',
  description='Agent specialized in fetching content from URLs.',
  sub_agents=[],
  instruction='Use the UrlContextTool to retrieve content from provided URLs.',
  tools=[url_context],
)

attraction_scout_agent_google_search_agent = LlmAgent(
  name='Attraction_Scout_Agent_google_search_agent',
  model='gemini-2.5-flash',
  description='Agent specialized in performing Google searches.',
  sub_agents=[],
  instruction='Use the GoogleSearchTool to find information on the web.',
  tools=[GoogleSearchTool()],
)
attraction_scout_agent_url_context_agent = LlmAgent(
  name='Attraction_Scout_Agent_url_context_agent',
  model='gemini-2.5-flash',
  description='Agent specialized in fetching content from URLs.',
  sub_agents=[],
  instruction='Use the UrlContextTool to retrieve content from provided URLs.',
  tools=[url_context],
)



hotel_expert_agent = LlmAgent(
  name='hotel_expert_agent',
  model='gemini-2.5-flash',
  description='Lodging research specialist that searches travel forums and Reddit to find honest hotel reviews.',
  sub_agents=[],
  instruction='You are a cynical, highly analytical lodging researcher. Check hotel_expert_agent_mongodb first, then open web search tools. Provide links to any hotels found.',
  tools=[
    agent_tool.AgentTool(agent=hotel_expert_agent_google_search_agent),
    agent_tool.AgentTool(agent=hotel_expert_agent_url_context_agent),
    agent_tool.AgentTool(agent=hotel_expert_agent_mongodb_agent),
  ],
)

food_critic_agent = LlmAgent(
  name='food_critic_agent',
  model='gemini-2.5-flash',
  description='A culinary research specialist that scans dining forums, local blogs, and review maps.',
  sub_agents=[],
  instruction='You are a highly analytical culinary researcher. Use food_critic_agent_mongodb first, then open web search tools. Provide links to any restaurants found.',
  tools=[
    agent_tool.AgentTool(agent=food_critic_agent_google_search_agent),
    agent_tool.AgentTool(agent=food_critic_agent_url_context_agent),
    agent_tool.AgentTool(agent=food_critic_agent_mongodb_agent)
  ],
)

attraction_scout_agent = LlmAgent(
  name='attraction_scout_agent',
  model='gemini-2.5-flash',
  description='A sightseeing research specialist that maps out local attractions and entertainment spots.',
  sub_agents=[],
  instruction='You are a highly analytical sightseeing researcher. Use attraction_scout_agent_mongodb first, then open web search tools. Provide links to any attractions found.',
  tools=[
    agent_tool.AgentTool(agent=attraction_scout_agent_google_search_agent),
    agent_tool.AgentTool(agent=attraction_scout_agent_url_context_agent),
    agent_tool.AgentTool(agent=attraction_scout_agent_mongodb_agent)
  ],
)


manager_agent_google_search_agent = LlmAgent(
  name='Manager_Agent_google_search_agent',
  model='gemini-2.5-flash',
  description='Agent specialized in performing Google searches.',
  sub_agents=[],
  instruction='Use the GoogleSearchTool to find information on the web.',
  tools=[GoogleSearchTool()],
)

manager_agent_url_context_agent = LlmAgent(
  name='Manager_Agent_url_context_agent',
  model='gemini-2.5-flash',
  description='Agent specialized in fetching content from URLs.',
  sub_agents=[],
  instruction='Use the UrlContextTool to retrieve content from provided URLs.',
  tools=[url_context],
)

manager_agent = LlmAgent(
  name='manager_agent',  # FIXED: Removed duplicate utility string name
  model='gemini-2.5-flash',
  description='Lead orchestration travel agent that coordinates team sub-agents to synthesize comprehensive database and open-web travel reports.',
  sub_agents=[hotel_expert_agent, food_critic_agent, attraction_scout_agent],
  instruction='You are the Lead Travel Coordinator. Parse the location request, coordinate sub-agents simultaneously, and compile findings into an Unfiltered Travel Guide response.',
  tools=[
      agent_tool.AgentTool(agent=manager_agent_google_search_agent),
      agent_tool.AgentTool(agent=manager_agent_url_context_agent)
    ],
)

memory_agent = LlmAgent(
  name='memory_storage_agent',
  model='gemini-2.5-flash',
  description='ur job is to store the users choices and preferences back into the mongodb database',
  sub_agents=[],
  instruction='when the root_agent gives the JSON file, store that data in the memory database',
  tools=[
      agent_tool.AgentTool(agent=memory_agent_mongodb_agent),
    ],
)

root_agent = LlmAgent(
    model='gemini-2.5-flash',
    name='planner_agent',
    description='your job is to make a schedule based on the users requirements such as dates, number of people etc. and build a schedule using the list of attractions/hotels/restaurant that the user wants',
    sub_agents=[manager_agent, memory_agent],
    instruction=(  # FIXED: Cleaned up the triple-quote formatting collision
        "when i give you a list of attractions/hotels/restaurant and my requirements, "
        "pick ONE hotel. Take into reference the past decisions of the user when planning their trips "
        "to make a fully customised trip plan according to the user's preferences. The past decisions "
        "are stored in the memory database of the mongodb database.\n\n"
        "Pick which attractions/restaurant i should go to on which date specifically. "
        "RETURN THE RESULTS SO THAT I CAN PUT THIS INTO A JSON FILE AND IT WOULD STILL WORK"
        "Return EXACTLY in this JSON file format:\n"
        "{\n"
        "  \"date\": \"dd/mm/yy\",\n"
        "  \"attractions\": [\n"
        "    {\n"
        "      \"attraction name\": \"name\",\n"
        "      \"attraction time\": \"1pm\",\n"
        "      \"attraction description\": \"short description\"\n"
        "    }\n"
        "  ],\n"
        "  \"restaurants\": [\n"
        "    {\n"
        "      \"restaurant name\": \"name\",\n"
        "      \"restaurant time\": \"7pm\",\n"
        "      \"food description\": \"short description\"\n"
        "    }\n"
        "  ]\n"
        "}\n\n"
        "Make it realistic so that I could actually follow this schedule. Leave at least a 1~3hr gap between each activity."
    ),
    tools=[  # FIXED: Consolidated duplicate array definitions safely here
        agent_tool.AgentTool(agent=memory_agent_mongodb_agent),
        agent_tool.AgentTool(agent=manager_agent_google_search_agent),
        agent_tool.AgentTool(agent=manager_agent_url_context_agent)
    ],
)
