import { useState, useEffect } from 'react';
import { web3Enable, web3Accounts, web3FromAddress } from '@polkadot/extension-dapp';
import { decodeAddress, encodeAddress } from '@polkadot/util-crypto';
import { u8aToHex } from '@polkadot/util';
import { ethers } from 'ethers';

export default function PolkadotWallet({
  onPolkadotAccount,
  onEthersProvider,
  ethereumAccount,
  ethereumProvider
}) {
  const [polkadotAccounts, setPolkadotAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    connectPolkadot();
  }, []);

  const connectPolkadot = async () => {
    setLoading(true);
    setError('');

    try {
      // Enable extension
      const extensions = await web3Enable('Copyright NFT Platform');

      if (extensions.length === 0) {
        setError('No Polkadot extension found. Please install Polkadot.js extension.');
        return;
      }

      // Get accounts
      const accounts = await web3Accounts();

      if (accounts.length === 0) {
        setError('No accounts found in Polkadot extension.');
        return;
      }

      setPolkadotAccounts(accounts);
    } catch (err) {
      console.error('Error connecting Polkadot wallet:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const selectAccount = async (account) => {
    setSelectedAccount(account);

    // Convert SS58 address to bytes32 for Ethereum contracts
    const publicKey = decodeAddress(account.address);
    const bytes32Address = u8aToHex(publicKey);

    onPolkadotAccount({
      address: account.address,
      bytes32: bytes32Address,
      name: account.meta.name,
      source: account.meta.source,
    });
  };

  const connectEthereum = async () => {
    setError('');

    try {
      if (!window.ethereum) {
        setError('Please install MetaMask!');
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const provider = new ethers.BrowserProvider(window.ethereum);
      onEthersProvider(provider, accounts[0]);
    } catch (err) {
      console.error('Error connecting Ethereum wallet:', err);
      setError(err.message);
    }
  };

  return (
    <div className="bg-white/10 dark:bg-white/10 bg-white backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20 dark:border-white/20 border-gray-200">
      <h2 className="text-2xl font-bold text-white dark:text-white text-gray-900 mb-4">Connect Wallets</h2>

      {/* Polkadot Wallet Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white dark:text-white text-gray-900 mb-3 flex items-center">
          <span className="mr-2">🔴</span> Polkadot Wallet
        </h3>

        {!selectedAccount ? (
          <div>
            {polkadotAccounts.length > 0 ? (
              <div className="space-y-2">
                {polkadotAccounts.map((account) => (
                  <button
                    key={account.address}
                    onClick={() => selectAccount(account)}
                    className="w-full bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg p-3 text-left transition-all duration-200"
                  >
                    <p className="text-white font-semibold">{account.meta.name}</p>
                    <p className="text-gray-400 text-xs font-mono mt-1">
                      {account.address.slice(0, 8)}...{account.address.slice(-6)}
                    </p>
                  </button>
                ))}
              </div>
            ) : (
              <button
                onClick={connectPolkadot}
                disabled={loading}
                className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 disabled:opacity-50"
              >
                {loading ? 'Connecting...' : 'Connect Polkadot Wallet'}
              </button>
            )}
          </div>
        ) : (
          <div className="bg-green-500/20 border border-green-500 rounded-lg p-3">
            <p className="text-green-200 text-sm">✓ Connected</p>
            <p className="text-white font-semibold">{selectedAccount.meta.name}</p>
            <p className="text-gray-300 text-xs font-mono mt-1">
              {selectedAccount.address}
            </p>
            <button
              onClick={() => {
                setSelectedAccount(null);
                onPolkadotAccount(null);
              }}
              className="mt-2 text-red-400 hover:text-red-300 text-sm"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>

      {/* Ethereum Wallet Section */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
          <span className="mr-2">⬢</span> Ethereum Wallet
        </h3>

        {!ethereumAccount ? (
          <button
            onClick={connectEthereum}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200"
          >
            Connect MetaMask
          </button>
        ) : (
          <div className="bg-green-500/20 border border-green-500 rounded-lg p-3">
            <p className="text-green-200 text-sm">✓ Connected</p>
            <p className="text-white font-mono text-sm">
              {ethereumAccount.slice(0, 6)}...{ethereumAccount.slice(-4)}
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="mt-4 bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
        <p className="text-blue-200 text-xs">
          💡 <strong>Tip:</strong> Connect both wallets - Polkadot for cross-chain addresses and MetaMask for transactions.
        </p>
      </div>
    </div>
  );
}