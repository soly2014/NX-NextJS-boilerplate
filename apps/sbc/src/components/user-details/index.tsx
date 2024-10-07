'use client';

import UserDetailsForm from './user-details-form';
import { useState } from 'react';
import AbsherForm from './absher';

export default function UserDetails() {
  const [step, setStep] = useState(1);

  return (
    <>
      {step === 1 && <UserDetailsForm setStep={setStep} />}
      {step === 2 && <AbsherForm setStep={setStep} />}
    </>
  );
}
