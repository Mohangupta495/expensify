import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getAllSMS(): Promise<boolean>; // ✔ Matches Kotlin return type
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeSMSReader');
