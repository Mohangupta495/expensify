import { TurboModuleRegistry } from 'react-native';
import type { TurboModule } from 'react-native';

export interface Spec extends TurboModule {
  showSplashScreen(): Promise<void>;
  hideSplashScreen(): Promise<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('SplashTurboModule');
