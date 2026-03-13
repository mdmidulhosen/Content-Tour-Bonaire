import i18n from "@/lib/i18n";
import React, { createContext, useContext, useState } from "react";

type Language = "Dutch" | "English" | "Spanish";

const langCodeMap: Record<Language, string> = {
  Dutch: "nl",
  English: "en",
  Spanish: "es",
};

type LanguageContextType = {
  selectedLanguage: Language;
  setLanguage: (lang: Language) => void;
  languages: Language[];
};

const LanguageContext = createContext<LanguageContextType>({
  selectedLanguage: "Dutch",
  setLanguage: () => {},
  languages: ["Dutch", "English", "Spanish"],
});

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("Dutch");

  const setLanguage = (lang: Language) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(langCodeMap[lang]);
  };

  return (
    <LanguageContext.Provider
      value={{
        selectedLanguage,
        setLanguage,
        languages: ["Dutch", "English", "Spanish"],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
