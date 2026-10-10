# AGENTS.md --- TypeScript Agentic AI Engineering Project

> **Purpose:** This file is the working agreement for AI coding agents
> and developers contributing to this repository. Read it before
> exploring, planning, coding, reviewing, or changing project structure.
>
> **Project goal:** Learn and build production-minded AI applications
> and agents with **TypeScript, LangChain, LangGraph, and LangSmith**.
> Learn by shipping small, testable increments---not by building a large
> system all at once.

------------------------------------------------------------------------

## 1. Instructions for Every AI Coding Agent

Before making changes:

1.  Read this file completely.
2.  Inspect the repository structure, `package.json`, lockfile,
    TypeScript configuration, tests, and relevant source files.
3.  Explain the current implementation and constraints before proposing
    a large change.
4.  Prefer a small, reviewable change over a broad rewrite.
5.  Follow existing conventions unless there is a concrete reason to
    improve them.
6.  Do not invent package APIs. Check the installed package version and
    its TypeScript types/docs when uncertain.
7.  Do not claim code was tested unless you actually ran the relevant
    checks. State what ran and what did not.
8.  If requirements are ambiguous, state assumptions. Ask a focused
    question if the ambiguity could materially change architecture, data
    handling, security, or behavior.
9.  Update documentation and tests when behavior, architecture,
    environment variables, or setup steps change.
10. Keep secrets, personal data, production data, and private prompts
    out of source control, logs, traces, fixtures, and examples.

When implementing a task, follow this sequence:

1.  **Understand:** inspect the relevant files and restate the intended
    behavior.
2.  **Plan:** identify the smallest useful implementation and files
    likely to change.
3.  **Implement:** write typed, modular code that follows this file.
4.  **Verify:** run the relevant tests, type checks, lint, and build
    where available.
5.  **Summarize:** explain what changed, why, how to run it,
    verification results, and any known limitations.

Do not make unrelated edits or add dependencies merely for convenience.

------------------------------------------------------------------------

## 2. Project Principles

-   **TypeScript first:** use strict typing and avoid `any`.
-   **Learn incrementally:** implement one concept, test it, document
    it, then move to the next.
-   **Simple before sophisticated:** begin with a single LLM call, then
    tools, retrieval, stateful graphs, and more advanced agent patterns.
-   **Prefer workflows when possible:** if the steps are known and
    deterministic, use an explicit workflow. Use an agent when
    model-directed decisions or tool selection add real value.
-   **Explicit state:** define graph state and its updates clearly; do
    not hide important workflow state in global variables.
-   **Bounded autonomy:** tools must have narrow permissions, validated
    inputs, and clear failure behavior. Require human approval for
    consequential actions.
-   **Observable by design:** use LangSmith tracing and evaluation where
    configured, with privacy-conscious trace content.
-   **Test behavior, not only implementation:** test normal results,
    edge cases, failure paths, and safety boundaries.
-   **Production-minded, not prematurely complex:** start as a modular
    application. Add queues, services, databases, or deployment
    complexity when requirements justify them.
-   **Document decisions:** record meaningful architecture trade-offs in
    Architecture Decision Records (ADRs).
-   **Reliable over impressive:** do not describe a prototype as
    production-ready until security, evaluation, reliability, and
    operational requirements have been addressed.

------------------------------------------------------------------------

## 3. Target Technology Stack

Use the versions already pinned by the repository. Do not upgrade major
versions without a task-specific reason.

### Core

-   **Runtime:** supported LTS version of Node.js
-   **Language:** TypeScript with strict compiler settings
-   **Package manager:** pnpm (unless the repository already
    standardizes on another manager)
-   **LLM application framework:** LangChain.js
-   **Agent/workflow orchestration:** LangGraph.js
-   **Tracing, debugging, evaluation:** LangSmith
-   **Schema validation:** Zod
-   **Testing:** Vitest
-   **Linting/formatting:** ESLint and Prettier
-   **Configuration:** environment variables validated at startup
-   **API layer:** add Fastify, Express, or a framework already used by
    the repository only when an HTTP API is needed
-   **Persistence:** select a database based on actual requirements;
    PostgreSQL is a sensible default for application data, with
    `pgvector` as one possible vector-search option
-   **Frontend:** add React/Next.js only when a UI is needed; keep the
    agent/domain logic independent of the UI

### Responsibilities of the main AI libraries

