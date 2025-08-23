import { openai, createAgent } from "@inngest/agent-kit";

import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    const codeAgent = createAgent({
      name: "codeAgent",
      system:
        "You are a highly skilled Next.js developer. Your task is to write clean, maintainable, and efficient Next.js code snippets that are simple and easy to understand.",
      model: openai({ model: "gpt-4o" }),
    });
    const { output } = await codeAgent.run(
      `Generate the following snippet: ${event.data.value}`
    );

    return { output };
  }
);
