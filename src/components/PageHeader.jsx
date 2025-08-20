import React from "react";
import { Link } from "react-router-dom";

/** Button variants */
const variants = {
  primary:
    "bg-[#288dcf] text-white hover:bg-[#1f7cb5] focus-visible:outline-[#288dcf] " +
    "dark:bg-[#288dcf] dark:hover:bg-[#1f7cb5] dark:focus-visible:outline-[#1f7cb5]",
  secondary:
    "bg-white text-gray-900 hover:bg-gray-50 shadow-xs inset-ring inset-ring-gray-300 " +
    "dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20",
  subtle:
    "bg-gray-100 text-gray-900 hover:bg-gray-200 " +
    "dark:bg-white/10 dark:text-white dark:hover:bg-white/20",
};

/**
 * PageHeader
 * Props:
 * - title: string (required)
 * - subtitle?: string
 * - actions?: Array<{ label: string, to?: string, onClick?: () => void, variant?: 'primary'|'secondary'|'subtle' }>
 * - align?: 'between' | 'left' | 'center'
 * - className?: string
 * - rightSlot?: ReactNode (custom JSX on the right; overrides actions if provided)
 */
export default function PageHeader({
  title,
  subtitle,
  actions = [],
  align = "between",
  className = "",
  rightSlot = null,
}) {
  const layout =
    align === "left"
      ? "md:items-center md:justify-start gap-4"
      : align === "center"
      ? "md:items-center md:justify-center text-center"
      : "md:items-center md:justify-between";

  return (
    <div className={`mb-6 ${className}`}>
      <div className={`md:flex ${layout}`}>
        {/* Title / Subtitle */}
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight dark:text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{subtitle}</p>
          )}
        </div>

        {/* Right side: custom slot OR actions */}
        <div className="mt-4 flex flex-wrap gap-2 md:mt-0 md:ml-4">
          {rightSlot
            ? rightSlot
            : actions.map(
                ({ label, to, onClick, variant = "secondary", icon: Icon }, i) => {
                  const cls =
                    "inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold " +
                    "focus-visible:outline-2 focus-visible:outline-offset-2 " +
                    (variants[variant] || variants.secondary);

                  const content = (
                    <>
                      {Icon && <Icon className="mr-1.5 h-5 w-5" aria-hidden="true" />}
                      {label}
                    </>
                  );

                  return to ? (
                    <Link key={i} to={to} className={cls}>
                      {content}
                    </Link>
                  ) : (
                    <button key={i} type="button" onClick={onClick} className={cls}>
                      {content}
                    </button>
                  );
                }
              )}
        </div>
      </div>
    </div>
  );
}