# Inicio - Stakeholder Management Platform

A Web3-native platform for startup founders to manage stakeholders, track funding, and handle compliance documentation.

![Inicio Dashboard](./packages/inicio/public/dashboard-preview.png)

## Key Features

### 🔐 Web3 Authentication
Connect seamlessly with your Web3 wallet to access the platform.

![Wallet Connection](./packages/inicio/public/wallet-connect.png)

### 📊 Smart Dashboard
- Centralized view of startup metrics
- Real-time blockchain data integration
- Quick access to all platform features

![Dashboard Main](./packages/inicio/public/dashboard-main.png)

### 👥 Stakeholder CRM
- Track investors, mentors, and team relationships
- Organize stakeholder information
- Monitor engagement metrics

![Stakeholder View](./packages/inicio/public/stakeholder-view.png)

### 💰 Funding Tracker
- Monitor funding milestones
- Track investor relationships
- Blockchain-verified transactions

![Funding Overview](./packages/inicio/public/funding-tracker.png)

### 📝 AI-Powered Compliance
- Generate legal documents with AI
- Blockchain document verification
- Automated compliance checks

![Compliance View](./packages/inicio/public/compliance-view.png)

### 👥 Team & Roles (ENS)
- ENS-based role management
- Secure access control
- Team collaboration tools

![Team Management](./packages/inicio/public/team-view.png)

## Tech Stack

Built with modern Web3 technologies:
- Next.js 15
- RainbowKit & Wagmi
- Tailwind CSS
- shadcn/ui components

- ✅ **Contract Hot Reload**: Your frontend auto-adapts to your smart contract as you edit it.
- 🪝 **[Custom hooks](https://docs.scaffoldeth.io/hooks/)**: Collection of React hooks wrapper around [wagmi](https://wagmi.sh/) to simplify interactions with smart contracts with typescript autocompletion.
- 🧱 [**Components**](https://docs.scaffoldeth.io/components/): Collection of common web3 components to quickly build your frontend.
- 🔥 **Burner Wallet & Local Faucet**: Quickly test your application with a burner wallet and local faucet.
- 🔐 **Integration with Wallet Providers**: Connect to different wallet providers and interact with the Ethereum network.

<div align="center" style="margin-top: 24px;">
  <img alt="App demo" src="./packages/nextjs/public/scaffold-lisk-landing.png" width="100%">
</div>

## Getting Started

### Prerequisites
- Node.js >= 18.17
- Yarn or npm
- MetaMask or any Web3 wallet

### Installation

1. Clone the repository
```bash
git clone https://github.com/0xelibigman/inicio.git
cd inicio
```

2. Install dependencies
```bash
cd packages/inicio
yarn install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Add your WalletConnect Project ID to `.env.local`:
```
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

4. Start the development server
```bash
yarn dev
```

Visit `http://localhost:3000` to access the application.

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`

- Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`
- Edit your frontend in `packages/nextjs/pages`
- Edit your deployment scripts in `packages/hardhat/deploy`

## Deploy Contracts to Superchain Testnet(s)

To deploy contracts to a remote testnet (e.g. Optimism Sepolia), follow the steps below:

1. Get Superchain Sepolia ETH from the [Superchain Faucet](https://app.optimism.io/faucet)

2. Inside the `packages/hardhat` directory, copy `.env.example` to `.env`.

   ```bash
   cd packages/hardhat && cp .env.example .env
   ```

3. Edit your `.env` to specify the environment variables. Only specifying the `DEPLOYER_PRIVATE_KEY` is necessary here. The contract will be deployed from the address associated with this private key, so make sure it has enough Sepolia ETH.

   ```bash
   DEPLOYER_PRIVATE_KEY = "your_private_key_with_sepolia_ETH";
   ```

4. Inside `scaffold-lisk`, run

   ```bash
   yarn deploy --network-options
   ```

   Use spacebar to make your selection(s). This command deploys all smart contracts in `packages/hardhat/contracts` to the selected network(s). Alternatively, you can try

   ```bash
   yarn deploy --network networkName
   ```

   Network names are found in `hardhat.config.js`. Please ensure you have enough Sepolia ETH on all these Superchains. If the deployments are successful, you will see the deployment tx hash on the terminal.

## Adding Foundry

Hardhat's NodeJS stack and cleaner deployment management makes it a better default for Scaffold-Lisk.

To add Foundry to Scaffold-Lisk, follow this simple [tutorial](https://hardhat.org/hardhat-runner/docs/advanced/hardhat-and-foundry) by Hardhat. We recommend users who want more robust and faster testing to add Foundry.

## Documentation

We highly recommend visiting the original [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

To know more about its features, check out their [website](https://scaffoldeth.io).
