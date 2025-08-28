import {
  PencilSquareIcon,
  ChatBubbleLeftRightIcon,
  PhotoIcon,
  CreditCardIcon,
  ChartBarIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import CardHeader from './CardHeader';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function GetStartedCard() {
  const [open, setOpen] = useState(false);

  // load Fillout script when modal opens
  useEffect(() => {
    if (open && !document.querySelector('script[src="https://server.fillout.com/embed/v1/"]')) {
      const script = document.createElement('script');
      script.src = 'https://server.fillout.com/embed/v1/';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [open]);

  // lock background scroll when modal is open and close on Esc
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    if (open) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKey);
    } else {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    }
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const steps = [
    {
      id: 1,
      content: 'Fill the New Campaign Form',
      icon: PencilSquareIcon,
      iconBackground: 'bg-[#288dcf]',
      links: [{ label: 'New Campaign', href: '/campaign/new' }],
    },
    {
      id: 2,
      content: 'Speak to our Experts',
      icon: ChatBubbleLeftRightIcon,
      iconBackground: 'bg-[#288dcf]',
      links: [
        {
          label: 'Chat',
          href: '#',
          onClick: () => window.Intercom && window.Intercom('show'),
        },
        {
          label: 'Book a Call',
          href: '#',
          onClick: () => setOpen(true),
        },
      ],
    },
    {
      id: 3,
      content: 'Make Payment',
      icon: CreditCardIcon,
      iconBackground: 'bg-[#288dcf]',
      links: [{ label: 'My Campaigns', href: '/campaigns' }],
    },
    {
      id: 4,
      content: 'Upload Creatives or get help in Designing them',
      icon: PhotoIcon,
      iconBackground: 'bg-[#288dcf]',
      links: [{ label: 'Manage Creatives', href: '/manage-creatives' }],
    },
    {
      id: 5,
      content: 'Track Campaign Goals',
      icon: ChartBarIcon,
      iconBackground: 'bg-[#288dcf]',
      links: [{ label: 'My Campaigns', href: '/campaigns' }],
    },
  ];

  return (
    <>
      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        <CardHeader>Get Started</CardHeader>
        <div className="p-6">
          <div className="flow-root">
            <ul role="list" className="-mb-8">
              {steps.map((step, stepIdx) => (
                <li key={step.id}>
                  <div className="relative pb-8">
                    {stepIdx !== steps.length - 1 ? (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span
                          className={classNames(
                            step.iconBackground,
                            'flex size-8 items-center justify-center rounded-full ring-8 ring-white'
                          )}
                        >
                          <step.icon className="size-5 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex items-center justify-between">
                        <p className="text-sm text-gray-900">{step.content}</p>
                        {step.links && (
                          <div className="flex items-center space-x-4">
                            {step.links.map((link) => (
                              <a
                                key={link.label}
                                href={link.href}
                                onClick={(e) => {
                                  if (link.onClick) {
                                    e.preventDefault();
                                    link.onClick(e);
                                  }
                                }}
                                target={link.external ? '_blank' : undefined}
                                rel={link.external ? 'noopener noreferrer' : undefined}
                                className="text-sm font-semibold text-[#288dcf] hover:text-[#1e6fa1]"
                              >
                                {link.label}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Modal / Sheet */}
      <div
        className={open ? 'fixed inset-0 z-50 bg-black/50' : 'hidden'}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex h-full w-full items-end sm:items-center justify-center p-0 sm:p-4">
          <div
            className="
              relative w-full bg-white shadow-xl overflow-y-auto
              h-[90dvh] rounded-none
              sm:h-[700px] sm:max-w-3xl sm:rounded-lg sm:p-4
            "
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="
                absolute right-3 top-3 z-10 rounded-full p-2
                text-gray-500 hover:text-gray-700 focus:outline-none
              "
              aria-label="Close"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            <div className="w-full h-full sm:h-auto sm:min-h-[500px] p-0 sm:p-1">
              <div
                className="w-full h-full"
                data-fillout-id="kee9zs7Rc3us"
                data-fillout-embed-type="standard"
                data-fillout-inherit-parameters
                data-fillout-dynamic-resize
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

