import '@/styles/globals.css'
import {ChainId, ThirdwebProvider} from '@thirdweb-dev/react';
import {StateContextProvider} from "@/context";
import Navbar from "@/components/Navbar/Navbar";

export default function App({ Component, pageProps }) {
  return  <ThirdwebProvider desiredChainId={ChainId.Goerli}>
    <StateContextProvider>
      <Navbar />
      <Component {...pageProps} />
    </StateContextProvider>
  </ThirdwebProvider>
}
