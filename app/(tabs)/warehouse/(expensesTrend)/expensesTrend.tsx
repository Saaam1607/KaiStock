import React, { useEffect, useState } from 'react';

import { useNavigation, useRouter } from 'expo-router';

import { Text } from 'react-native';

import { BodyContainer } from '@/components/custom/containers/BodyContainer';
import { LazyContainer } from '@/components/custom/containers/LazyContainer';
import { ModalContainer } from '@/components/custom/containers/ModalContainer';
import { PageContainer } from '@/components/custom/containers/PageContainer';


import { getAllExpenses } from '@/components/api/expensesApi';

import { GestureContainer } from '@/components/custom/GestureContainer';

import { ExpenseTrend } from '@/components/custom/expense/ExpenseTrend';

export default function ExpensesTrend() {
  
  const router = useRouter();
  const navigation = useNavigation();

  const expenses = getAllExpenses();

  return (
    <GestureContainer
      // leftAction={() => router.push('/(tabs)/warehouse/(products)/newProduct')}
      // rightAction={() => navigation.goBack()}
    >
      <PageContainer>

        {/* Body */}
        <BodyContainer>
          {/* <LazyContainer> */}
            <ExpenseTrend/>
          {/* </LazyContainer> */}

        </BodyContainer>

      </PageContainer>
    </GestureContainer>
  );
}