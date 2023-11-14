import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from '@/contexts/ThemeContext';
import { DrawerProvider } from "@/contexts/DrawerContext";
import CssBaseline from '@mui/material/CssBaseline';

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
      <ThemeProvider>
        <DrawerProvider>
        <SessionProvider session={session}>
        <CssBaseline />
            <Component {...pageProps} />
        </SessionProvider>
        </DrawerProvider>
      </ThemeProvider>
  );
}
export default App;