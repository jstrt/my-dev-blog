import { LanguageProvider } from "../src/context/LanguageContext";
import "../styles/globals.css";
import NavBar from "../src/components/NavBar";

function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <NavBar />
      <Component {...pageProps} />
    </LanguageProvider>
  );
}

export default MyApp;
