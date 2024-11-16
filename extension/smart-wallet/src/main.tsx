import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core'
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <DynamicContextProvider
        settings={{
          environmentId: import.meta.env.VITE_DYNAMIC_ENVIRONMENT_ID,
          walletConnectors: [ EthereumWalletConnectors ],
          initialAuthenticationMode: 'connect-only',
        }}
    >
    <App />
    </DynamicContextProvider>
  </StrictMode>,
)
