import CommonLayout from "@/components/layouts/CommonLayout";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const queryClient = new QueryClient();
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/context/AuthProvider";
import { theme } from "@/utils/theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Script from "next/script";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
    <Head>
        <title>Pngcrown</title>
        <meta name="description" content="Free Png Image Download here" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/pngcrown.png" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7562191749444029"
          crossorigin="anonymous"
        ></script>
        
    
      </Head>
        
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ToastContainer
              position="top-right"
              autoClose={1500}
              closeOnClick
              theme="light"
            />
            <CommonLayout>
              <Component {...pageProps} />
            </CommonLayout>
          </QueryClientProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}
