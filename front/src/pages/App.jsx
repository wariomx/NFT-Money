import { Navigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import CopyrightRegistry from '../components/CopyrightRegistry';
import TokenBalance from '../components/TokenBalance';
import TeleportTokens from '../components/TeleportTokens';
import { themeClasses } from '../styles/theme';

export default function AppPage() {
  const { ethereumAccount, ethereumProvider, isConnected } = useWallet();

  // Redirect to landing if not connected
  if (!isConnected) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <header className="mb-6 md:mb-8 text-center">
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
          <div className="text-3xl md:text-4xl">💰</div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1A1A19] dark:text-[#F6FCDF]">
            NFT-MONEY
          </h1>
        </div>
        <p className="text-sm md:text-base text-[#1A1A19]/80 dark:text-[#859F3D] font-semibold px-4">
          Your Cross-Chain NFT Liquidity Platform
        </p>
      </header>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-4 md:space-y-6">
            <TokenBalance account={ethereumAccount} provider={ethereumProvider} />
            <CopyrightRegistry account={ethereumAccount} provider={ethereumProvider} />
          </div>

          <div>
            <TeleportTokens
              account={ethereumAccount}
              provider={ethereumProvider}
            />
          </div>
        </div>
      </div>
    </div>
  );
}