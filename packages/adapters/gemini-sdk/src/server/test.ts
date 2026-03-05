import type { AdapterEnvironmentTestContext, AdapterEnvironmentTestResult, AdapterEnvironmentCheck } from "@paperclipai/adapter-utils";
import process from "node:process";

function summarizeStatus(checks: AdapterEnvironmentCheck[]): AdapterEnvironmentTestResult["status"] {
    if (checks.some((check) => check.level === "error")) return "fail";
    if (checks.some((check) => check.level === "warn")) return "warn";
    return "pass";
}

export async function testEnvironment(ctx: AdapterEnvironmentTestContext): Promise<AdapterEnvironmentTestResult> {
    const checks: AdapterEnvironmentCheck[] = [];
    const config = typeof ctx.config === "object" && ctx.config !== null ? ctx.config : {};
    const envVars = (config.env as Record<string, string>) || {};

    const apiKey = envVars.GOOGLE_API_KEY || process.env.GOOGLE_API_KEY;

    if (!apiKey) {
        checks.push({
            code: "gemini_api_key_missing",
            level: "warn",
            message: "GOOGLE_API_KEY is not set. The agent will not be able to authenticate with the Gemini API.",
            hint: "Set GOOGLE_API_KEY in the agent's environment variables or in the system environment."
        });
    } else {
        checks.push({
            code: "gemini_api_key_present",
            level: "info",
            message: "GOOGLE_API_KEY is configured."
        });
    }

    return {
        adapterType: ctx.adapterType,
        status: summarizeStatus(checks),
        checks,
        testedAt: new Date().toISOString()
    };
}
