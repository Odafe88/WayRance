import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import '../polyfills.js'
import "@rainbow-me/rainbowkit/styles.css";
import "react-toastify/dist/ReactToastify.css";
import { getDefaultWallets, RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { ToastContainer } from "react-toastify";
import { publicProvider } from 'wagmi/providers/public';
import { toronet } from "./utils/chain.ts";

import store, {persistor} from "./redux/store/index.js";
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";



const { chains, publicClient } = configureChains(
  [toronet],
  [publicProvider()],
);


const { connectors } = getDefaultWallets({
  appName: "Wayrance",
  projectId: "0.1.0",
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
      <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider
          theme={lightTheme({
            accentColor: '#EFAE07',
            accentColorForeground: 'white',
            borderRadius: 'small',
            fontStack: 'system',
          })}
          chains={chains}>
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
      </WagmiConfig>
</React.StrictMode>
);