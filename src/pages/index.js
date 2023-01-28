import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import {ConnectWallet} from "@thirdweb-dev/react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Stake & Rewards</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="
        flex flex-col items-center justify-center min-h-screen py-2
        bg-gradient-to-r from-blue-400 to-blue-600
      ">
        <ConnectWallet
            auth={{
              loginOptional: false,
            }}
            colorMode={"light"}
            accentColor={"#fff"}
        />
      </main>
    </>
  )
}
