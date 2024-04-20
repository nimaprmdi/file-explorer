import Layout from "@/components/layout/Layout";
import { FilesContextProvider } from "@/context/FilesContextProvider";
import { ModalContextProvider } from "@/context/ModalContextProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "iconify-icon";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ModalContextProvider>
      <FilesContextProvider>
        <Layout>
          <Component {...pageProps} />
          <div>
            <Toaster />
          </div>
        </Layout>
      </FilesContextProvider>
    </ModalContextProvider>
  );
}
