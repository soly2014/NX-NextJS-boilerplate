import React from 'react';
import { RejectCallForm, SectionContainer } from '@ui';

// نأمل منك المشاركة فى هذا الاستبيان الذى يهدف إلى قياس رضاك والاستفادة من ملاحظاتك التى ستساهم بشكل فعّال فى فريق العمل لتحسين تجربتك
export const RejectCallPage: React.FC = async () => {
  return (
    <SectionContainer>
      <RejectCallForm />
    </SectionContainer>
  );
};
