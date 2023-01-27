import '@/styles/globals.css'
import {ChainId, ThirdwebProvider} from '@thirdweb-dev/react';
import {StateContextProvider} from "@/context";

export default function App({ Component, pageProps }) {
  return  <ThirdwebProvider desiredChainId={ChainId.Goerli}>
    <StateContextProvider>
      <Component {...pageProps} />
    </StateContextProvider>
  </ThirdwebProvider>
}
