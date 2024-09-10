'use client';

import { useState } from 'react';
import { useAppContext } from '@viserya/contexts';
import { fetchContent } from '@viserya/services/fetchContent';
import { CharacterAttributes, ContentTypes } from '@viserya/types';
import { AbilityScores } from '@viserya/ui/AbilityScores';
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
import { getCharacterAttributes } from '@viserya/utils/getCharacterAttributes';

export default function Home() {
  const [contentType, setContentType] = useState<ContentTypes>();
  const [contentTitle, setContentTitle] = useState<string>();
  const [clipboardContent, setClipboardContent] = useState<string>('');
  const [abilityScores, setAbilityScores] = useState<CharacterAttributes>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { contextValue, setContextValue } = useAppContext();
  const { generatedContent } = contextValue;

  const getContent = async (endpoint: ContentTypes) => {
    try {
      setIsLoading(true);

      // Combine content fetching with additional data like tavern name if necessary
      const [content, tavernName] = await Promise.all([
        fetchContent(endpoint),
        endpoint === 'tavern'
          ? fetchContent('tavern/name')
          : Promise.resolve(''),
      ]);

      // Dynamically set context and other related state
      setContextValue({ generatedContent: content });
      setContentType(endpoint);

      // Dynamically determine content title and ability scores
      const contentTitle = endpoint === 'tavern' ? tavernName : endpoint;
      const scores =
        endpoint === 'character' ? getCharacterAttributes() : undefined;

      // Update the state accordingly
      setContentTitle(contentTitle);
      setAbilityScores(scores);

      // Prepare clipboard content dynamically
      const clipboardContent = scores
        ? `${content} ${Object.values(scores).join(', ')}`
        : `${contentTitle}. ${content}`;

      setClipboardContent(clipboardContent);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching content:', error);
    }
  };

  return (
    <>
      <ContentSelector getContent={getContent} isLoading={isLoading} />

      {generatedContent && (
        <CardsContainer>
          <Card>
            <CardHeader>
              <Emoji name={contentType} size="3xl" />
              <CardTitle>{contentTitle}</CardTitle>
            </CardHeader>

            <CardContent>{generatedContent}</CardContent>

            {abilityScores && <AbilityScores scores={abilityScores} />}

            <CardActions>
              <ButtonIcon
                $isLoading={isLoading}
                disabled={isLoading}
                $variant="secondary"
                $size="md"
                icon="ArrowsClockwise"
                title={`Generate new ${contentType}`}
                onClick={() => {
                  getContent(contentType as ContentTypes);
                }}
              />

              <CopyTopClipboard content={clipboardContent} />
            </CardActions>
          </Card>
        </CardsContainer>
      )}
    </>
  );
}
