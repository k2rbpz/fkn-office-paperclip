import type { TranscriptEntry } from "../types";

export function parseGeminiStdoutLine(line: string, ts: string): TranscriptEntry[] {
  return [{ kind: "stdout", ts, text: line }];
}
