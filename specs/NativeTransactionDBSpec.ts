// specs/NativeTransactionDBSpec.ts

import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  insertTransaction(
    address: string,
    body: string,
    amount: string,
    date: string,
    type: string
  ): Promise<string>;

  getAllTransactions(): Promise<
    { id: string; address: string; body: string; amount: string; date: string; type: string }[]
  >;
}

export default TurboModuleRegistry.getEnforcing<Spec>('TransactionDBModule');
