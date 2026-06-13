import React from 'react';
import ReactDOM from 'react-dom/client';

import '@rainbow-me/rainbowkit/styles.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { WagmiProvider } from 'wagmi';

import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

import { config } from './config/wagmi';

import App from './App';

import './index.css';

import { Toaster } from 'sonner';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider locale="en">
          <App />
          <Toaster richColors position="top-right" />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);
