import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

export const StyledTextarea = styled.textarea`
  width: 100%;
  resize: vertical;
  padding: var(--spacing-rg) var(--spacing-rg);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--input-border-color);
  background-color: var(--card-background-color);
  color: var(--input-text-color);
  resize: none;
  overflow: hidden;
`;

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = (props: TextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.addEventListener('input', adjustTextareaHeight);

      adjustTextareaHeight();

      return () => {
        textarea.removeEventListener('input', adjustTextareaHeight);
      };
    }
  }, [props]);

  return <StyledTextarea ref={textareaRef} rows={4} {...props} />;
};
