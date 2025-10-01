import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export default function WalletConnect({ account, setAccount, provider, setProvider }) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if wallet is already connected
    checkIfWalletIsConnected();
  }, []);

  const checkIfWalletIsConnected = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          setAccount(accounts[0]);
          setProvider(provider);
        }
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  };

  const connectWallet = async () => {
    setIsConnecting(true);
    setError('');

    try {
      if (!window.ethereum) {
        setError('Please install MetaMask!');
        return;
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      // Create provider and signer
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      setAccount(accounts[0]);
      setProvider(provider);

      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          setAccount(null);
          setProvider(null);
        } else {
          setAccount(accounts[0]);
        }
      });

      // Listen for chain changes
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setError(error.message);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Wallet Connection</h2>
          {account && (
            <p className="text-gray-300 font-mono text-sm">
              {account.slice(0, 6)}...{account.slice(-4)}
            </p>
          )}
        </div>

        {!account ? (
          <button
            onClick={connectWallet}
            disabled={isConnecting}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </button>
        ) : (
          <button
            onClick={disconnectWallet}
            className="bg-red-500/80 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200"
          >
            Disconnect
          </button>
        )}
      </div>

      {error && (
        <div className="mt-4 bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
}