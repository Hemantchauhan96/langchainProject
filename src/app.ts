import { loadEnvironment } from "./config/env.js";

function getQuestion(args: string[]): string {
  const question = args.join(" ").trim();

  if (question.length === 0) {
    throw new Error(
      'Please provide a question, for example: pnpm dev -- "What is TypeScript?"',
    );
  }

  return question;
}

function main(): void {
  try {
    const environment = loadEnvironment();
    const question = getQuestion(process.argv.slice(2));

    console.log(`${environment.APP_NAME}`);
    console.log(`You asked: ${question}`);
    console.log(
      "This starter app validates input and configuration; it does not call an AI model yet.",
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    console.error(message);
    process.exitCode = 1;
  }
}

main();
