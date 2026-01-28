import Vapi from "@vapi-ai/web";

let vapiInstance = null;

export function getVapi() {
  if (!vapiInstance) {
    vapiInstance = new Vapi(process.env.NEXT_PUBLIC_VAPI);
  }
  return vapiInstance;
}
