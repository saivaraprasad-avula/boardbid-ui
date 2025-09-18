import { Helmet } from 'react-helmet-async';

const pageStyles = {
  wrapper: {
    minHeight: '100vh',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #d6eaf8 0%, #288dcf 100%)',
    fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    color: '#000',
    padding: '3rem 1.5rem',
    boxSizing: 'border-box',
  },
  card: {
    width: '100%',
    maxWidth: '520px',
    padding: '2.5rem 2rem',
    borderRadius: '20px',
    background: 'rgba(255, 255, 255, 0.95)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
    backdropFilter: 'blur(8px)',
    textAlign: 'center',
  },
  tag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.35rem 0.9rem',
    borderRadius: '999px',
    fontSize: '0.8rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    color: '#333',
    background: '#d6eaf8',
  },
  heading: {
    fontSize: 'clamp(2rem, 4vw, 2.75rem)',
    margin: '1.5rem 0 0.9rem',
    fontWeight: 700,
    color: '#000',
  },
  paragraph: {
    margin: 0,
    fontSize: '1rem',
    lineHeight: 1.65,
    color: '#444',
  },
  footer: {
    marginTop: '2rem',
    fontSize: '0.95rem',
    color: '#000',
  },
  link: {
    color: '#288dcf',
    textDecoration: 'none',
    fontWeight: 600,
  },
};

function MaintenancePage({
  tag,
  heading,
  body,
  contactEmail,
  meta,
}) {
  const description = meta?.description ?? 'BoardBid.ai is temporarily offline for scheduled maintenance.';
  const image = meta?.image ?? 'https://ik.imagekit.io/boardbid/BoardBid-OG.jpg?updatedAt=1757489348517';
  const title = meta?.title ?? 'BoardBid.ai — Maintenance';
  const paragraphs = Array.isArray(body) ? body : body ? [body] : [];

  return (
    <div style={pageStyles.wrapper} role="status" aria-live="polite">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content="https://boardbid.ai" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={image} />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <main style={pageStyles.card}>
        {tag ? <div style={pageStyles.tag}>{tag}</div> : null}
        <h1 style={pageStyles.heading}>{heading}</h1>
        {paragraphs.map((paragraph, index) => (
          <p
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            style={{
              ...pageStyles.paragraph,
              marginTop: index === 0 ? 0 : '1rem',
            }}
          >
            {paragraph}
          </p>
        ))}
        {contactEmail ? (
          <p style={pageStyles.footer}>
            Need a hand in the meantime? Reach us at{' '}
            <a style={pageStyles.link} href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
            .
          </p>
        ) : null}
      </main>
    </div>
  );
}

export default MaintenancePage;
