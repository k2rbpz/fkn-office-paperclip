import type { UIAdapterModule } from "../types";
import { parseGeminiStdoutLine } from "./parse-stdout";
import { GeminiConfigFields } from "./config-fields";
import { buildGeminiConfig } from "./build-config";

export const geminiSdkUIAdapter: UIAdapterModule = {
    type: "gemini_sdk",
    label: "Gemini SDK",
    parseStdoutLine: parseGeminiStdoutLine,
    ConfigFields: GeminiConfigFields,
    buildAdapterConfig: buildGeminiConfig,
};