-   **LangChain:** model integrations, prompts, structured output,
    tools, retrievers, document loaders, and reusable LLM application
    components.
-   **LangGraph:** stateful graph orchestration, nodes, conditional
    edges, checkpoints, interrupts, and human-in-the-loop flows.
-   **LangSmith:** traces, debugging, datasets, experiments, evaluation,
    and monitoring.

Do not use all three libraries in every file. Keep each library at the
boundary where it provides value.

------------------------------------------------------------------------

## 4. Recommended Repository Structure

Start with a modular TypeScript backend/application. Create only folders
that have a real use; do not create empty abstractions just to match
this example.

``` text
.
├── AGENTS.md
├── README.md
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── tsconfig.build.json
├── vitest.config.ts
├── eslint.config.js
├── .prettierrc.json
├── .env.example
├── .gitignore
├── Dockerfile                    # add when containerization is needed
├── docker-compose.yml            # add when local dependent services are needed
├── docs/
│   ├── architecture.md
│   ├── learning-roadmap.md
│   ├── runbooks.md
│   └── adr/
│       └── 0001-initial-architecture.md
├── src/
│   ├── app.ts                    # application composition/bootstrap
│   ├── config/
│   │   └── env.ts                # parse and validate environment variables
│   ├── agents/
│   │   └── example-agent/
│   │       ├── graph.ts          # build/compile the LangGraph
│   │       ├── state.ts          # state schema and types
│   │       ├── nodes.ts          # graph node implementations
│   │       ├── tools.ts          # narrowly scoped agent tools
│   │       ├── prompts.ts        # prompts and prompt metadata
│   │       ├── schemas.ts        # validated input/output schemas
│   │       └── index.ts          # public exports
│   ├── chains/                   # reusable, non-agent LLM pipelines
│   ├── models/                   # model factory/configuration
│   ├── retrieval/
│   │   ├── loaders/
│   │   ├── chunking/
│   │   ├── embeddings/
│   │   ├── vector-store/
│   │   └── retriever.ts
│   ├── memory/                   # conversation history/checkpoint adapters
│   ├── services/                 # application use cases
│   ├── api/                      # routes/controllers if an API is added
│   ├── integrations/             # external APIs and provider adapters
│   ├── observability/
│   │   ├── tracing.ts
│   │   └── logging.ts
│   ├── errors/
│   │   └── app-error.ts
│   └── shared/
│       └── types.ts              # only genuinely shared types
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── evaluation/
│   └── fixtures/
└── scripts/
    └── ...                       # repeatable developer/maintenance scripts
```

### Structure rules

-   Keep tests close to the project conventions; `tests/` is the initial
    default, not a mandatory rule.
-   Each agent should have a clear entry point and documented
    input/output contract.
-   Keep prompts, tools, state, nodes, and graph construction separate
    when that improves clarity.
-   Avoid giant `index.ts`, `utils.ts`, `helpers.ts`, or `agent.ts`
    files that accumulate unrelated responsibilities.
-   Avoid circular imports. Keep dependency direction understandable.
-   Do not make every folder a package or service. Start with a modular
    monolith.
-   Keep provider-specific code behind small adapters when it prevents
    provider details from leaking throughout the application.
-   Add a frontend workspace or monorepo only when the application
    genuinely needs one.

------------------------------------------------------------------------

## 5. TypeScript and Code Quality Standards

### Compiler and types

-   Enable `strict` in TypeScript.
-   Prefer `unknown` over `any` for untrusted values; narrow the type
    before using it.
-   Validate external input at runtime with Zod or an equivalent schema
    library. TypeScript types alone do not validate HTTP requests, model
    output, environment variables, or database values.
-   Give public functions and exported APIs clear input/output types.
-   Use discriminated unions for meaningful states and result types.
-   Use `as` assertions only when justified; do not use assertions to
    silence type errors.
-   Handle `null` and `undefined` deliberately.
-   Use `async`/`await` and handle rejected promises.
-   Avoid non-null assertions (`!`) unless the invariant is clear and
    documented.
-   Prefer small pure functions for deterministic business logic.

### Naming and organization

-   Use `PascalCase` for classes and types, `camelCase` for
    variables/functions, and descriptive filenames consistent with
    nearby files.
-   Use names that explain intent: `retrieveRelevantDocuments`, not
    `processData`.
-   Keep functions focused and reasonably small; split them when doing
    so improves comprehension or testability.
-   Avoid unexplained magic values. Put configurable limits and domain
    constants in named constants or validated configuration.
