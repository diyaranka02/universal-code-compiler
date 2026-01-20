import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CodeEditor } from '@/components/CodeEditor';
import { OutputPanel } from '@/components/OutputPanel';
import { LanguageSelector } from '@/components/LanguageSelector';
import { languages } from '@/lib/languages';
import { Play, RotateCcw, Code2 } from 'lucide-react';
import { toast } from 'sonner';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [code, setCode] = useState(selectedLanguage.defaultCode);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLanguageChange = (languageId: string) => {
    const newLanguage = languages.find(lang => lang.id === languageId);
    if (newLanguage) {
      setSelectedLanguage(newLanguage);
      setCode(newLanguage.defaultCode);
      setOutput('');
      setError(null);
    }
  };

  const handleRunCode = async () => {
    setIsLoading(true);
    setError(null);
    setOutput('');

    try {
      // Execute code using Piston API
      const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: selectedLanguage.id,
          version: '*',
          files: [
            {
              content: code,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to execute code');
      }

      const result = await response.json();
      
      // Format output
      let executionOutput = '';
      let executionError = '';

      if (result.run) {
        if (result.run.stdout) {
          executionOutput = result.run.stdout;
        }
        if (result.run.stderr) {
          executionError = result.run.stderr;
        }
        if (result.compile && result.compile.stderr) {
          executionError = result.compile.stderr + '\n' + executionError;
        }
      }

      if (executionError) {
        setError(executionError);
        toast.error('Code execution failed');
      } else {
        setOutput(executionOutput || 'Code executed successfully with no output');
        toast.success('Code executed successfully');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast.error('Failed to execute code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCode(selectedLanguage.defaultCode);
    setOutput('');
    setError(null);
    toast.info('Code reset to default');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
                <Code2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Universal Code Compiler</h1>
                <p className="text-sm text-muted-foreground">Write, compile, and run code in multiple languages</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <LanguageSelector
            languages={languages}
            selectedLanguage={selectedLanguage}
            onLanguageChange={handleLanguageChange}
          />
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button
              size="sm"
              onClick={handleRunCode}
              disabled={isLoading}
            >
              <Play className="h-4 w-4 mr-2" />
              {isLoading ? 'Running...' : 'Run Code'}
            </Button>
          </div>
        </div>

        {/* Editor and Output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-240px)]">
          {/* Code Editor */}
          <div className="h-full">
            <CodeEditor
              code={code}
              onChange={setCode}
              language={selectedLanguage}
            />
          </div>

          {/* Output Panel */}
          <div className="h-full">
            <OutputPanel
              output={output}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
