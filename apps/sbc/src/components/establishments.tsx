'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const Establishments = () => {
  const t = useTranslations();

  return (
    <div>
      <div className="ml-8 grid grid-cols-3 gap-6 pt-1">
        {/* Visit the Customer Service Representative */}
        <a
          href="https://www.gosi.gov.sa/ar/BusinessServices/ServiceDetails/visit_emp"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center rounded-lg border p-6 shadow-sm hover:bg-gray-100"
        >
          <div className="gosi-quick-links_6">
            <Image
              src="/path/to/visit_emp_icon.png"
              alt={t('visit_emp')}
              width={64}
              height={64}
            />
          </div>
          <div className="mt-4 text-center font-semibold text-green-600">
            {t('visit_emp')}
          </div>
        </a>

        {/* Report an Occupational Injury */}
        <a
          href="https://www.gosi.gov.sa/ar/BusinessServices/ServiceDetails/Report_an_Occupational_Injury"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center rounded-lg border p-6 shadow-sm hover:bg-gray-100"
        >
          <div className="gosi-quick-links_2">
            <Image
              src="/path/to/report_eq_icon.png"
              alt={t('report_eq')}
              width={64}
              height={64}
            />
          </div>
          <div className="mt-4 text-center font-semibold text-green-600">
            {t('report_eq')}
          </div>
        </a>

        {/* Link/Delink Establishments */}
        <a
          href="https://www.gosi.gov.sa/ar/BusinessServices/ServiceDetails/Delink_Link_Establishments"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center rounded-lg border p-6 shadow-sm hover:bg-gray-100"
        >
          <div className="gosi-quick-links_3">
            <Image
              src="/path/to/delink_link_icon.png"
              alt={t('delink_link')}
              width={64}
              height={64}
            />
          </div>
          <div className="mt-4 text-center font-semibold text-green-600">
            {t('delink_link')}
          </div>
        </a>

        {/* Add a Non-Saudi Contributor */}
        <a
          href="https://www.gosi.gov.sa/ar/BusinessServices/ServiceDetails/Add_non_Saudi_contributor"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center rounded-lg border p-6 shadow-sm hover:bg-gray-100"
        >
          <div className="gosi-quick-links_4">
            <Image
              src="/path/to/add_saudi_icon.png"
              alt={t('add_saudi')}
              width={64}
              height={64}
            />
          </div>
          <div className="mt-4 text-center font-semibold text-green-600">
            {t('add_saudi')}
          </div>
        </a>

        {/* Track Requests */}
        <a
          href="https://www.gosi.gov.sa/ar/BusinessServices/ServiceDetails/Track_Transaction_for_Establishment"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center rounded-lg border p-6 shadow-sm hover:bg-gray-100"
        >
          <div className="gosi-quick-links_5">
            <Image
              src="/path/to/tract_req_icon.png"
              alt={t('tract_req')}
              width={64}
              height={64}
            />
          </div>
          <div className="mt-4 text-center font-semibold text-green-600">
            {t('tract_req')}
          </div>
        </a>

        {/* Change the Branch Account Manager */}
        <a
          href="https://www.gosi.gov.sa/ar/BusinessServices/ServiceDetails/Change_Establishment_Admin"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center rounded-lg border p-6 shadow-sm hover:bg-gray-100"
        >
          <div className="gosi-quick-links_1">
            <Image
              src="/path/to/estab_admin_icon.png"
              alt={t('estab_admin')}
              width={64}
              height={64}
            />
          </div>
          <div className="mt-4 text-center font-semibold text-green-600">
            {t('estab_admin')}
          </div>
        </a>
      </div>
    </div>
  );
};

export default Establishments;