-   Comments should explain **why** a decision exists, not repeat what
    the code already says.
-   Do not add abstractions without a real use case.

### Error handling

-   Fail clearly and early for invalid configuration or input.
-   Use typed/domain-specific errors where callers need to distinguish
    failure cases.
-   Do not silently swallow exceptions or return fabricated success
    values.
-   Do not expose stack traces, secrets, provider responses, or internal
    details to end users.
-   Log enough context to debug failures, but redact credentials and
    sensitive data.
-   Add timeouts, retry policies, and cancellation where appropriate.
    Retry only operations that are safe to retry; use backoff and
    limits.

### Dependencies

-   Prefer established, maintained libraries over home-grown
    replacements.
-   Explain why a new runtime dependency is needed.
-   Avoid duplicate libraries with overlapping responsibilities.
-   Keep lockfiles committed and use the repository's package manager
    consistently.
-   Check package compatibility with the current Node.js and
    LangChain/LangGraph versions.

------------------------------------------------------------------------

## 6. AI Application and Agent Engineering Standards

### Model calls

-   Centralize model configuration rather than scattering model names
    and options across the codebase.
-   Keep model/provider selection configurable where practical.
-   Set sensible token/output limits, timeouts, and retry behavior.
-   Handle rate limits, provider errors, malformed outputs, and
    unavailable models.
-   Use structured output and schema validation when downstream code
    depends on a particular shape.
-   Treat model output as untrusted input. Validate before using it in
    business logic or tools.
-   Never assume an LLM is deterministic or always correct.
-   Do not call an LLM when ordinary code can solve the task more
    reliably, cheaply, and clearly.

### Prompts

-   Keep substantial prompts in named files or constants, with a clear
    purpose and versioning approach.
-   Document prompt inputs, expected output, and failure behavior.
-   Keep secrets and private customer data out of prompts unless
    explicitly required and approved.
-   Treat user content and retrieved documents as data, not trusted
    instructions.
-   Test prompts against representative examples and known edge cases.
-   Avoid promising that prompt wording alone provides a security
    boundary.

### Tools and permissions

-   Give each tool a narrow, explicit purpose and a typed input schema.
-   Validate arguments before executing tool logic.
-   Enforce authorization in application code; do not rely on the model
    to decide whether a user is authorized.
-   Use allowlists for destinations or operations where appropriate.
-   Apply timeouts, rate limits, size limits, and least-privilege
    credentials.
-   Keep read-only tools separate from tools that change state.
-   Require explicit human approval before consequential or irreversible
    actions, such as sending messages, issuing refunds, changing
    permissions, or deleting data.
-   Make write operations idempotent where practical and record audit
    information when appropriate.
-   Never expose unrestricted shell, database, filesystem, or network
    access to an agent by default.

### LangGraph

-   Define graph state explicitly and keep it as small as practical.
-   Keep nodes focused and give each node a clear responsibility.
-   Make conditional routing understandable and testable.
-   Define termination conditions and limits so loops cannot run
    indefinitely.
-   Set recursion/step limits and model/tool-call budgets appropriate to
    the task.
-   Use checkpointing only when persistence, resumability, or multi-turn
    state is required.
-   Choose a stable thread/session identifier and enforce user/tenant
    isolation for persisted state.
-   Treat checkpoint data as sensitive if it contains conversation
    history or business data.
-   Use interrupts/human review for approval gates and other decisions
    that require human judgment.
-   Test graph paths, retries, failures, resume behavior, and
    termination---not just the happy path.
-   Prefer a deterministic graph workflow over a free-running agent when
    the task has known steps.

### LangChain and retrieval-augmented generation (RAG)

-   Separate document ingestion, normalization, chunking, embedding,
    indexing, retrieval, and answer generation.
-   Preserve source metadata and identifiers so answers can be traced to
    their evidence.
-   Choose chunking and retrieval settings based on evaluation, not
    guesswork.
-   Do not treat retrieved documents as trusted instructions; defend
    against prompt injection in retrieved content.
-   Apply access control during retrieval so users cannot retrieve
    documents they are not allowed to see.
-   Make re-indexing, document updates, and deletion behavior explicit.
-   Evaluate retrieval quality separately from answer quality.
-   When factual answers need evidence, return source references and
    clearly indicate uncertainty or missing evidence.
-   Never claim a vector database is required for every agent; use one
    when semantic retrieval or similar functionality is needed.

