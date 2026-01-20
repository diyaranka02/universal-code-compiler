import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2 } from 'lucide-react';

interface OutputPanelProps {
  output: string;
  isLoading: boolean;
  error: string | null;
}

export function OutputPanel({ output, isLoading, error }: OutputPanelProps) {
  return (
    <div className="h-full border border-border rounded-lg bg-card">
      <div className="border-b border-border px-4 py-2 bg-muted">
        <h3 className="text-sm font-medium text-foreground">Output</h3>
      </div>
      <ScrollArea className="h-[calc(100%-40px)]">
        <div className="p-4">
          {isLoading ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Running code...</span>
            </div>
          ) : error ? (
            <pre className="text-sm text-destructive font-mono whitespace-pre-wrap">
              {error}
            </pre>
          ) : output ? (
            <pre className="text-sm text-foreground font-mono whitespace-pre-wrap">
              {output}
            </pre>
          ) : (
            <p className="text-sm text-muted-foreground">
              Click "Run Code" to see the output
            </p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
