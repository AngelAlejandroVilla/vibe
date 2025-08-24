import { openai, createAgent } from "@inngest/agent-kit";
import { Sandbox } from "@e2b/code-interpreter";

import { inngest } from "./client";
import { getSandbox } from "./utils";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const sanboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("vibe-nextjs-test-03", {
        apiKey: process.env.E2B_API_KEY!,
      });
      return sandbox.sandboxId;
    });
    const codeAgent = createAgent({
      name: "codeAgent",
      system:
        "You are a highly skilled Next.js developer. Your task is to write clean, maintainable, and efficient Next.js code snippets that are simple and easy to understand.",
      model: openai({ model: "gpt-4o" }),
    });
    const { output } = await codeAgent.run(
      `Generate the following snippet: ${event.data.value}`
    );

    const sandboxurl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandbox(sanboxId);
      const host = sandbox.getHost(3000);
      return `https://${host}`;
    });

    return { output, sandboxurl };
  }
);
