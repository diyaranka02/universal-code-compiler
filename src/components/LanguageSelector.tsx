import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Language } from '@/lib/languages';

interface LanguageSelectorProps {
  languages: Language[];
  selectedLanguage: Language;
  onLanguageChange: (languageId: string) => void;
}

export function LanguageSelector({ languages, selectedLanguage, onLanguageChange }: LanguageSelectorProps) {
  return (
    <Select value={selectedLanguage.id} onValueChange={onLanguageChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.id} value={lang.id}>
            {lang.name} {lang.version && <span className="text-muted-foreground text-xs">({lang.version})</span>}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
