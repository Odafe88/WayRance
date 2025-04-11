import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import '../polyfills.js'
import "@rainbow-me/rainbowkit/styles.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

import { wagmiConfig } from "./utils/chain.js";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import store, {persistor} from "./redux/store.js";
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={new QueryClient()}>
        <PersistGate persistor={persistor}>
          <RainbowKitProvider
          theme={lightTheme({
            accentColor: '#EFAE07',
            accentColorForeground: 'white',
            borderRadius: 'small',
            fontStack: 'system',
          })}
          >
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              />
            <App />
          </RainbowKitProvider>
        </PersistGate>
        </QueryClientProvider>
      </WagmiProvider>
    </Provider>
</React.StrictMode>
);