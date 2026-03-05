import type { AdapterExecutionContext, AdapterExecutionResult } from "@paperclipai/adapter-utils";
import { GoogleGenerativeAI } from "@google/generative-ai";
import process from "node:process";

export async function execute(ctx: AdapterExecutionContext): Promise<AdapterExecutionResult> {
    const { config, runId, agent, context, onLog, onMeta } = ctx;

    const envVars = (config.env as Record<string, string>) || {};
    const apiKey = envVars.GOOGLE_API_KEY || process.env.GOOGLE_API_KEY;

    if (!apiKey) {
        return {
            exitCode: 1,
            signal: null,
            timedOut: false,
            errorMessage: "GOOGLE_API_KEY is not set",
            errorCode: "gemini_missing_api_key"
        };
    }

    const modelName = typeof config.model === "string" ? config.model : "gemini-2.0-flash";
    const systemInstruction = typeof config.systemInstruction === "string" ? config.systemInstruction : undefined;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction
    });

    if (onMeta) {
        await onMeta({
            adapterType: "gemini_sdk",
            command: "sdk",
            context
        });
    }

    await onLog("stdout", `[gemini] invoking model ${modelName}\n`);

    try {
        const prompt = `You are a helpful AI assistant. Here is your current context and task data:\n${JSON.stringify(context, null, 2)}\n\nPlease proceed with fulfilling the task instructions provided in the context.`;
        const result = await model.generateContentStream(prompt);

        let fullText = "";
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            fullText += chunkText;
            await onLog("stdout", chunkText);
        }
        await onLog("stdout", "\n");

        const response = await result.response;
        const usage = response.usageMetadata;

        return {
            exitCode: 0,
            signal: null,
            timedOut: false,
            provider: "google",
            model: modelName,
            summary: `Gemini SDK execution (${modelName})`,
            resultJson: {
                text: fullText
            },
            usage: usage ? {
                inputTokens: usage.promptTokenCount,
                outputTokens: usage.candidatesTokenCount
            } : undefined
        };
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        await onLog("stderr", `[gemini] request failed: ${message}\n`);

        return {
            exitCode: 1,
            signal: null,
            timedOut: false,
            errorMessage: message,
            errorCode: "gemini_request_failed"
        };
    }
}