### Memory and persistence

-   Distinguish conversation history, LangGraph checkpoint state,
    durable application data, and vector-store knowledge.
-   Define retention, deletion, and tenant-isolation requirements before
    persisting user conversations.
-   Do not store sensitive information in long-term memory by default.
-   Make memory updates explicit and testable.
-   Do not treat model-generated summaries as authoritative records.

------------------------------------------------------------------------

## 7. Security, Privacy, and Responsible Operation

-   Never commit `.env`, API keys, access tokens, private certificates,
    or real customer data.
-   Keep `.env.example` limited to variable names and safe placeholder
    values.
-   Validate all inputs at trust boundaries: API requests, tool
    arguments, model output, files, retrieved content, and environment
    variables.
-   Use least-privilege credentials and separate development, test, and
    production secrets.
-   Apply authentication and authorization at the application boundary
    when exposed to users.
-   Defend against prompt injection, tool misuse, data exfiltration, and
    unsafe output handling.
-   Treat model-generated SQL, shell commands, URLs, code, and tool
    arguments as untrusted.
-   Do not execute generated code or shell commands without explicit
    controls and review.
-   Avoid logging prompts, completions, retrieved passages, or user
    identifiers unless necessary and approved.
-   Configure LangSmith tracing with data minimization/redaction
    appropriate to the data classification and organizational policy.
-   Use HTTPS in deployed environments; set appropriate CORS,
    request-size, and rate limits for APIs.
-   Keep dependencies patched and review dependency changes.
-   Provide a clear failure response when the model, tools, database, or
    external services are unavailable.
-   For high-impact or regulated use cases, require domain review,
    documented limitations, human oversight, and appropriate
    auditability.

------------------------------------------------------------------------

## 8. Testing Strategy

Write tests as features are added, not at the end.

### Unit tests

Test deterministic functions independently:

-   input validation and normalization
-   business rules
-   chunking and metadata transformations
-   tool argument validation
-   graph routing decisions
-   output parsing and error mapping

### Integration tests

Test boundaries and real component interactions:

-   model/provider adapter behavior
-   database and vector-store adapters
-   tool-to-service interactions
-   graph execution and checkpointing
-   API request/response behavior

Use fakes or mocks where appropriate, but do not let mocks replace all
integration testing.

### Agent and RAG evaluations

-   Create a small, version-controlled evaluation dataset with
    representative and difficult examples.
-   Measure task success, groundedness/correctness, retrieval relevance,
    tool selection, latency, and cost where relevant.
-   Include adversarial prompts, prompt injection attempts, malformed
    inputs, missing evidence, and tool failures.
-   Prefer repeatable evaluation runs and compare changes against a
    baseline.
-   Use LangSmith datasets/experiments when configured; keep local tests
    runnable without paid model calls where possible.
-   Avoid exact-string assertions for inherently variable model
    responses unless the output contract requires exact text.
-   Establish acceptance thresholds before claiming a prompt or agent
    change improved quality.

### Required checks before merging

Run the scripts that exist in this repository, typically:

``` bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

If a script does not exist, do not claim it passed. Add appropriate
scripts as part of the initial setup task.

------------------------------------------------------------------------

## 9. Observability, Reliability, Latency, and Cost

-   Use structured application logs with request/run correlation IDs.
-   Capture errors, latency, retries, and dependency failures.
-   Use LangSmith traces to inspect graph paths, model calls, tool
    inputs/outputs, and failures when tracing is enabled.
-   Redact secrets and minimize sensitive trace content.
-   Track model/token usage and approximate cost for important
    workflows.
-   Set budgets for graph steps, tool calls, execution time, and output
    size.
-   Use bounded retries with backoff for transient failures; do not
    retry invalid input or non-idempotent actions blindly.
-   Define fallback behavior for unavailable models or tools where a
    safe fallback exists.
-   Add health/readiness endpoints if the app is deployed as a service.
-   Keep observability configuration optional in local development, with
    a clear warning when expected tracing is not configured.
-   Never make production correctness depend on logging or tracing being
    available.

------------------------------------------------------------------------

## 10. Environment and Configuration

-   Validate required environment variables at application startup.
-   Fail fast with a useful message when required configuration is
    missing.
-   Do not hardcode model API keys, database credentials, model names,
    URLs, or operational limits throughout the source.
-   Keep `.env.example` current.
-   Never print secret values in startup logs or errors.

Typical variables may include:

``` dotenv
# Model provider — use only the provider configured for this project
OPENAI_API_KEY=
# ANTHROPIC_API_KEY=

