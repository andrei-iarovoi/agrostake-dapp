import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'AgroStake',
  projectId: '60c0fab203395cf4b2aad544b7d86e2b',
  chains: [sepolia],
});
