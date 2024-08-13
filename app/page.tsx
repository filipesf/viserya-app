'use client';

import { useState } from 'react';
import { useAppContext } from '@viserya/contexts';
import { fetchContent } from '@viserya/services';
import { ContentTypes } from '@viserya/types';
import { Card, CardContent, CardsContainer, CardTitle } from '@viserya/ui/Card';
import { CardHeader } from '@viserya/ui/Card/CardHeader';
import { ContentSelector } from '@viserya/ui/ContentSelector';
import { Emoji } from '@viserya/ui/Emoji';
import { Logo } from '@viserya/ui/Logo/Logo';
import { PageHeader } from '@viserya/ui/PageHeader';

export default function Home() {
  const [pageTitle, setPageTitle] = useState('');
  const { contextValue, setContextValue } = useAppContext();
  const { generatedContent } = contextValue;

  const getContent = async (endpoint: ContentTypes) => {
    try {
      const content = await fetchContent(endpoint);
      setContextValue({ generatedContent: content });
      setPageTitle(endpoint);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  return (
    <>
      <PageHeader>
        <Logo />
        <ContentSelector getContent={getContent} />
      </PageHeader>

      {generatedContent && (
        <CardsContainer>
          <Card>
            <CardHeader>
              <Emoji name={pageTitle as ContentTypes} size='xl' />
              <CardTitle>{pageTitle}</CardTitle>
            </CardHeader>
            <CardContent>{generatedContent}</CardContent>
          </Card>
        </CardsContainer>
      )}
    </>
  );
}
