import React, { useState, useEffect } from 'react';
import { Copy } from '@phosphor-icons/react';
import { Button } from '@viserya/ui/Button';

type CopyTopClipboard = {
  content: string;
};

export const CopyTopClipboard = ({ content }: CopyTopClipboard) => {
  const [copySuccess, setCopySuccess] = useState('');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopySuccess('Copied successfully!');
    } catch (err) {
      setCopySuccess('Failed to copy.');
    }
  };

  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => {
        setCopySuccess('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [copySuccess]);

  return (
    <div>
      <Button $variant="outline" $size="sm" onClick={copyToClipboard}>
        <Copy size="16px" weight="duotone" /> Copy to Clipboard
      </Button>
      {copySuccess && <div>{copySuccess}</div>}
    </div>
  );
};
