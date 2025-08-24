import { Sandbox } from "@e2b/code-interpreter";
export async function getSandbox(sanboxId: string) {
  const sandbox = await Sandbox.connect(sanboxId);
  return sandbox;
}
