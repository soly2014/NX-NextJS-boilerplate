import Image from 'next/image';
import { LanguageSwitcher } from '@ui';
import { Link } from '@navigation';
import { SectionContainer } from '@ui';

export function Header({ locale }: { locale: string }) {
  return (
    <header className="h-20 border-b-[1px] border-gray-200 bg-white md:h-24">
      {/* <div className="h-3 bg-[#00004E]"></div> */}
      <SectionContainer className="h-full px-1 md:px-16">
        <div className="mx-auto flex h-full items-center justify-between">
          <div className="flex items-center">
            <Link href={'/'}>
              <Image
                src="/logo.svg"
                alt="Gosi Logo"
                className="hidden h-16 md:block"
                width={119}
                height={55}
              />
              <Image
                src="/logo.svg"
                alt="Gosi Logo"
                className="block h-16 md:hidden"
                width={100}
                height={45}
              />
            </Link>
          </div>
          <div>
            <LanguageSwitcher locale={locale} />
          </div>
        </div>
      </SectionContainer>
    </header>
  );
}
