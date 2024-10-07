import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['en', 'ar'] as const;
export const localePrefix = 'always'; // Default

type RedirectFunction = (url: string) => void; // Adjust based on the actual type.

const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({
    locales,
    localePrefix,
  }) as {
    Link: React.ComponentType<any>; // Define correct types for Link, usePathname, etc.
    redirect: RedirectFunction;
    usePathname: () => string;
    useRouter: () => any;
  };

export { Link, redirect, usePathname, useRouter };
