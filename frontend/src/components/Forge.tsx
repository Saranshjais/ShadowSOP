import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

// Quick local mocks of Shadcn components to bypass NPM CLI failure during sprint
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
  <div className={`rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-100 shadow ${className}`}>{children}</div>
);
const CardHeader = ({ children }: any) => <div className="flex flex-col space-y-1.5 p-6">{children}</div>;
const CardTitle = ({ children, className }: any) => <h3 className={`font-mono font-semibold leading-none tracking-tight ${className}`}>{children}</h3>;
const CardContent = ({ children, className }: any) => <div className={`p-6 pt-0 ${className}`}>{children}</div>;

const Textarea = ({ className, ...props }: any) => (
  <textarea className={`flex w-full rounded-md border border-zinc-700 bg-black px-3 py-2 text-sm text-emerald-400 font-mono shadow-sm placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px] ${className}`} {...props} />
);

// Form Types
type SOPStep = {
  order: number;
  action: string;
  context_notes?: string;
};

type ForgeFormValues = {
  steps: SOPStep[];
};

export default function Forge() {
  const [sourceText, setSourceText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
      const data = await response.json();
      setTitle(data.title || "Distilled SOP");
      reset({ steps: data.steps || [] });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-8 font-sans">
      <h1 className="text-3xl font-bold mb-8 text-white tracking-tight text-center">
        ShadowSOP <span className="text-emerald-500 underline decoration-emerald-500/50">Forge</span>
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        
        {/* LEFT COMPONENT: The Chaos */}
        <Card>
          <CardHeader>
            <CardTitle>Conversational Exhaust (Input)</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea 
              className="min-h-[500px] resize-none"
              placeholder="Paste Zoom transcripts, Slack dumps, or messy ideas here..."
              value={sourceText}
              onChange={(e: any) => setSourceText(e.target.value)}
            />
            <Button 
              onClick={handleDistill} 
              disabled={isLoading || !sourceText}
              className="w-full mt-6 bg-emerald-600 hover:bg-emerald-500 font-bold tracking-wide"
            >
              {isLoading ? "Running Distillation Engine..." : "Distill to SOP"}
            </Button>
          </CardContent>
        </Card>

        {/* RIGHT COMPONENT: The Order */}
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex flex-row gap-4 items-start p-4 bg-black rounded-lg border border-zinc-800">
                <span className="text-emerald-500 font-bold font-mono pt-2">
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
                    placeholder="Additional context or notes (optional)"
                  />
                </div>
                <Button variant="ghost" onClick={() => remove(index)} className="text-red-500 hover:bg-red-950 px-2 mt-1 py-1 h-auto">
                  ✕
                </Button>
              </div>
            ))}
            
            <Button 
              onClick={() => append({ order: fields.length + 1, action: "", context_notes: "" })}
              variant="outline"
              className="w-full border-dashed border-zinc-700 text-zinc-400 hover:text-emerald-400 hover:border-emerald-400 h-12"
            >
              + Add Manual Step
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
