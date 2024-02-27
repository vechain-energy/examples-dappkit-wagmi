This is an example project that serves as a template for new Vechain web applications.

# Libraries

## dApp-Kit

[Vechain DAppKit](https://github.com/vechain/vechain-dapp-kit) is a TypeScript library designed to enable smooth interactions between Vechain wallets (such as VeWorld and Sync2) and decentralized applications (dApps), thereby improving both user experience and developer convenience.


## Wagmi

[Wagmi](https://wagmi.sh) allows app developers to focus on building high-quality and performant experiences for EVMs — by focusing on developer experience, performance, feature coverage, and stability.

It provides developers with intuitive building blocks to build their Ethereum apps. While Wagmi's APIs might seem more verbose at first, it makes Wagmi's modular building blocks extremely flexible. Easy to move around, change, and remove. It also allows developers to better understand Ethereum concepts as well as understand what and why certain properties are being passed through. Learning how to use Wagmi is a great way to learn how to interact with Ethereum in general.

## tailwindcss

[tailwindcss](https://tailwindcss.com) is a utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.


# Anatomy

* `App.tsx` configures the providers with dApp-Kit and Wagmi.
* `contracts/` contains an example definition for the VTHO contract, including ABI and address.
* `AppRouter.tsx` establishes the routing for pages.
* `pages/` serves as a group for navigable page components.
* `ui/Auth.tsx` provides a sample authentication component that relies on Wagmi.
* `hooks/useWagmiConfig.ts` provides a valid VeChain configuration by connecting dApp-Kit, Connex, and Wagmi, and injects ENS support for [vet.domains](https://vet.domains).
* `.env` allows you to configure your application without hard coding things.
