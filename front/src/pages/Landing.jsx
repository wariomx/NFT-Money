import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { themeClasses } from '../styles/theme';

export default function Landing() {
  const navigate = useNavigate();
  const { connectEthereum, isConnecting, error } = useWallet();

  const handleGetStarted = async () => {
    try {
      await connectEthereum();
      navigate('/app');
    } catch (err) {
      console.error('Connection failed:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-6xl mx-auto text-center">
        {/* Hero Section */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="text-8xl animate-bounce">💰</div>
            <h1 className="text-7xl md:text-8xl font-black text-[#1A1A19] dark:text-[#F6FCDF] drop-shadow-2xl">
              <span className="bg-gradient-to-r from-[#31511E] to-[#859F3D] bg-clip-text text-transparent dark:from-[#859F3D] dark:to-[#F6FCDF]">
                NFT-MONEY
              </span>
            </h1>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A19] dark:text-[#859F3D] mb-4 md:mb-6 px-4">
            Turn Your NFTs Into Cross-Chain Liquidity
          </h2>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#1A1A19]/80 dark:text-[#F6FCDF]/80 max-w-3xl mx-auto mb-3 md:mb-4 px-4">
            Wrap your copyright NFTs into liquid tokens. Send them anywhere across the Polkadot ecosystem using XCM.
          </p>

          <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#31511E] dark:text-[#859F3D] mb-8 md:mb-12 px-4">
            Your IP. Your Money. Your Chain. 🚀
          </p>

          {/* CTA Button */}
          <button
            onClick={handleGetStarted}
            disabled={isConnecting}
            className={`${themeClasses.button} text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-3 md:py-4 transform hover:scale-105 active:scale-95 mx-4`}
          >
            {isConnecting ? '⏳ Connecting...' : '🚀 Launch App'}
          </button>

          {error && (
            <div className={`mt-6 ${themeClasses.error} max-w-md mx-4 sm:mx-auto`}>
              {error}
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 md:mb-16 px-4">
          <div className={`${themeClasses.card} text-left transform hover:scale-105 transition-transform`}>
            <div className="text-4xl md:text-5xl mb-3 md:mb-4">🎨</div>
            <h3 className={`text-lg md:text-2xl ${themeClasses.heading} mb-2 md:mb-3`}>
              Register Copyrights
            </h3>
            <p className={`${themeClasses.text} text-sm md:text-base`}>
              Protect your intellectual property on-chain. Create NFTs that represent your creative works.
            </p>
          </div>

          <div className={`${themeClasses.card} text-left transform hover:scale-105 transition-transform`}>
            <div className="text-4xl md:text-5xl mb-3 md:mb-4">💎</div>
            <h3 className={`text-lg md:text-2xl ${themeClasses.heading} mb-2 md:mb-3`}>
              Wrap & Earn
            </h3>
            <p className={`${themeClasses.text} text-sm md:text-base`}>
              Convert your NFTs into liquid tokens. Each wrapped NFT earns you 1000 tokens instantly.
            </p>
          </div>

          <div className={`${themeClasses.card} text-left transform hover:scale-105 transition-transform sm:col-span-2 lg:col-span-1`}>
            <div className="text-4xl md:text-5xl mb-3 md:mb-4">🚀</div>
            <h3 className={`text-lg md:text-2xl ${themeClasses.heading} mb-2 md:mb-3`}>
              Go Cross-Chain
            </h3>
            <p className={`${themeClasses.text} text-sm md:text-base`}>
              Send your tokens anywhere in the Polkadot ecosystem using XCM. True interoperability.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className={`${themeClasses.card} max-w-4xl mx-4 sm:mx-auto mb-12 md:mb-16`}>
          <h3 className={`text-2xl md:text-3xl ${themeClasses.heading} mb-6 md:mb-8`}>How It Works</h3>

          <div className="space-y-4 md:space-y-6 text-left">
            <div className="flex gap-3 md:gap-4">
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-[#31511E] to-[#859F3D] rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl">
                1
              </div>
              <div className="flex-1 min-w-0">
                <h4 className={`text-base md:text-xl ${themeClasses.heading} mb-1 md:mb-2`}>
                  Connect Your Wallet
                </h4>
                <p className={`${themeClasses.text} text-sm md:text-base`}>
                  Connect MetaMask to start using the platform and managing your NFTs
                </p>
              </div>
            </div>

            <div className="flex gap-3 md:gap-4">
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-[#31511E] to-[#859F3D] rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl">
                2
              </div>
              <div className="flex-1 min-w-0">
                <h4 className={`text-base md:text-xl ${themeClasses.heading} mb-1 md:mb-2`}>
                  Register & Wrap Your NFTs
                </h4>
                <p className={`${themeClasses.text} text-sm md:text-base`}>
                  Create copyright NFTs and wrap them to receive liquid tokens
                </p>
              </div>
            </div>

            <div className="flex gap-3 md:gap-4">
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-[#31511E] to-[#859F3D] rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl">
                3
              </div>
              <div className="flex-1 min-w-0">
                <h4 className={`text-base md:text-xl ${themeClasses.heading} mb-1 md:mb-2`}>
                  Send Cross-Chain
                </h4>
                <p className={`${themeClasses.text} text-sm md:text-base`}>
                  Use XCM to teleport your tokens to any parachain in the Polkadot ecosystem
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-16 px-4">
          <div className={themeClasses.card}>
            <div className="text-3xl md:text-4xl font-black text-[#31511E] dark:text-[#859F3D] mb-2">1000</div>
            <p className={`${themeClasses.text} text-sm md:text-base`}>Tokens per wrapped NFT</p>
          </div>

          <div className={themeClasses.card}>
            <div className="text-3xl md:text-4xl font-black text-[#31511E] dark:text-[#859F3D] mb-2">XCM</div>
            <p className={`${themeClasses.text} text-sm md:text-base`}>Cross-Consensus Messaging</p>
          </div>

          <div className={`${themeClasses.card} sm:col-span-2 md:col-span-1`}>
            <div className="text-3xl md:text-4xl font-black text-[#31511E] dark:text-[#859F3D] mb-2">∞</div>
            <p className={`${themeClasses.text} text-sm md:text-base`}>Parachains supported</p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className={`${themeClasses.card} max-w-2xl mx-4 sm:mx-auto`}>
          <h3 className={`text-xl md:text-3xl ${themeClasses.heading} mb-3 md:mb-4`}>
            Ready to unlock your NFT value?
          </h3>
          <p className={`${themeClasses.text} mb-4 md:mb-6 text-sm md:text-base`}>
            Join the future of cross-chain NFT liquidity
          </p>
          <button
            onClick={handleGetStarted}
            disabled={isConnecting}
            className={`${themeClasses.button} text-base md:text-xl px-8 md:px-12 py-3 md:py-4 w-full sm:w-auto`}
          >
            {isConnecting ? '⏳ Connecting...' : '🚀 Get Started Now'}
          </button>
        </div>

        {/* Footer */}
        <div className="mt-12 md:mt-16 text-center px-4">
          <p className={`${themeClasses.textMuted} text-xs md:text-sm`}>
            Built on Polkadot Hub Testnet • Powered by XCM
          </p>
        </div>
      </div>
    </div>
  );
}