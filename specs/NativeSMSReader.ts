import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface SMS {
  address: string;
  body: string;
  date: string;
}

export interface Spec extends TurboModule {
  getAllSMS(): Promise<Array<SMS>>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeSMSReader');
