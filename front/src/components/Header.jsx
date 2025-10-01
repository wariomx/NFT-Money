import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { themeClasses } from '../styles/theme';

export default function Header() {
  const location = useLocation();
  const {
    ethereumAccount,
    isConnected,
    isConnecting,
    connectEthereum,
    disconnectEthereum,
  } = useWallet();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#F6FCDF]/80 dark:bg-[#1A1A19]/80 border-b border-[#859F3D]/30 dark:border-[#859F3D]/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="text-3xl group-hover:scale-110 transition-transform">💰</div>
            <span className="text-2xl font-black text-[#1A1A19] dark:text-[#F6FCDF] bg-gradient-to-r from-[#31511E] to-[#859F3D] bg-clip-text text-transparent dark:from-[#859F3D] dark:to-[#F6FCDF]">
              NFT-MONEY
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`font-semibold transition-colors ${
                isActive('/')
                  ? 'text-[#859F3D] dark:text-[#859F3D]'
                  : 'text-[#31511E] dark:text-[#F6FCDF]/70 hover:text-[#859F3D] dark:hover:text-[#859F3D]'
              }`}
            >
              Home
            </Link>
            <Link
              to="/app"
              className={`font-semibold transition-colors ${
                isActive('/app')
                  ? 'text-[#859F3D] dark:text-[#859F3D]'
                  : 'text-[#31511E] dark:text-[#F6FCDF]/70 hover:text-[#859F3D] dark:hover:text-[#859F3D]'
              }`}
            >
              App
            </Link>
          </nav>

          {/* Wallet Connection */}
          <div className="flex items-center gap-3">
            {/* Wallet Status */}
            {isConnected ? (
              <div className="hidden lg:flex items-center gap-2">
                {/* Ethereum Account */}
                {ethereumAccount && (
                  <div className="bg-[#859F3D]/20 dark:bg-[#31511E]/50 px-3 py-2 rounded-lg border border-[#859F3D]/40 flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#31511E] dark:text-[#F6FCDF]">
                      ⬢
                    </span>
                    <span className="text-sm font-mono text-[#31511E] dark:text-[#F6FCDF]">
                      {ethereumAccount.slice(0, 6)}...{ethereumAccount.slice(-4)}
                    </span>
                  </div>
                )}

                {/* Disconnect Button */}
                <button
                  onClick={disconnectEthereum}
                  className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-semibold text-sm transition-colors"
                  title="Disconnect wallet"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={connectEthereum}
                disabled={isConnecting}
                className={`${themeClasses.button} py-2 px-6 text-sm`}
              >
                {isConnecting ? '⏳ Connecting...' : '🔗 Connect Wallet'}
              </button>
            )}

            {/* Mobile Menu Button */}
            <button className="md:hidden text-[#31511E] dark:text-[#F6FCDF] p-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden pb-4 flex gap-4">
          <Link
            to="/"
            className={`font-semibold text-sm transition-colors ${
              isActive('/')
                ? 'text-[#859F3D] dark:text-[#859F3D]'
                : 'text-[#31511E] dark:text-[#F6FCDF]/70'
            }`}
          >
            Home
          </Link>
          <Link
            to="/app"
            className={`font-semibold text-sm transition-colors ${
              isActive('/app')
                ? 'text-[#859F3D] dark:text-[#859F3D]'
                : 'text-[#31511E] dark:text-[#F6FCDF]/70'
            }`}
          >
            App
          </Link>
        </nav>

        {/* Mobile Wallet Status */}
        {isConnected && (
          <div className="lg:hidden pb-4 flex flex-wrap gap-2">
            {ethereumAccount && (
              <div className="bg-[#859F3D]/20 dark:bg-[#31511E]/50 px-3 py-1.5 rounded-lg border border-[#859F3D]/40 text-xs font-mono text-[#31511E] dark:text-[#F6FCDF]">
                ⬢ {ethereumAccount.slice(0, 6)}...{ethereumAccount.slice(-4)}
              </div>
            )}
            <button
              onClick={disconnectEthereum}
              className="text-red-600 dark:text-red-400 text-xs font-semibold px-3 py-1.5"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
    </header>
  );
}