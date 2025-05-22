import { useLanguage } from "../context/LanguageContext";

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button onClick={toggleLanguage} style={{ marginBottom: "1rem" }}>
      {language === "ko" ? "한국어 kr" : "English us"}
    </button>
  );
};

export default LanguageToggle;
