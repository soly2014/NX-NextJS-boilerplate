'use client';
import { Button } from '@ui';
import { usePathname, useRouter } from '@navigation';
import React from 'react';
import { useSearchParams } from 'next/navigation';

export function LanguageSwitcher({ locale }: any) {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSwitchLanguage = async () => {
    const nextLocale = locale === 'ar' ? 'en' : 'ar';
    const params = Array.from(searchParams.entries())
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    const newUrl = params ? `${pathName}?${params}` : pathName;

    router.push(newUrl, { locale: nextLocale });

    if (pathName === '/call') {
      window.location.href = `/${nextLocale}/call?${params}`;
    }
  };

  return (
    <Button
      onClick={handleSwitchLanguage}
      variant="ghost"
      className="text-sm text-[#000432]"
    >
      {locale === 'ar' ? 'English' : 'العربية'}
      <GlobeIcon className="mb-[5px] ms-1 h-6 w-6" />
    </Button>
  );
}

function GlobeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
