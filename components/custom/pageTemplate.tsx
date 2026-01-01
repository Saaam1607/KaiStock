import React from 'react';

import { PageContainer } from '@/components/custom/containers/PageContainer';
import { ModalContainer } from '@/components/custom/containers/ModalContainer';
import { HeaderContainer } from '@/components/custom/containers/HeaderContainer';
import { BodyContainer } from '@/components/custom/containers/BodyContainer';

export default function Products() {
  
  return (
    <PageContainer>

      {/* Modal */}
      <ModalContainer visible={true}>
        <></>
      </ModalContainer>

      {/* Header */}
      <HeaderContainer>
        <></>
      </HeaderContainer>

      {/* Body */}
      <BodyContainer>
        <></>
      </BodyContainer>

      {/* Notifications */}
      {/* ... */}

    </PageContainer>
  );
}