# LangChain Project

A small TypeScript learning project for building AI applications incrementally. The first milestone is a typed command-line program with validated configuration and input; it does not call an AI model yet.

## Prerequisites

- Node.js 22 or later
- pnpm 10.12.1 (Corepack can provide the pinned version)

Enable the pinned package manager if needed:

```bash
corepack enable
```

## Setup

```bash
pnpm install
Copy-Item .env.example .env
```

On macOS or Linux, use `cp .env.example .env` instead of `Copy-Item`.

## Run

```bash
pnpm dev "What is TypeScript?"
```

The app validates configuration at startup, checks that a question was supplied, then prints it. The `.env` file is optional because the application has a safe default. This keeps the first exercise focused on TypeScript, input handling, configuration, and errors before introducing model calls.

## Project checks

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm format:check
```

## Configuration

`APP_NAME` is optional and defaults to `Agentic AI Learning Project`. Copy `.env.example` to `.env` to customize it. `.env` is ignored by Git; do not put secrets or private data in examples or committed files.

## Learning

The first stage and planned progression are tracked in [`docs/learning-roadmap.md`](docs/learning-roadmap.md).
