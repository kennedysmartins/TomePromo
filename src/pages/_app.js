import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from '@/contexts/ThemeContext';
import { DrawerProvider } from "@/contexts/DrawerContext";

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
      <ThemeProvider>
        <DrawerProvider>
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
        </DrawerProvider>
      </ThemeProvider>
  );
}
export default App;