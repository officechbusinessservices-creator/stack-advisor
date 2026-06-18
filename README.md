# stack-advisor

An MCP server that recommends tech stacks for your project. Describe what you're building and get a recommended stack with reasoning, tradeoffs, and what each layer should use.

## What it does

**`recommend_stack`** — describe your project, get 1-3 ranked stack recommendations each with:
- Full layer breakdown (language, frontend, backend, database, devops, testing)
- Why this stack fits your use case
- Tradeoffs to be aware of
- What it's not good for

**`list_stacks`** — see all available stack templates

## Example prompts

- *"I'm building a SaaS dashboard for small businesses"*
- *"What stack should I use for an AI/ML API?"*
- *"Best stack for a cross-platform mobile app?"*
- *"I need a high-performance Go API for a microservice"*
- *"What are the tradeoffs of a serverless edge architecture?"*

## Add to Claude Desktop

```json
{
  "mcpServers": {
    "stack-advisor": {
      "command": "npx",
      "args": ["-y", "@engineeringmatrixexplorer/stack-advisor"]
    }
  }
}
```

## Add to Claude Code

```bash
claude mcp add stack-advisor -- npx -y @engineeringmatrixexplorer/stack-advisor
```

## Available stacks

| Stack | Best for |
|-------|----------|
| Modern TypeScript Web App | SaaS, dashboards, fullstack apps |
| Python AI/ML Backend | AI APIs, ML inference, data pipelines |
| High-Performance Go API | Microservices, high-traffic APIs |
| React SPA + Node Backend | SPAs, JS-heavy frontends |
| Enterprise Node.js API | Large teams, structured codebases |
| Serverless Edge App | Global low-latency, Cloudflare Workers |
| Mobile App (React Native) | iOS + Android cross-platform |
| Static Site / Content Site | Blogs, docs, marketing, SEO |

## Requirements

- Node.js 18+

## Part of the MCP Developer Tools Bundle

This server is also available as part of a bundle with [engineering-matrix-explorer](https://github.com/officechbusinessservices-creator/engineering-matrix-explorer) and [snippet-vault](https://github.com/officechbusinessservices-creator/snippet-vault).

## License

MIT
