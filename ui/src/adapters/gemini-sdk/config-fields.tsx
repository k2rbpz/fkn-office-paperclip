import type { AdapterConfigFieldsProps } from "../types";
import {
    Field,
    DraftInput,
    help,
    ChoosePathButton,
} from "../../components/agent-config-primitives";
import { FolderOpen } from "lucide-react";

const inputClass =
    "w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm font-mono outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground/50";

export function GeminiConfigFields({
    isCreate,
    values,
    set,
    config,
    eff,
    mark,
}: AdapterConfigFieldsProps) {
    return (
        <div className="space-y-4">
            <Field label="Working directory" hint={help.cwd}>
                <div className="flex items-center gap-2 rounded-md border border-border px-2.5 py-1.5 focus-within:ring-1 focus-within:ring-ring">
                    <FolderOpen className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <DraftInput
                        value={isCreate ? values!.cwd : eff("adapterConfig", "cwd", String(config.cwd ?? ""))}
                        onCommit={(v) =>
                            isCreate ? set!({ cwd: v }) : mark("adapterConfig", "cwd", v || undefined)
                        }
                        className="w-full bg-transparent outline-none text-sm font-mono placeholder:text-muted-foreground/50"
                        placeholder="/path/to/project"
                    />
                    <ChoosePathButton />
                </div>
            </Field>

            <Field label="Model" hint={help.model}>
                <DraftInput
                    value={
                        isCreate ? values!.model : eff("adapterConfig", "model", String(config.model ?? ""))
                    }
                    onCommit={(v) =>
                        isCreate ? set!({ model: v }) : mark("adapterConfig", "model", v || undefined)
                    }
                    immediate
                    className={inputClass}
                    placeholder="gemini-2.0-flash"
                />
            </Field>

            <div className="rounded-md border border-border/70 bg-muted/20 px-2.5 py-2 text-[11px] space-y-1.5 mt-2">
                <p className="font-medium text-muted-foreground">API Key Setup</p>
                <p className="text-muted-foreground">
                    Make sure to provide <span className="font-mono">GOOGLE_API_KEY</span> in the agent's Environment Variables block below for the Gemini SDK to authenticate.
                </p>
            </div>
        </div>
    );
}
