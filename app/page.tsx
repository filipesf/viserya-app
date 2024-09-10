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

  let attributeRolls: number[];

  const getContent = async (endpoint: ContentTypes) => {
    try {
      setIsLoading(true);

      const content = await fetchContent(endpoint);

      setContextValue({ generatedContent: content });
      setContentType(endpoint);

      switch (endpoint) {
        case 'character':
          setContentTitle(endpoint);
          setAbilityScores(getCharacterAttributes());
          setClipboardContent(`${content} ${attributeRolls}`);
          break;
        case 'tavern':
          const tavernName = await fetchContent('tavernName');

          setContentTitle(tavernName);
          setAbilityScores(undefined);
          setClipboardContent(`${tavernName}. ${content}`);
          break;
        default:
          setContentTitle(endpoint);
          setAbilityScores(undefined);
          setClipboardContent(content);
          break;
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching content:', error);
    }
  };

  attributeRolls = abilityScores ? Object.values(abilityScores) : [];

  return (
    <>
      <ContentSelector getContent={getContent} isLoading={isLoading} />

      {generatedContent && (
        <CardsContainer>
          <Card>
            <CardHeader>
              <Emoji name={contentType} size="xl" />
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
