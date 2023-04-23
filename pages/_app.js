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

export default function App({ Component, pageProps }) {
  return (
    <>
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
