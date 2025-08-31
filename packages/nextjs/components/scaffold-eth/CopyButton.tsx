"use client";

import { useState } from "react";
import { CheckCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";

interface CopyButtonProps {
  text: string;
  className?: string;
}

export const CopyButton = ({
  text,
  className = "ml-1.5 text-xl font-normal text-sky-600 h-5 w-5 cursor-pointer",
}: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 800);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <>
      {copied ? (
        <CheckCircleIcon className={className} aria-hidden="true" />
      ) : (
        <DocumentDuplicateIcon className={className} aria-hidden="true" onClick={handleCopy} />
      )}
    </>
  );
};
