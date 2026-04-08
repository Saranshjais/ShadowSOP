import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { exportToMarkdown } from "../lib/export";

// MOCKED SHADCN COMPONENTS
const Button = ({ children, className, variant = "default", ...props }: any) => {
  const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 disabled:pointer-events-none disabled:opacity-50";
  const variants: any = {
    default: "bg-emerald-600 text-white shadow hover:bg-emerald-500",
    outline: "border border-zinc-700 bg-transparent shadow-sm hover:bg-zinc-800 hover:text-zinc-100",
    ghost: "hover:bg-zinc-800 hover:text-zinc-100"
  };
  return <button className={`${base} h-9 px-4 py-2 ${variants[variant]} ${className}`} {...props}>{children}</button>;
};

const Card = ({ children, className }: any) => (
  <div className={`rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-100 shadow flex flex-col h-full ${className}`}>{children}</div>
);
const CardHeader = ({ children }: any) => <div className="flex flex-col space-y-1.5 p-6">{children}</div>;
const CardTitle = ({ children, className, action }: any) => (
  <div className="flex justify-between items-center">
    <h3 className={`font-mono font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
    {action && <div>{action}</div>}
  </div>
);
const CardContent = ({ children, className }: any) => <div className={`p-6 pt-0 flex-1 flex flex-col ${className}`}>{children}</div>;
const Textarea = ({ className, ...props }: any) => (
  <textarea className={`flex w-full rounded-md border border-zinc-700 bg-black px-3 py-2 text-sm text-emerald-400 font-mono shadow-sm placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px] ${className}`} {...props} />
);

type SOPStep = {
  order: number;
  action: string;
  context_notes?: string;
};

type ForgeFormValues = {
  steps: SOPStep[];
};

export default function Forge({ onSave, onError }: { onSave?: () => void, onError?: (msg: string) => void }) {
  const [sourceText, setSourceText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [title, setTitle] = useState("Distilled SOP");
  
  const { control, reset, register } = useForm<ForgeFormValues>({
    defaultValues: { steps: [] }
  });
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "steps"
  });

  const handleDistill = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/v1/distill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "dev-test-key-123"
        },
        body: JSON.stringify({ source_text: sourceText, context_hints: "" })
      });
      
      if (!response.ok) {
        throw new Error("API Failure");
      }
      
      const data = await response.json();
      setTitle(data.title || "Distilled SOP");
      reset({ steps: data.steps || [] });
    } catch (err) {
      console.error(err);
      if (onError) onError("Gemini: Input too vague. Add more context to the source text.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToVault = async () => {
    setIsSaving(true);
    try {
      const payload = {
        title: title,
        description: "Drafted via Forge",
        category: "General",
        steps: fields,
        edge_cases: [],
        missing_info_queries: []
      };
      
      const response = await fetch("http://localhost:8000/api/v1/sops", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "dev-test-key-123"
        },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        setSourceText("");
        reset({ steps: [] });
        if (onSave) onSave();
      }
    } catch (e) {
      console.error(e);
      if (onError) onError("Database Error: Failed to save to vault.");
    } finally {
      setIsSaving(false);
    }
  };

  const currentPayload = {
    title: title,
    steps: fields,
    edge_cases: [],
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-stretch h-[80vh]">
        <Card>
          <CardHeader>
            <CardTitle>Conversational Exhaust</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea 
              className="flex-1 resize-none mb-4"
              placeholder="Paste Zoom transcripts, Slack dumps, or messy ideas here..."
              value={sourceText}
              onChange={(e: any) => setSourceText(e.target.value)}
            />
            <Button 
              onClick={handleDistill} 
              disabled={isLoading || !sourceText}
              className="w-full bg-emerald-600 hover:bg-emerald-500 font-bold tracking-wide mt-auto relative overflow-hidden group"
            >
              {isLoading ? (
                <span className="animate-pulse">Deciphering institutional context...</span>
              ) : "Distill to SOP"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle action={
              <Button onClick={() => exportToMarkdown(currentPayload)} variant="outline" className="h-7 text-xs border-zinc-700 hover:bg-zinc-800" disabled={fields.length === 0}>
                Export Markdown
              </Button>
            }>
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-hidden flex flex-col p-4 pr-1">
            <div className="overflow-y-auto flex-1 space-y-4 pr-4 custom-scrollbar">
              {fields.map((field, index) => (
                <div key={field.id} className="flex flex-row gap-4 items-start p-4 bg-black rounded-lg border border-zinc-800 transition-colors hover:border-zinc-700 group">
                  <span className="text-emerald-500 font-bold font-mono pt-2 w-6 text-right">
                    {index + 1}.
                  </span>
                  <div className="flex-1 space-y-3">
                    <input 
                      {...register(`steps.${index}.action` as const)} 
                      className="w-full bg-transparent border-b border-zinc-800 text-zinc-100 font-medium focus:outline-none focus:border-emerald-500 py-1"
                      placeholder="Action step description"
                    />
                    <input 
                      {...register(`steps.${index}.context_notes` as const)} 
                      className="w-full bg-transparent text-sm text-zinc-500 focus:outline-none"
                      placeholder="Additional metadata (optional)"
                    />
                  </div>
                  <Button variant="ghost" onClick={() => remove(index)} className="text-red-500 hover:bg-red-950/30 px-2 mt-1 py-1 h-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    ✕
                  </Button>
                </div>
              ))}
              
              <Button 
                onClick={() => append({ order: fields.length + 1, action: "", context_notes: "" })}
                variant="outline"
                className="w-full border-dashed border-zinc-700 text-zinc-400 hover:text-emerald-400 hover:border-emerald-400/50 bg-transparent h-12 mt-4"
              >
                + Add Manual Step
              </Button>
            </div>
            
            <div className="pt-4 border-t border-zinc-800 mt-4 pr-4">
              <Button 
                onClick={handleSaveToVault}
                disabled={fields.length === 0 || isSaving}
                className="w-full bg-white text-zinc-950 font-bold hover:bg-zinc-200 shadow-lg"
              >
                {isSaving ? "Archiving..." : "Save to Vault"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
