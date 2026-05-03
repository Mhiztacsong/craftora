import { clsx } from "clsx";
import Link from "next/link";

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center text-sm md:text-base font-medium">
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            className={clsx(
              "flex items-center",
              breadcrumb.active
                ? "text-gray-900 font-semibold"
                : "text-gray-500"
            )}
          >
            {/* LINK or ACTIVE TEXT */}
            {breadcrumb.active ? (
              <span>{breadcrumb.label}</span>
            ) : (
              <Link
                href={breadcrumb.href}
                className="hover:text-blue-600 transition"
              >
                {breadcrumb.label}
              </Link>
            )}

            {/* SEPARATOR */}
            {index < breadcrumbs.length - 1 && (
              <span className="mx-2 text-gray-400">›</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}