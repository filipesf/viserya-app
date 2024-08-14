import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Copy } from '@phosphor-icons/react';
import { Button } from '@viserya/ui/Button';

type CopyTopClipboardProps = {
  content: string;
};

const CopyTopClipboardStyled = styled.div`
  position: relative;
`;

const MessageStyled = styled.div`
  position: absolute;
  left: 50%;
  padding: var(--spacing-1) var(--spacing-3);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-sm);
  line-height: 1;
  text-align: center;
  text-wrap: nowrap;
  color: var(--text-reverse-color);
  background-color: var(--background-reverse-color);
  animation: show 2000ms ease-in-out;
  transform: translateY(-24px) translateX(-50%);
  opacity: 1;
  z-index: 1;

  @keyframes show {
    0% {
      opacity: 0;
      transform: translateY(0) translateX(-50%);
    }
    25% {
      opacity: 1;
      transform: translateY(-24px) translateX(-50%);
    }
    75% {
      opacity: 1;
      transform: translateY(-24px) translateX(-50%);
    }
    100% {
      opacity: 0;
      transform: translateY(-48px) translateX(-50%);
    }
  }
`;

export const CopyTopClipboard = ({ content }: CopyTopClipboardProps) => {
  const [notificationMessage, setNotificationMessage] = useState('');

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(content);
        setNotificationMessage('Copied!');
      } else {
        // Fallback method: prompt user to copy manually
        const textArea = document.createElement('textarea');
        textArea.value = content;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        if (successful) {
          setNotificationMessage('Copied!');
        } else {
          setNotificationMessage('Copy failed. Please copy manually.');
          window.prompt('Copy to clipboard: Ctrl+C, Enter', content);
        }
        document.body.removeChild(textArea);
      }
    } catch (err) {
      setNotificationMessage('Failed to copy.');
    }
  };

  useEffect(() => {
    if (notificationMessage) {
      const timer = setTimeout(() => {
        setNotificationMessage('');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [notificationMessage]);

  return (
    <CopyTopClipboardStyled>
      {notificationMessage && (
        <MessageStyled>{notificationMessage}</MessageStyled>
      )}
      <Button $variant="outline" $size="sm" onClick={copyToClipboard}>
        <Copy size="16px" weight="duotone" /> Copy to Clipboard
      </Button>
    </CopyTopClipboardStyled>
  );
};
