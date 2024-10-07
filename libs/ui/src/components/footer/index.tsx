import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { SectionContainer } from '@ui';
import { cn } from '@utils';

export function Footer({ className }: { className?: string }) {
  const t = useTranslations();

  return (
    <footer
      className={cn('mt-auto border-t border-gray-200 bg-white', className)}
    >
      <SectionContainer>
        <div className="mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center">
            <p className="text-gray-600">{t('powered_by')}</p>
            <div className="ms-2">
              <a href="https://masdr.sa/home" target="_blank">
                <Image
                  src="/masdr-logo.svg"
                  alt="Logo"
                  width={26}
                  height={40}
                />
              </a>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600">{t('all_rights_reserved')}</p>
          </div>
        </div>
      </SectionContainer>
    </footer>
  );
}
