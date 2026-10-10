import { z } from "zod";

const environmentSchema = z.object({
  APP_NAME: z.string().trim().min(1).default("Agentic AI Learning Project"),
});

export type Environment = z.infer<typeof environmentSchema>;

export function parseEnvironment(source: NodeJS.ProcessEnv): Environment {
  return environmentSchema.parse(source);
}

export function loadEnvironment(): Environment {
  return parseEnvironment(process.env);
}
