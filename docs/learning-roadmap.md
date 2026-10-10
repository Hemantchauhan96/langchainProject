# Learning Roadmap

## Stage 0 — Project foundations

**Status:** In progress

### Concepts introduced

- Node.js runs the JavaScript emitted from TypeScript.
- TypeScript's strict compiler checks catch mistakes before runtime.
- `package.json` defines repeatable scripts and dependency versions; `pnpm-lock.yaml` will record the resolved dependency tree.
- Zod validates runtime configuration because TypeScript types alone do not validate environment variables.
- The CLI checks user input and reports errors with a nonzero process exit code.
- Vitest exercises configuration behavior without making paid model calls.

### Current build

The starter CLI accepts a question, validates its application configuration, and reports what was supplied. It deliberately does not call a model yet.

### Done when

- [ ] Explain the project scripts and build output.
- [ ] Trace configuration and CLI input through validation and error handling.
- [ ] Run typecheck, lint, tests, and build locally.

## Next stages

1. Stage 1: a first LangChain model call with validated input/output.
2. Stage 2: a deterministic, read-only tool.
3. Stage 3: explicit LangGraph state, routing, and termination.
4. Later stages: persistence and approval, retrieval, evaluation, and API operations.
