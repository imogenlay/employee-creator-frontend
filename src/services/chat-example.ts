import type { ChatResponse } from "./chat-services";

export const CHAT_EXAMPLE: ChatResponse[] = [
  {
    role: "user",
    content: `I want to build an API into my Spring Boot application that interacts with Claude. When I ask questions like this I usually get a giant tutorial which I do not want. I want short answers from here on out that tell me what the immediate next step is.
       
So, what I want to do is add a way for my frontend to ask the backend to send off an API request to Claude. These requests ideally are going to run an SQL query on the backend and retrieve useful information. Eventually I will add a chatbox to the frontend but that can be done later. What is my first step?`,
  },
  {
    role: "assistant",
    content:
      "Create a REST controller in your Spring Boot app with a POST endpoint like `/api/claude` that accepts a prompt string and returns Claude's response. That's it — start there.",
  },
  {
    role: "user",
    content:
      "I now have a ClaudeController that accepts a prompt at `/claude`. Currently it just returns the prompt sent by the user.",
  },
  {
    role: "assistant",
    content:
      "Now create a `ClaudeService` that makes the HTTP call to the Anthropic API and inject it into your controller.",
  },
  {
    role: "user",
    content:
      "Please explain what that might look like, you can be a bit more verbose.",
  },
  {
    role: "assistant",
    content: `Your \`ClaudeService\` should use Spring's \`RestTemplate\` or \`WebClient\` to POST to \`https://api.anthropic.com/v1/messages\`. Here's a minimal example:

\`@Service
public class ClaudeService {

    @Value("\${anthropic.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public String ask(String prompt) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("x-api-key", apiKey);
        headers.set("anthropic-version", "2023-06-01");
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = Map.of(
            "model", "claude-sonnet-4-20250514",
            "max_tokens", 1024,
            "messages", List.of(Map.of("role", "user", "content", prompt))
        );

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
        ResponseEntity<Map> response = restTemplate.postForEntity(
            "https://api.anthropic.com/v1/messages", request, Map.class
        );

        // Pull the text out of the response
        List<Map> content = (List<Map>) response.getBody().get("content");
        return (String) content.get(0).get("text");
    }
}
\`

Store your API key in \`application.properties\` as \`anthropic.api.key=sk-...\`, then inject \`ClaudeService\` into your controller and call \`claudeService.ask(prompt)\` instead of returning the prompt directly.`,
  },
  {
    role: "user",
    content: `It worked! I sent a prompt of:

\`{
    "prompt": "Is this claude I am calling?"
}
\`

The reply came:

\`Yes, I'm Claude, an AI assistant created by Anthropic. How can I help you today?\`

How would I keep this conversation going. If I just prompt again it will have lost the existing context?`,
  },
  {
    role: "assistant",
    content: `Correct. You need to pass the full conversation history with each request. 

Your next step is to change your endpoint to accept a \`List<Message>\` (with \`role\` and \`content\` fields) instead of a plain \`String\` prompt, and pass that whole list as the \`messages\` array to the Anthropic API. The client is responsible for keeping track of the history and sending it each time.`,
  },
  {
    role: "user",
    content:
      "I have made it so the server can now receive a whole conversation and reply to it. I also went ahead and built the frontend chatbox. Users can now communicate with Claude through the chat. How would I allow Claude access to the information in the database so that it can run queries? Additionally, how do I supply context at the beginning of a conversation so that Claude knows what it's purpose is?",
  },
  {
    role: "assistant",
    content: `Two things:

1. System prompt — The Anthropic API accepts a \`"system"\` field at the top level of your request body. Add it alongside \`"messages"\`:

\`Map<String, Object> body = Map.of(
    "model", "claude-sonnet-4-20250514",
    "max_tokens", 1024,
    "system", "You are a helpful assistant for [your app]. You help users query sales data...",
    "messages", conversationHistory
);
\`

2. Database access — The simplest approach is query-on-your-side: Claude tells you what data it needs (or you anticipate it), you fetch it from MySQL, then inject the results into the conversation as a system or user message before sending to Claude. Claude doesn't connect to your DB directly.

The typical flow is:
1. User asks a question
2. You fetch relevant data from MySQL in your service layer
3. You prepend it to the conversation as context, e.g. \`"Here is the relevant data: [JSON results]"\`
4. Send the full conversation to Claude

Start with the system prompt first — that's one line. Then decide what data Claude needs access to and query it before each API call.`,
  },
  {
    role: "user",
    content:
      "I want my Spring application to double as an MCP Server so that the AI can interact with my data via that. How would I implement this?",
  },
  {
    role: "assistant",
    content: `Your first step is to add the Spring AI MCP Server dependency to your \`pom.xml\`:

\`<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-mcp-server-spring-boot-starter</artifactId>
</dependency>\`

This gives you the scaffolding to expose your Spring beans as MCP tools. Once that's in, the next step is annotating methods with \`@Tool\` so Claude can discover and call them.

Do you have Spring AI already in your project, or is this a fresh addition?`,
  },
  {
    role: "user",
    content:
      "I have just added the dependency, and a simple tool in the service layer. How do I expose this to the AI?",
  },
  {
    role: "assistant",
    content: `Register your service as an MCP tool bean in your config:

\`@Bean
public ToolCallbackProvider myTools(YourService yourService) {
    return MethodToolCallbackProvider.builder()
        .toolObjects(yourService)
        .build();
}\`

Spring AI will automatically scan for \`@Tool\` annotated methods on \`yourService\` and expose them via the MCP protocol at \`/mcp\` (SSE) or \`/mcp/message\` depending on your transport config.

What transport are you using — SSE or stdio?`,
  },
  {
    role: "user",
    content: "I don't know what transport I am using. Presumably neither.",
  },
  {
    role: "assistant",
    content: `Since you're building a web app, you want SSE (Server-Sent Events). Add this to your \`application.properties\`:

\`spring.ai.mcp.server.transport=SSE\`

Then your MCP endpoint will be available at \`http://localhost:8080/mcp/sse\`. That's the URL you'd point a client (like Claude Desktop or your own frontend) at to discover and call your tools.`,
  },
  {
    role: "user",
    content:
      "Please write what that might look like/what I will have to add to my application to get that working. I am very unfamiliar with all this, so feel free to explain.",
  },
  {
    role: "assistant",
    content: `Sure! Here's a full picture of what you need:

1. \`application.properties\`
\`spring.ai.mcp.server.transport=SSE
spring.ai.mcp.server.name=my-app
spring.ai.mcp.server.version=1.0.0\`

2. A tool in your service — the \`@Tool\` annotation is what MCP picks up:
\`@Service
public class MyService {

    @Autowired
    private MyRepository myRepository;

    @Tool(description = "Fetches all customers from the database")
    public List<Customer> getAllCustomers() {
        return myRepository.findAll();
    }
}\`

The \`description\` is important — it's how Claude knows when to use the tool.

3. Register the service as a tool provider in a \`@Configuration\` class:
\`@Configuration
public class McpConfig {

    @Bean
    public ToolCallbackProvider myTools(MyService myService) {
        return MethodToolCallbackProvider.builder()
            .toolObjects(myService)
            .build();
    }
}\`

That's all Spring needs. When your app starts, it will expose an SSE endpoint at \`/mcp/sse\`.

How it works end-to-end:
- A client (Claude Desktop, or your own code) connects to \`/mcp/sse\`
- It discovers your tools and their descriptions
- When Claude decides it needs customer data, it calls your tool automatically
- Your tool queries MySQL and returns the result to Claude

The key insight is that you don't call the tools yourself — Claude decides when to call them based on the descriptions you write. So write descriptions that clearly explain what each tool does and what data it returns.`,
  },
  {
    role: "user",
    content:
      "Alright, but I am calling Claude via a RestTemplate. How do I clue Claude into the fact that it can get info via my tool?",
  },
  {
    role: "assistant",
    content: `This is the catch — you can't with a plain REST call to the Anthropic API. \`RestTemplate\` just sends JSON back and forth; there's no way to tell the hosted Claude API to connect back to your MCP server.

You have two options:

Option A — Use tool definitions in the API request (simpler)
Instead of MCP, you define your tools directly in the JSON body you send to Claude. Claude replies with a \`tool_use\` block, you execute the query yourself, then send the result back. No MCP server needed. This is probably the right path for your setup.

Option B — Use Claude Desktop or an MCP-aware client
Point Claude Desktop at your \`/mcp/sse\` endpoint and it handles the tool calling automatically. But this is separate from your chatbox — it's a desktop app, not your web frontend.

Given that you already have a working chatbox and \`RestTemplate\`, Option A is your next step. It means:
1. Define your tools as JSON schemas in the API request body
2. Check if Claude's response contains a \`tool_use\` block
3. If it does, run the query and send the result back in the next message
4. Claude then gives its final answer

Want me to show you what that request/response cycle looks like in your Spring service?`,
  },
  {
    role: "user",
    content:
      "Please show what the request response cycle would look like. I assume it would be async as it has to wait on many requests potentially? Where do I let Claude know about the tools? In the system prompt? Or can I add additional pieces of information to my body, such as `tools_available`?",
  },
  {
    role: "assistant",
    content: `The Anthropic API has a first-class \`tools\` field in the request body — no need to mention them in the system prompt. Here's the full cycle:

1. First request — send tools alongside the conversation:
\`Map<String, Object> customerTool = Map.of(
    "name", "get_all_customers",
    "description", "Fetches all customers from the database",
    "input_schema", Map.of(
        "type", "object",
        "properties", Map.of(), // no parameters needed for this one
        "required", List.of()
    )
);

Map<String, Object> body = Map.of(
    "model", "claude-sonnet-4-20250514",
    "max_tokens", 1024,
    "system", "You are a helpful assistant...",
    "tools", List.of(customerTool),
    "messages", conversationHistory
);\`

2. Claude may respond with a \`tool_use\` block instead of text:
\`{
  "stop_reason": "tool_use",
  "content": [
    {
      "type": "tool_use",
      "id": "toolu_01abc",
      "name": "get_all_customers",
      "input": {}
    }
  ]
}
\`

3. You execute the query, then send the result back as a new message:
\`// Add Claude's tool_use response to history as "assistant"
conversationHistory.add(Map.of(
    "role", "assistant",
    "content", claudesResponseContent // the raw content array from step 2
));

// Add your tool result as "user"
conversationHistory.add(Map.of(
    "role", "user",
    "content", List.of(Map.of(
        "type", "tool_result",
        "tool_use_id", "toolu_01abc",
        "content", objectMapper.writeValueAsString(customerList)
    ))
));

// Send again — Claude will now give a final text response
\`

4. As for async — yes, good instinct. Wrap your service method in \`CompletableFuture\` and use \`@Async\`:

\`@Async
public CompletableFuture<String> ask(List<Map> messages) {
    // first call
    Map response = callClaude(messages);

    while ("tool_use".equals(response.get("stop_reason"))) {
        // extract tool name + id from response
        // run your query
        // append assistant + tool_result messages
        // call Claude again
        response = callClaude(messages);
    }

    // stop_reason is now "end_turn", extract text and return
    return CompletableFuture.completedFuture(extractText(response));
}
\`

The loop is the key bit — Claude might call multiple tools before it has enough information to answer, so you keep going until \`stop_reason\` is \`end_turn\` rather than \`tool_use\`.

Make sure you add \`@EnableAsync\` to your main application class or a config class to enable the async support.`,
  },
];
