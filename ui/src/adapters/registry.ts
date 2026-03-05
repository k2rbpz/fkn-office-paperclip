import type { UIAdapterModule } from "./types";
import { claudeLocalUIAdapter } from "./claude-local";
import { codexLocalUIAdapter } from "./codex-local";
import { openClawUIAdapter } from "./openclaw";
import { processUIAdapter } from "./process";
import { httpUIAdapter } from "./http";
import { geminiSdkUIAdapter } from "./gemini-sdk";

const adaptersByType = new Map<string, UIAdapterModule>(
  [claudeLocalUIAdapter, codexLocalUIAdapter, openClawUIAdapter, processUIAdapter, httpUIAdapter, geminiSdkUIAdapter].map((a) => [a.type, a]),
);

export function getUIAdapter(type: string): UIAdapterModule {
  return adaptersByType.get(type) ?? processUIAdapter;
}
