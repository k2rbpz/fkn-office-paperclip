export const type = "gemini_sdk";
export const label = "Gemini SDK";

export const models = [
    { id: "gemini-2.5-flash", label: "Gemini 2.5 Flash" },
    { id: "gemini-2.5-pro", label: "Gemini 2.5 Pro" },
    { id: "gemini-2.0-flash", label: "Gemini 2.0 Flash" },
    { id: "gemini-2.0-flash-lite-preview", label: "Gemini 2.0 Flash-Lite (Preview)" },
    { id: "gemini-2.0-pro-exp", label: "Gemini 2.0 Pro Experimental" },
    { id: "gemini-2.0-flash-thinking-exp", label: "Gemini 2.0 Flash Thinking Experimental" }
];

export const agentConfigurationDoc = `# gemini_sdk agent configuration

Adapter: gemini_sdk

Core fields:
- model (string, required): Gemini model ID
- systemInstruction (string, optional): Base instructions for the agent

Operational fields:
- env (object, optional): KEY=VALUE environment variables (useful for setting GOOGLE_API_KEY per agent if needed)
`;
