import React from 'react';
import { Helmet } from 'react-helmet-async';

interface OpenGraphMetaProps {
  title: string;
  description: string;
  image: string;
  url: string;
  locale?: string;
  siteName?: string;
}

const OpenGraphMeta: React.FC<OpenGraphMetaProps> = ({
  title,
  description,
  image,
  url,
  locale = 'en_US',
  siteName = 'EarthMera',
}) => {
  return (
    <Helmet>
      {/* 기본 메타태그 */}
      <link rel="canonical" href={url} />
      <meta name="description" content={description} />

      {/* Open Graph 메타태그 */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content={siteName} />

      {/* 트위터 카드 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default OpenGraphMeta;
