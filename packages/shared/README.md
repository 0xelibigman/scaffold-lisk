# Shared Package

This package contains shared code, types, and utilities for the Inicio platform. It facilitates communication between the frontend application and blockchain functionality.

## Contents

- **Types**: TypeScript interfaces for data structures used across packages
- **Hooks**: React hooks for interacting with blockchain contracts
- **Constants**: ABIs and other configuration constants
- **Utilities**: Helper functions for data formatting and processing

## Usage

To use this package in another workspace package:

1. Add it as a dependency in your package.json:
   ```json
   "dependencies": {
     "shared": "workspace:*"
   }
   ```

2. Import and use the shared modules:
   ```typescript
   import { useStartupProfile, useUpdateStartupProfile } from "shared";
   ```

## Blockchain Integration

The shared package provides hooks for interacting with the StartupProfileRegistry smart contract on the Lisk Sepolia testnet. The contract allows storing startup profile information on-chain.

Key features:
- Write startup profile data to the blockchain
- Read profile data from the blockchain
- Track transaction status and history