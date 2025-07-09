// specs/NativeTransactionDBSpec.ts

import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  insertTransaction(
    address: string,
    body: string,
    amount: string,
    date: string,
    type: string,
    pan: string,
    networkReferenceId: string,
    accountBalance: string
  ): Promise<string>;

  insertTransactionsList(
    transactions: {
      address: string;
      body: string;
      amount: string;
      date: string;
      type: string;
      pan: string;
      networkReferenceId: string;
      accountBalance: string;
    }[]
  ): Promise<string>;

  getAllTransactions(): Promise<
    {
      id: string;
      address: string;
      body: string;
      amount: string;
      date: string;
      type: string;
      pan?: string;
      network_reference_id?: string;
      account_balance?: string;
    }[]
  >;
}

export default TurboModuleRegistry.getEnforcing<Spec>('TransactionDBModule');
