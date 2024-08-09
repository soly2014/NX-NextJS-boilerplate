import { Button } from '@ui';
import Image from 'next/image';
import UserDetailsForm from '../../components/user-details-form';
import { useTranslations } from 'next-intl';

export default function Index() {
  const t = useTranslations();

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-wrap items-center justify-between">
        <div className="w-full p-4 lg:w-1/2">
          <h2 className="mb-4 text-3xl font-bold text-green-600">
            {t('start_from_here')}
          </h2>
          <UserDetailsForm />
        </div>
        <div className="w-full p-4 lg:w-1/2">
          <h2 className="mb-4 text-3xl font-bold text-green-600">
            {t('virtual_head')}
          </h2>
          <p className="mb-4 text-base text-gray-700">
            {t('service_virtual_visit')}
          </p>
          <Image
            src="https://gosivvwebapp-as.azurewebsites.net/vv_home.png"
            alt="Virtual Visit"
            className="w-full"
            width={200}
            height={300}
          />
        </div>
      </div>
    </div>
  );
}
