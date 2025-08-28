// components/intercom-landing.js
import { useEffect } from 'react';

// This component loads the Intercom script.
// It should not "boot" or "show" the messenger.
export default function IntercomLoader() {
  useEffect(() => {
    // Check if the script is already loaded to avoid duplicates
    if (typeof window !== 'undefined' && !window.Intercom) {
      // This is the standard Intercom code snippet
      (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_messenger');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/p1go89tx';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
    }
  }, []);

  return null; // This component does not render any visible UI
}