// src/components/Alert.jsx
import { CheckCircleIcon, XMarkIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/20/solid';

const VARIANTS = {
  success: {
    bg: 'bg-green-50',
    text: 'text-green-800',
    iconColor: 'text-green-400',
    ring: 'focus-visible:ring-green-600 focus-visible:ring-offset-green-50',
    Icon: CheckCircleIcon,
  },
  error: {
    bg: 'bg-red-50',
    text: 'text-red-800',
    iconColor: 'text-red-400',
    ring: 'focus-visible:ring-red-600 focus-visible:ring-offset-red-50',
    Icon: ExclamationTriangleIcon,
  },
  info: {
    bg: 'bg-blue-50',
    text: 'text-blue-800',
    iconColor: 'text-blue-400',
    ring: 'focus-visible:ring-blue-600 focus-visible:ring-offset-blue-50',
    Icon: InformationCircleIcon,
  },
  warning: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-800',
    iconColor: 'text-yellow-400',
    ring: 'focus-visible:ring-yellow-600 focus-visible:ring-offset-yellow-50',
    Icon: ExclamationTriangleIcon,
  },
};

export default function Alert({ variant = 'success', message = 'Successfully uploaded', onClose }) {
  const v = VARIANTS[variant] ?? VARIANTS.success;
  const Icon = v.Icon;

  return (
    <div className={`rounded-md ${v.bg} p-4 shadow ring-1 ring-black/5`}>
      <div className="flex">
        <div className="shrink-0">
          <Icon aria-hidden="true" className={`size-5 ${v.iconColor}`} />
        </div>
        <div className="ml-3">
          <p className={`text-sm font-medium ${v.text}`}>{message}</p>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onClose}
                className={`inline-flex rounded-md ${v.bg} p-1.5 ${v.text} hover:bg-white/60 focus-visible:ring-2 ${v.ring} focus-visible:outline-hidden`}
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}