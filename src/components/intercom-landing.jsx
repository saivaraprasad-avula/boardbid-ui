import { useEffect } from 'react';

// Loads and boots Intercom so the messenger is available on every page.
export default function IntercomLoader() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.intercomSettings = { app_id: 'p1go89tx' };

      if (!window.Intercom) {
        (function () {
          var w = window;
          var ic = w.Intercom;
          if (typeof ic === 'function') {
            ic('reattach_messenger');
            ic('update', w.intercomSettings);
          } else {
            var d = document;
            var i = function () {
              i.c(arguments);
            };
            i.q = [];
            i.c = function (args) {
              i.q.push(args);
            };
            w.Intercom = i;
            var l = function () {
              var s = d.createElement('script');
              s.type = 'text/javascript';
              s.async = true;
              s.src = 'https://widget.intercom.io/widget/p1go89tx';
              var x = d.getElementsByTagName('script')[0];
              x.parentNode.insertBefore(s, x);
            };
            if (d.readyState === 'complete') {
              l();
            } else if (w.attachEvent) {
              w.attachEvent('onload', l);
            } else {
              w.addEventListener('load', l, false);
            }
          }
        })();
      }

      if (typeof window.Intercom === 'function' && !window.Intercom('booted')) {
        window.Intercom('boot', window.intercomSettings);
      }
    }
  }, []);

  return null;
}
