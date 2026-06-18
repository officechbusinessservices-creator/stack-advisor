#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
const STACKS = [
    {
        name: "Modern TypeScript Web App",
        tags: ["web", "fullstack", "typescript", "saas", "startup", "app", "dashboard", "crud"],
        layers: {
            language: ["TypeScript"],
            frontend: ["Next.js", "Tailwind CSS", "shadcn/ui"],
            backend: ["Next.js API Routes", "tRPC"],
            database: ["PostgreSQL", "Prisma", "Neon"],
            devops: ["Vercel", "GitHub Actions"],
            testing: ["Vitest", "Playwright"],
        },
        reasoning: "Best all-around stack for a modern web app. Next.js handles both frontend and backend, tRPC gives you end-to-end type safety, Neon is serverless Postgres that scales to zero. Vercel deploys in seconds.",
        tradeoffs: "Vendor lock-in with Vercel. tRPC requires both client and server to be TypeScript. Neon cold starts can be slow on free tier.",
        notGoodFor: "Real-time apps needing WebSockets at scale, very high traffic without budget, mobile-first products.",
    },
    {
        name: "Python AI/ML Backend",
        tags: ["ai", "ml", "machine learning", "python", "api", "data", "model", "inference", "llm"],
        layers: {
            language: ["Python"],
            backend: ["FastAPI", "Pydantic"],
            database: ["PostgreSQL", "Redis", "Supabase"],
            devops: ["Docker", "GitHub Actions", "Railway"],
            testing: ["Pytest"],
        },
        reasoning: "FastAPI is the fastest Python web framework and has native async support. Pydantic handles validation. Redis for caching model outputs. Railway makes deployment simple without Kubernetes complexity.",
        tradeoffs: "Python is slower than Go/Rust for pure compute. FastAPI is newer so some ecosystem gaps. Railway costs more than raw cloud at scale.",
        notGoodFor: "High-frequency trading, real-time game backends, extremely latency-sensitive systems.",
    },
    {
        name: "High-Performance Go API",
        tags: ["api", "go", "performance", "microservice", "backend", "fast", "concurrent", "scale"],
        layers: {
            language: ["Go"],
            backend: ["Gin", "Fiber"],
            database: ["PostgreSQL", "Redis"],
            devops: ["Docker", "Kubernetes", "GitHub Actions"],
            testing: ["Go testing package"],
        },
        reasoning: "Go compiles to a single binary, handles thousands of concurrent connections with minimal memory. Gin is battle-tested. Great for microservices, internal APIs, or anything that needs to handle load.",
        tradeoffs: "Verbose error handling. Smaller ecosystem than Node/Python. No generics until Go 1.18+. Harder to find Go developers.",
        notGoodFor: "Rapid prototyping, ML workloads, small teams unfamiliar with Go.",
    },
    {
        name: "React SPA + Node Backend",
        tags: ["spa", "react", "frontend", "javascript", "node", "rest", "api", "express"],
        layers: {
            language: ["TypeScript", "JavaScript"],
            frontend: ["React", "Vite", "Tailwind CSS"],
            backend: ["Express", "Node.js"],
            database: ["MongoDB", "PostgreSQL"],
            devops: ["Docker", "Vercel", "Railway"],
            testing: ["Vitest", "Jest", "Cypress"],
        },
        reasoning: "Classic, well-understood stack with the largest ecosystem. Easy to hire for. React + Vite is blazing fast for development. Express is flexible and has middleware for everything.",
        tradeoffs: "Not SEO-friendly without SSR. Express requires more manual setup than NestJS. MongoDB schema-less can become messy.",
        notGoodFor: "SEO-critical content sites, teams that need strong conventions, very large codebases without discipline.",
    },
    {
        name: "Enterprise Node.js API",
        tags: ["enterprise", "node", "typescript", "nestjs", "api", "large", "team", "microservice", "structured"],
        layers: {
            language: ["TypeScript"],
            backend: ["NestJS"],
            database: ["PostgreSQL", "TypeORM", "Redis"],
            devops: ["Docker", "Kubernetes", "GitHub Actions"],
            testing: ["Jest", "Vitest"],
        },
        reasoning: "NestJS brings Angular-style structure (modules, decorators, DI) to Node. Great for large teams where consistency matters. TypeORM handles complex DB relationships well.",
        tradeoffs: "Heavy boilerplate. Learning curve for NestJS patterns. Overkill for small projects or solo devs.",
        notGoodFor: "Small projects, fast prototypes, teams that prefer functional over OOP style.",
    },
    {
        name: "Serverless Edge App",
        tags: ["serverless", "edge", "cloudflare", "hono", "fast", "cdn", "global", "lightweight"],
        layers: {
            language: ["TypeScript"],
            backend: ["Hono", "Cloudflare Workers"],
            database: ["Turso", "Cloudflare D1"],
            devops: ["Cloudflare", "GitHub Actions"],
            testing: ["Vitest"],
        },
        reasoning: "Runs at the edge globally with sub-millisecond cold starts. Hono is tiny and fast. Turso/D1 are SQLite at the edge. Zero server management. Very cheap to run.",
        tradeoffs: "Cloudflare Workers has CPU time limits. No long-running processes. Limited Node.js compatibility. Turso is relatively new.",
        notGoodFor: "Long compute tasks, heavy file processing, apps needing full Node.js APIs.",
    },
    {
        name: "Mobile App (React Native)",
        tags: ["mobile", "ios", "android", "app", "react native", "expo", "cross-platform", "phone"],
        layers: {
            language: ["TypeScript"],
            frontend: ["React Native", "Expo"],
            backend: ["Supabase", "FastAPI"],
            database: ["Supabase", "SQLite"],
            devops: ["Expo EAS", "GitHub Actions"],
            testing: ["Jest"],
        },
        reasoning: "Expo handles the native build complexity so you can focus on product. Supabase gives you auth, realtime, and storage out of the box. React Native shares code between iOS and Android.",
        tradeoffs: "React Native performance gaps for animation-heavy UIs. Expo managed workflow limits some native modules. App store review delays.",
        notGoodFor: "Games, AR/VR, apps needing deep native OS integration.",
    },
    {
        name: "Static Site / Content Site",
        tags: ["static", "blog", "content", "docs", "marketing", "landing page", "seo", "fast", "astro"],
        layers: {
            language: ["TypeScript"],
            frontend: ["Astro", "Tailwind CSS"],
            database: [],
            devops: ["Vercel", "Cloudflare Pages", "GitHub Actions"],
            testing: ["Playwright"],
        },
        reasoning: "Astro ships zero JS by default — perfect for content sites that need to be fast and SEO-friendly. Easily integrates React/Vue/Svelte components where needed. Deploys to CDN globally.",
        tradeoffs: "Not suitable for highly dynamic apps. Astro is newer with smaller ecosystem. Less flexibility for complex interactivity.",
        notGoodFor: "Web apps with heavy user interaction, dashboards, real-time features.",
    },
];
function scoreStack(stack, description) {
    const d = description.toLowerCase();
    let score = 0;
    for (const tag of stack.tags) {
        if (d.includes(tag))
            score += 10;
    }
    // Partial word matching
    const words = d.split(/\s+/);
    for (const word of words) {
        if (word.length < 3)
            continue;
        for (const tag of stack.tags) {
            if (tag.includes(word) || word.includes(tag))
                score += 3;
        }
    }
    return score;
}
const server = new index_js_1.Server({ name: "stack-advisor", version: "1.0.0" }, { capabilities: { tools: {} } });
server.setRequestHandler(types_js_1.ListToolsRequestSchema, async () => ({
    tools: [
        {
            name: "recommend_stack",
            description: "Describe your project and get 1-3 recommended tech stacks with reasoning, tradeoffs, and what each layer should use.",
            inputSchema: {
                type: "object",
                properties: {
                    description: {
                        type: "string",
                        description: "What are you building? e.g. 'a SaaS dashboard for small businesses', 'a real-time chat API', 'a mobile app for food delivery'",
                    },
                },
                required: ["description"],
            },
        },
        {
            name: "list_stacks",
            description: "List all available stack templates with their tags",
            inputSchema: { type: "object", properties: {} },
        },
    ],
}));
server.setRequestHandler(types_js_1.CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    if (name === "list_stacks") {
        const result = STACKS.map((s) => ({ name: s.name, tags: s.tags }));
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
    if (name === "recommend_stack") {
        const description = String(args.description || "").trim();
        if (!description) {
            return { content: [{ type: "text", text: JSON.stringify({ error: "Please provide a project description." }) }] };
        }
        const scored = STACKS
            .map((stack) => ({ stack, score: scoreStack(stack, description) }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);
        // Always return at least 1 result even if no good match
        const results = scored[0].score === 0
            ? [{ stack: STACKS[0], score: 0 }]
            : scored.filter((s) => s.score > 0).slice(0, 3);
        const output = results.map(({ stack }, i) => ({
            rank: i + 1,
            name: stack.name,
            layers: stack.layers,
            reasoning: stack.reasoning,
            tradeoffs: stack.tradeoffs,
            notGoodFor: stack.notGoodFor,
        }));
        return { content: [{ type: "text", text: JSON.stringify(output, null, 2) }] };
    }
    return {
        content: [{ type: "text", text: JSON.stringify({ error: `Unknown tool: ${name}` }) }],
        isError: true,
    };
});
async function main() {
    const transport = new stdio_js_1.StdioServerTransport();
    await server.connect(transport);
}
main().catch(console.error);
