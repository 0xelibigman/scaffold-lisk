"use client";

import Link from "next/link";
import { CopyButton } from "~~/components/scaffold-eth/CopyButton";

export const TransactionHash = ({ hash }: { hash: string }) => {
  return (
    <div className="flex items-center">
      <Link href={`/blockexplorer/transaction/${hash}`}>
        {hash?.substring(0, 6)}...{hash?.substring(hash.length - 4)}
      </Link>
      <CopyButton text={hash as string} />
    </div>
  );
};
