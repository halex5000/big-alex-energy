import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface NavButtonProps {
  href: string;
  icon: LucideIcon;
  label: string;
  external?: boolean;
}

export function NavButton({
  href,
  icon: Icon,
  label,
  external = false,
}: NavButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors duration-200 group"
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
      {external && (
        <svg
          className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      )}
    </Link>
  );
}
