'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Button } from './button'

interface WalletButtonProps {
  variant?: 'default' | 'sidebar'
}

export function WalletButton({ variant = 'default' }: WalletButtonProps) {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted
        if (!ready) {
          return null
        }

        if (!account) {
          return (
            <Button
              onClick={openConnectModal}
              variant="outline"
            >
              Connect Wallet
            </Button>
          )
        }

        if (chain?.unsupported) {
          return (
            <Button onClick={openChainModal} variant="destructive">
              Wrong network
            </Button>
          )
        }

        if (variant === 'sidebar') {
          return (
            <div className="flex flex-col gap-2 w-full">
              <Button
                onClick={openChainModal}
                variant="outline"
                size="sm"
                className="w-full justify-start"
              >
                {chain?.name ?? 'Unknown'}
              </Button>
              <Button
                onClick={openAccountModal}
                variant="outline"
                size="sm"
                className="w-full justify-start"
              >
                {account.displayName}
                {account.displayBalance ? ` (${account.displayBalance})` : ''}
              </Button>
            </div>
          )
        }

        return (
          <div className="flex gap-2">
            <Button
              onClick={openChainModal}
              variant="outline"
              size="sm"
            >
              {chain?.name ?? 'Unknown'}
            </Button>
            <Button
              onClick={openAccountModal}
              variant="outline"
              size="sm"
            >
              {account.displayName}
              {account.displayBalance ? ` (${account.displayBalance})` : ''}
            </Button>
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
