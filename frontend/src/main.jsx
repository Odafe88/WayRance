import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import '../polyfills.js'
import "@rainbow-me/rainbowkit/styles.css";
import "react-toastify/dist/ReactToastify.css";


import { getDefaultWallets, RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";

import { configureChains, createConfig } from "wagmi";
import { injected } from 'wagmi/connectors'
import { mainnet, sepolia } from 'wagmi/chains'
import { createClient } from 'viem'



import store, {persistor} from "./redux/store.js";
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";



const config = createConfig(

);

const { connectors } = getDefaultWallets({
  appName: "Wayrance",
  projectId: "0.1.0",
  chains
});

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: [injected({ chains: [mainnet, sepolia] })], 
  publicClient,
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http('https://mainnet.example.com'),
    [sepolia.id]: http('https://sepolia.example.com'),
  },
});


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <WagmiConfig config={wagmiConfig}>
      <PersistGate persistor={persistor}>
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
        </PersistGate>
      </WagmiConfig>
    </Provider>
</React.StrictMode>
);