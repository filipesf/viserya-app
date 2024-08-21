import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@viserya/app/providers';
import StyledSheets from '@viserya/ui/shared/StyledSheets';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ViseryaApp',
  description: 'Viserya Random Prompt Generator',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body className={inter.className}>
        <StyledSheets>
          <Providers>{children}</Providers>
        </StyledSheets>
      </body>
    </html>
  );
}
