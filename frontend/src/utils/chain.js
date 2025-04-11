'use client'

import { http, createStorage, cookieStorage } from 'wagmi'
import { baseSepolia } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

const supportedChains = [baseSepolia]

export const wagmiConfig = getDefaultConfig({
  appName: 'Dumprr',
  projectId: "d4721b1022542ecf5ed49adc9174c27f",
  chains: supportedChains,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: supportedChains.reduce((acc, chain) => {
    const rpcUrl = chain.rpcUrls?.default?.http?.[0]
    if (!rpcUrl) {
      console.warn(`Missing RPC URL for chain: ${chain.name}`)
      return acc
    }

    return {
      ...acc,
      [chain.id]: http(rpcUrl),
    }
  }, {}),
})
