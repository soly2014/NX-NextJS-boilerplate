'use client';
import React, { useState } from 'react';
import { Call, WaitingPage } from '@pages';
import { Footer } from '@ui';

const Page = ({ params: { locale } }: { params: { locale: string } }) => {
  const [isCallAdmitted, setIsCallAdmitted] = useState(false);
  console.log(isCallAdmitted, 'isCallAdmitted Main Page');
  return (
    <div>
      <WaitingPage isCallAdmitted={isCallAdmitted} />
      <Call
        locale={locale}
        isCallAdmitted={isCallAdmitted}
        setIsCallAdmitted={setIsCallAdmitted}
      />
      {!isCallAdmitted && <Footer className="fixed bottom-0 w-full" />}
    </div>
  );
};

export default Page;