# LangSmith tracing (optional for local work unless the task requires it)
LANGSMITH_TRACING=false
LANGSMITH_API_KEY=
LANGSMITH_PROJECT=

# Persistence, if configured
DATABASE_URL=
```

Only define variables that the current implementation actually uses.
Follow current LangSmith environment-variable names and official package
documentation; do not assume an old example is still current.

------------------------------------------------------------------------

## 11. Git, Reviews, and Team Workflow

-   Use descriptive branches, for example `feat/rag-retrieval`,
    `fix/graph-loop-limit`, or `docs/agent-learning-roadmap`.
-   Keep commits focused and use clear messages, such as
    `feat: add validated search tool`.
-   Do not commit generated build output, local logs, `.env` files, or
    personal IDE state unless the project intentionally tracks them.
-   Keep pull requests small enough to review.
-   A change should explain the problem, implementation, testing, risks,
    and any configuration changes.
-   Review dependency additions, permissions, data handling, retries,
    and model/tool costs.
-   Update architecture diagrams, setup instructions, and ADRs when
    relevant.
-   Avoid drive-by refactors in feature changes.
-   Never rewrite Git history or perform destructive Git operations
    unless explicitly requested and the implications are understood.

------------------------------------------------------------------------

## 12. Beginner Learning Roadmap --- Learn by Building

Work through these stages in order. Each stage should leave behind
working code, tests, and a short explanation in
`docs/learning-roadmap.md`.

### Stage 0 --- Project foundations

**Learn:** Node.js, npm/pnpm, TypeScript strict mode, modules,
async/await, promises, error handling, environment variables, HTTP
basics, Git, tests, and Zod.

**Build:** A typed command-line program that accepts input, validates
it, calls a simple service, and handles errors.

**Done when:** You can explain the project scripts, configuration,
types, and error flow.

### Stage 1 --- First LLM application with LangChain

**Learn:** chat models, messages, system/user instructions, model
parameters, structured output, model errors, token usage, and provider
configuration.

**Build:** A small question-answering or summarization feature with
validated input/output.

**Done when:** You can trace a request from input validation to model
response and explain its failure modes.

### Stage 2 --- Tools and function calling

**Learn:** tool schemas, model-directed tool selection, tool execution,
authorization, validation, and tool error handling.

**Build:** A read-only calculator or mock knowledge-search tool. Keep
the tool deterministic and narrowly scoped.

**Done when:** Invalid arguments are rejected and the model cannot
bypass application-level validation.

### Stage 3 --- LangGraph fundamentals

**Learn:** state, nodes, edges, conditional routing, graph compilation,
termination, and recursion/step limits.

**Build:** A graph that classifies a request, routes it to a
deterministic handler, and returns a validated result.

**Done when:** You can draw the graph, explain each transition, and test
each path.

### Stage 4 --- Persistence and human approval

**Learn:** checkpointing, thread IDs, resume behavior, interrupts, state
persistence, idempotency, and tenant isolation.

**Build:** A workflow that pauses before a simulated consequential
action and resumes only after an explicit approval decision.

**Done when:** You can demonstrate pause/resume behavior, rejected
approval, failures, and isolation between sessions.

### Stage 5 --- RAG and vector search

**Learn:** document loaders, parsing, chunking, embeddings, vector
stores, similarity search, metadata filters, retrieval quality, and
citations.

**Build:** A knowledge assistant over a small set of non-sensitive
documents with source references.

**Done when:** You can evaluate retrieval separately from answer
generation and explain what happens when evidence is missing.

### Stage 6 --- LangSmith and evaluation

**Learn:** traces, run trees, datasets, experiments, evaluators,
regression checks, latency, and cost analysis.

**Build:** A repeatable evaluation set for the RAG assistant or graph
agent.

**Done when:** You can inspect a failed run and compare a change against
a baseline instead of judging only a few manual examples.

### Stage 7 --- Production-minded agent

**Learn:** API design, authentication, rate limiting, timeouts, retries,
structured logging, secrets management, deployment, monitoring, and
incident response.

**Build:** A small API around an agent with tests, environment
validation, tracing controls, bounded execution, and documented
deployment steps.

**Done when:** A new developer can run it from the README and you can
explain its security boundaries, limitations, costs, and recovery
behavior.

### Stage 8 --- Advanced patterns

Only after the previous stages work, explore:

-   multi-agent collaboration and handoffs
-   streaming events and intermediate progress
-   subgraphs and reusable graph components
-   durable background jobs and queues
-   advanced retrieval and reranking
-   model routing and fallback strategies
-   prompt/version management
-   multimodal inputs where the use case requires them

Do not introduce multi-agent architecture merely because it is possible.
Start with the simplest design that meets the requirements.

------------------------------------------------------------------------

## 13. Portfolio Project Direction

A suitable evolving portfolio project is a **Knowledge and Investigation
Assistant** using fictional or public data.

Possible milestones:

1.  Answer questions using a single model call.
2.  Add typed, read-only tools.
3.  Add document retrieval with citations.
4.  Orchestrate the workflow with LangGraph.
5.  Persist sessions and support safe pause/resume.
6.  Add LangSmith traces and an evaluation dataset.
7.  Add a small API and, if useful, a React/Next.js frontend.
8.  Add access control, deployment, and operational documentation.

If using a banking/investigation theme, use synthetic data only. Do not
upload real customer records, credentials, or confidential business data
to an LLM or tracing service.

The portfolio should demonstrate the problem, architecture, trade-offs,
tests, evaluation results, security boundaries, and limitations---not
just a successful demo.

------------------------------------------------------------------------

## 14. Documentation Requirements

Keep these documents useful and current:

-   **`README.md`:** project purpose, prerequisites, setup, commands,
    configuration, tests, and troubleshooting.
-   **`AGENTS.md`:** coding rules and instructions for AI coding agents.
-   **`docs/architecture.md`:** components, dependencies, data flow,
    graph diagrams, persistence, and trust boundaries.
-   **`docs/learning-roadmap.md`:** stages, progress, concepts learned,
    and next milestone.
-   **`docs/runbooks.md`:** common failures, diagnosis, recovery, and
    deployment operations.
-   **`docs/adr/`:** meaningful decisions, alternatives considered, and
    trade-offs.

For significant architecture choices, use an ADR with: context,
decision, alternatives, consequences, and date.

Do not document secrets or real sensitive data.

------------------------------------------------------------------------

## 15. Definition of Done

A task is complete when applicable items below are satisfied:

-   [ ] The behavior meets the stated requirement.
-   [ ] Types and runtime validation are appropriate.
-   [ ] Error and failure paths are considered.
-   [ ] Security and privacy implications are reviewed.
-   [ ] Tests cover core behavior and important edge cases.
-   [ ] Relevant lint, type-check, test, and build commands pass---or
    failures are clearly reported.
-   [ ] Documentation and `.env.example` are updated when needed.
-   [ ] Model/tool execution has reasonable bounds and cost implications
    are considered.
-   [ ] Tracing/logging does not expose secrets or unnecessary sensitive
    content.
-   [ ] The final summary explains changes, verification, and remaining
    limitations.

Not every checkbox applies to every task; explain exceptions rather than
adding unnecessary ceremony.

------------------------------------------------------------------------

## 16. Official References

Use the documentation for the versions installed in this repository.
APIs and package names evolve.

-   LangChain.js: https://js.langchain.com/
-   LangGraph.js: https://langchain-ai.github.io/langgraphjs/
-   LangSmith: https://docs.smith.langchain.com/
-   TypeScript: https://www.typescriptlang.org/docs/
-   Node.js: https://nodejs.org/docs/
-   Zod: https://zod.dev/
-   Vitest: https://vitest.dev/
-   OWASP Top 10 for LLM Applications:
    https://owasp.org/www-project-top-10-for-large-language-model-applications/

If documentation has moved, locate the current official documentation
rather than relying on an outdated tutorial.

------------------------------------------------------------------------

## 17. First Task for the Coding Agent

When this repository is new, **do not build the full agent platform
immediately**.

Start by:

1.  Inspecting the existing repository and confirming whether any code
    or tooling already exists.
2.  Proposing a minimal setup for a strict TypeScript Node.js project
    using the existing package manager where possible.
3.  Adding scripts for development, build, type-check, lint, and tests.
4.  Adding startup environment validation and a small unit test.
5.  Writing a clear README with exact setup and run commands.
6.  Confirming the project works before adding LangChain, LangGraph, and
    LangSmith in small, version-compatible steps.
7.  Reporting each command actually executed and its result.

Keep the first milestone small and runnable. Then progress through the
learning roadmap above.
