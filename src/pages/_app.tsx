import '@mantine/tiptap/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/core/styles.css';
import "@/styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { MantineProvider } from '@mantine/core';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <MantineProvider>
        <Component {...pageProps} />
      </MantineProvider>
    </React.Fragment>
  )
}