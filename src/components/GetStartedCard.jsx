import {
  PencilSquareIcon,
  ChatBubbleLeftRightIcon,
  PhotoIcon,
  CreditCardIcon,
  ChartBarIcon,
} from '@heroicons/react/20/solid';
import CardHeader from './CardHeader';

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
        href: 'https://fillout.com/t/kee9zs7Rc3us',
        external: true,
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

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function GetStartedCard() {
  return (
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
                          {step.links.map(link => (
                            <a
                              key={link.label}
                              href={link.href}
                              onClick={e => {
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
  );
}

