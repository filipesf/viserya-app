import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Copy } from '@phosphor-icons/react';
import { ButtonIcon } from '@viserya/ui/Button';
import { Notify } from '@viserya/ui/Notify';

type CopyTopClipboardProps = {
  content: string;
};

const CopyTopClipboardStyled = styled.div`
  position: relative;
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
      {notificationMessage && <Notify>{notificationMessage}</Notify>}
      <ButtonIcon
        $variant="secondary"
        $size="md"
        icon="Copy"
        onClick={copyToClipboard}
        title="Copy to clipboard"
      />
    </CopyTopClipboardStyled>
  );
};
