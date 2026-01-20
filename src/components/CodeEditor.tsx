import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { Language } from '@/lib/languages';

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  language: Language;
}

export function CodeEditor({ code, onChange, language }: CodeEditorProps) {
  return (
    <div className="h-full w-full border border-border rounded-lg overflow-hidden">
      <CodeMirror
        value={code}
        height="100%"
        theme={oneDark}
        extensions={[language.extension()]}
        onChange={onChange}
        className="h-full font-mono text-sm"
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightSpecialChars: true,
          foldGutter: true,
          drawSelection: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          rectangularSelection: true,
          crosshairCursor: true,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
          closeBracketsKeymap: true,
          searchKeymap: true,
          foldKeymap: true,
          completionKeymap: true,
          lintKeymap: true,
        }}
      />
    </div>
  );
}
