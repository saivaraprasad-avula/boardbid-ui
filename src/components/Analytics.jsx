import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const GA_ID = 'G-VBRL1YQ0QH';

export default function Analytics() {
  const location = useLocation();
  const initialized = useRef(false);
  const lastPath = useRef(null);

  useEffect(() => {
    if (initialized.current) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID, { send_page_view: false });

    initialized.current = true;
  }, []);

  useEffect(() => {
    const path = location.pathname + location.search;
    if (lastPath.current === path) return;
    lastPath.current = path;
    if (!window.gtag) return;
    window.gtag('event', 'page_view', {
      page_location: window.location.href,
      page_path: path,
      page_title: document.title,
    });
  }, [location]);

  return null;
}
