import { Chain } from 'wagmi'

export const toronet = {
    id: 54321,
    name: 'Toronet',
    network: 'toronet',
    nativeCurrency: {
        decimals: 18,
        name: 'Toro',
        symbol: 'TORO',
    },
    rpcUrls: {
        public: { http: ['http://testnet.toronet.org/rpc/'] },
        default: { http: ['http://testnet.toronet.org/rpc/'] },
    },
    blockExplorers: {
        etherscan: { name: 'Toronet', url: 'http://testnet.toronet.org/' },
        default: { name: 'Toronet', url: 'http://testnet.toronet.org/' },
    },
    contracts: {
        multicall3: {
            address: '0x4dCBC9C5bD40dcb0D1117EF680817228fC4BEaE1',
        },
    },
} as const satisfies Chain;
