'use client';

import { useState } from 'react';
import { ArrowsClockwise } from '@phosphor-icons/react';
import { useAppContext } from '@viserya/contexts';
import { fetchContent } from '@viserya/services/fetchContent';
import { ContentTypes } from '@viserya/types';
import { ButtonIcon } from '@viserya/ui/Button';
import {
  Card,
  CardActions,
  CardContent,
  CardsContainer,
  CardTitle,
} from '@viserya/ui/Card';
import { CardHeader } from '@viserya/ui/Card/CardHeader';
import { ContentSelector } from '@viserya/ui/ContentSelector';
import { CopyTopClipboard } from '@viserya/ui/CopyToClipboard';
import { Emoji } from '@viserya/ui/Emoji';

export default function Home() {
  const [contentTitle, setContentTitle] = useState<ContentTypes>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { contextValue, setContextValue } = useAppContext();
  const { generatedContent } = contextValue;

  const getContent = async (endpoint: ContentTypes) => {
    try {
      setIsLoading(true);
      const content = await fetchContent(endpoint);
      setContextValue({ generatedContent: content });
      setContentTitle(endpoint);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching content:', error);
    }
  };

  return (
    <>
      <ContentSelector getContent={getContent} />

      {generatedContent && (
        <CardsContainer>
          <Card>
            <CardHeader>
              <Emoji name={contentTitle} size="xl" />
              <CardTitle>{contentTitle}</CardTitle>
            </CardHeader>

            <CardContent>{generatedContent}</CardContent>

            <CardActions>
              <ButtonIcon
                $isLoading={isLoading}
                $variant="secondary"
                $size="md"
                icon="ArrowsClockwise"
                title={`Generate new ${contentTitle}`}
                onClick={() => {
                  getContent(contentTitle as ContentTypes);
                }}
              />

              <CopyTopClipboard content={generatedContent} />
            </CardActions>
          </Card>
        </CardsContainer>
      )}
    </>
  );
}
