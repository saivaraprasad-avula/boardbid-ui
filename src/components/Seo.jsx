// filename:src/components/Seo.jsx
import { Helmet } from 'react-helmet-async';

const DEFAULTS = {
  siteName: 'BoardBid.ai',
  baseUrl: 'https://boardbid.ai',
  // Replace with a real OG image hosted on your domain if you have one:
  ogImage: 'https://boardbid.ai/og/boardbid-og.png',
  description:
    'BoardBid.ai makes DOOH advertising simple—discover inventory, build campaigns, and launch across digital billboards with ease.',
};

function toAbsoluteUrl(input, base) {
  if (!input) return undefined;
  try {
    // if already absolute, URL() will succeed
    return new URL(input).toString();
  } catch (_) {
    // treat as relative
    return `${base}${input.startsWith('/') ? '' : '/'}${input}`;
  }
}

export default function Seo({
  title,
  description,
  url,
  image,
  canonical,
  keywords = [],
  noindex = false,
  schema = null,
  siteName = DEFAULTS.siteName,
}) {
  const keywordContent = Array.isArray(keywords) ? keywords.join(', ') : keywords;

  const finalDescription = description || DEFAULTS.description;
  const finalUrl = toAbsoluteUrl(url, DEFAULTS.baseUrl);
  const finalCanonical = toAbsoluteUrl(canonical || url, DEFAULTS.baseUrl);
  const finalImage = toAbsoluteUrl(image || DEFAULTS.ogImage, DEFAULTS.baseUrl);

  return (
    <Helmet prioritizeSeoTags>
      {/* Basic */}
      {title && <title>{title} | {siteName}</title>}
      {!title && <title>{siteName}</title>}
      {finalDescription && <meta name="description" content={finalDescription} />}
      {keywordContent && <meta name="keywords" content={keywordContent} />}
      {finalCanonical && <link rel="canonical" href={finalCanonical} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      {finalUrl && <meta property="og:url" content={finalUrl} />}
      {(title || siteName) && (
        <meta property="og:title" content={title ? `${title} | ${siteName}` : siteName} />
      )}
      {finalDescription && <meta property="og:description" content={finalDescription} />}
      {finalImage && <meta property="og:image" content={finalImage} />}
      {siteName && <meta property="og:site_name" content={siteName} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {finalUrl && <meta name="twitter:url" content={finalUrl} />}
      {(title || siteName) && (
        <meta name="twitter:title" content={title ? `${title} | ${siteName}` : siteName} />
      )}
      {finalDescription && <meta name="twitter:description" content={finalDescription} />}
      {finalImage && <meta name="twitter:image" content={finalImage} />}

      {/* JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}