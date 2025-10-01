import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';
import { decodeAddress } from '@polkadot/util-crypto';
import { u8aToHex } from '@polkadot/util';

const WalletContext = createContext(null);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};

export const WalletProvider = ({ children }) => {
  const [ethereumAccount, setEthereumAccount] = useState(null);
  const [ethereumProvider, setEthereumProvider] = useState(null);
  const [polkadotAccount, setPolkadotAccount] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  // Check for existing connections on mount
  useEffect(() => {
    checkExistingConnections();
  }, []);

  const checkExistingConnections = async () => {
    // Check Ethereum
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          setEthereumAccount(accounts[0]);
          setEthereumProvider(provider);
        }
      } catch (err) {
        console.error('Error checking Ethereum connection:', err);
      }
    }

    // Don't auto-connect Polkadot - user must explicitly connect
    // This is because web3Enable requires user interaction
  };

  const connectEthereum = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      if (!window.ethereum) {
        throw new Error('Please install MetaMask!');
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const provider = new ethers.BrowserProvider(window.ethereum);
      setEthereumAccount(accounts[0]);
      setEthereumProvider(provider);

      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          disconnectEthereum();
        } else {
          setEthereumAccount(accounts[0]);
        }
      });

      // Listen for chain changes
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsConnecting(false);
    }
  };

  const connectPolkadot = async (accountIndex = 0) => {
    setIsConnecting(true);
    setError(null);

    try {
      const extensions = await web3Enable('NFT-MONEY');

      if (extensions.length === 0) {
        throw new Error('No Polkadot extension found. Please install Polkadot.js extension.');
      }

      // Small delay to ensure extension is ready
      await new Promise(resolve => setTimeout(resolve, 100));

      const allAccounts = await web3Accounts();

      if (!allAccounts || allAccounts.length === 0) {
        throw new Error('No accounts found in Polkadot extension.');
      }

      // Ensure we have a valid index
      const safeIndex = Math.min(Math.max(0, accountIndex), allAccounts.length - 1);
      const account = allAccounts[safeIndex];

      if (!account || !account.address) {
        throw new Error('Could not access account. Please try reconnecting your Polkadot extension.');
      }

      const publicKey = decodeAddress(account.address);

      const polkadotAccountData = {
        address: account.address,
        bytes32: u8aToHex(publicKey),
        name: account.meta.name || 'Unknown',
        source: account.meta.source || 'polkadot-js',
      };

      setPolkadotAccount(polkadotAccountData);

      return allAccounts;
    } catch (err) {
      console.error('Polkadot connection error:', err);
      setError(err.message);
      throw err;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectEthereum = () => {
    setEthereumAccount(null);
    setEthereumProvider(null);
  };

  const disconnectPolkadot = () => {
    setPolkadotAccount(null);
  };

  const disconnectAll = () => {
    disconnectEthereum();
    disconnectPolkadot();
  };

  const isConnected = ethereumAccount && ethereumProvider;

  const value = {
    // Ethereum
    ethereumAccount,
    ethereumProvider,
    connectEthereum,
    disconnectEthereum,

    // Polkadot
    polkadotAccount,
    connectPolkadot,
    disconnectPolkadot,

    // General
    isConnected,
    isConnecting,
    error,
    disconnectAll,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};