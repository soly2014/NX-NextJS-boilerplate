import React from 'react';
import { FeedbackForm } from '@ui';
import { SectionContainer } from '@ui';

export const FeedbackPage: React.FC = async () => {
  return (
    <SectionContainer>
      <FeedbackForm />
    </SectionContainer>
  );
};
