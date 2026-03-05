import type { CreateConfigValues } from "../../components/AgentConfigForm";

export function buildGeminiConfig(v: CreateConfigValues): Record<string, unknown> {
    const ac: Record<string, unknown> = {};
    if (v.cwd) ac.cwd = v.cwd;
    if (v.model) ac.model = v.model;

    if (v.envVars && v.envVars.trim()) {
        try {
            ac.env = JSON.parse(v.envVars);
        } catch {
            // Best effort parse, the backend will validate it
        }
    }

    return ac;
}
