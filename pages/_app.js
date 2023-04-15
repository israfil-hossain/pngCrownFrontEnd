import CommonLayout from "@/components/layouts/CommonLayout";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const queryClient = new QueryClient();
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/context/AuthProvider";


export default function App({ Component, pageProps }) {
  return (
    <>
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
    </>
  );
}
