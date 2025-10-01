import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { decodeAddress } from '@polkadot/util-crypto';
import { u8aToHex } from '@polkadot/util';
import { CONTRACTS, PARACHAINS } from '../config';
import { themeClasses } from '../styles/theme';
import { useWallet } from '../context/WalletContext';

const USING_XCM_ABI = [
  'function teleport(uint32 paraId, bytes32 beneficiary, uint128 amount)',
];

export default function TeleportTokens({ account, provider }) {
  const { polkadotAccount, connectPolkadot, disconnectPolkadot } = useWallet();
  const [customAddress, setCustomAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [parachain, setParachain] = useState(PARACHAINS.ASSET_HUB);
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [error, setError] = useState('');
  const [useCustomAddress, setUseCustomAddress] = useState(false);
  const [isValidAddress, setIsValidAddress] = useState(true);

  // Auto-select connected wallet when it connects, or custom address when disconnected
  useEffect(() => {
    if (polkadotAccount) {
      setUseCustomAddress(false);
    } else {
      setUseCustomAddress(true);
    }
  }, [polkadotAccount]);

  // Validate and convert Polkadot address to bytes32
  const validateAndConvertAddress = (address) => {
    try {
      const publicKey = decodeAddress(address);
      return u8aToHex(publicKey);
    } catch {
      return null;
    }
  };

  // Handle custom address input with validation
  const handleCustomAddressChange = (value) => {
    setCustomAddress(value);
    if (value.trim()) {
      const bytes32 = validateAndConvertAddress(value);
      setIsValidAddress(bytes32 !== null);
    } else {
      setIsValidAddress(true);
    }
  };

  const teleport = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTxHash('');

    try {
      let beneficiaryBytes32;
      let displayAddress;

      // Determine which address to use
      if (useCustomAddress) {
        if (!customAddress.trim()) {
          throw new Error('Please enter a Polkadot address or connect your wallet');
        }
        beneficiaryBytes32 = validateAndConvertAddress(customAddress);
        if (!beneficiaryBytes32) {
          throw new Error('Invalid Polkadot address. Please check the SS58 format.');
        }
        displayAddress = customAddress;
      } else {
        if (!polkadotAccount) {
          throw new Error('Please connect your Polkadot wallet or enter a custom address');
        }
        beneficiaryBytes32 = polkadotAccount.bytes32;
        displayAddress = polkadotAccount.address;
      }

      // Convert amount to plancks (10^12 plancks = 1 token)
      const amountInPlancks = ethers.parseUnits(amount, 12);

      const signer = await provider.getSigner();
      const xcmContract = new ethers.Contract(
        CONTRACTS.USING_XCM,
        USING_XCM_ABI,
        signer
      );

      const tx = await xcmContract.teleport(
        parachain,
        beneficiaryBytes32,
        amountInPlancks
      );

      setTxHash(tx.hash);
      await tx.wait();

      console.log(`✓ Teleported to Polkadot address: ${displayAddress}`);
      setAmount('');
      setCustomAddress('');
    } catch (err) {
      console.error('Error teleporting tokens:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={themeClasses.card}>
      <h3 className={`text-xl md:text-2xl ${themeClasses.heading} mb-2`}>🚀 Cross-Chain Transfer</h3>
      <p className={`${themeClasses.textMuted} text-xs md:text-sm mb-4 md:mb-6`}>
        Send your NFT-backed money anywhere in the Polkadot ecosystem with XCM
      </p>

      <form onSubmit={teleport} className="space-y-3 md:space-y-4">
        <div>
          <label className={`block ${themeClasses.label} mb-2`}>
            Destination Parachain
          </label>
          <select
            value={parachain}
            onChange={(e) => setParachain(Number(e.target.value))}
            className={themeClasses.select}
          >
            <option value={PARACHAINS.ASSET_HUB}>Asset Hub (1000)</option>
            <option value={PARACHAINS.CORETIME}>Coretime (1005)</option>
          </select>
        </div>

        {/* Beneficiary Wallet Selection */}
        <div className="space-y-3">
          <label className={`block ${themeClasses.label} mb-2`}>
            Beneficiary Wallet (Polkadot)
          </label>

          {/* Use Connected Wallet Option */}
          {polkadotAccount ? (
            <div
              onClick={() => setUseCustomAddress(false)}
              className={`cursor-pointer rounded-lg p-4 border-2 transition-all ${
                !useCustomAddress
                  ? 'border-[#859F3D] bg-[#859F3D]/10'
                  : 'border-[#859F3D]/30 bg-[#859F3D]/5 hover:border-[#859F3D]/50'
              }`}
            >
              <div className="flex items-center gap-2 md:gap-3">
                <input
                  type="radio"
                  checked={!useCustomAddress}
                  onChange={() => setUseCustomAddress(false)}
                  className="w-4 h-4 text-[#859F3D] flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 justify-between flex-wrap">
                    <div className="flex items-center gap-1 md:gap-2">
                      <span className="text-lg md:text-xl">🔴</span>
                      <span className={`font-semibold text-sm md:text-base ${themeClasses.heading}`}>
                        My Connected Wallet
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        disconnectPolkadot();
                      }}
                      className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-xs font-semibold whitespace-nowrap"
                    >
                      ✕ Disconnect
                    </button>
                  </div>
                  <p className={`${themeClasses.textMuted} text-xs mt-1 truncate`}>
                    {polkadotAccount.name} • {polkadotAccount.address.slice(0, 6)}...{polkadotAccount.address.slice(-6)}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className={`${themeClasses.info} p-3 md:p-4 rounded-lg`}>
              <p className={`${themeClasses.text} text-xs md:text-sm mb-2 md:mb-3`}>
                No Polkadot wallet connected
              </p>
              <button
                type="button"
                onClick={() => connectPolkadot()}
                className={`${themeClasses.buttonSecondary} text-xs md:text-sm w-full md:w-auto`}
              >
                🔴 Connect Polkadot.js Extension
              </button>
            </div>
          )}

          {/* Custom Address Option */}
          <div
            onClick={() => setUseCustomAddress(true)}
            className={`cursor-pointer rounded-lg p-3 md:p-4 border-2 transition-all ${
              useCustomAddress
                ? 'border-[#859F3D] bg-[#859F3D]/10'
                : 'border-[#859F3D]/30 bg-[#859F3D]/5 hover:border-[#859F3D]/50'
            }`}
          >
            <div className="flex items-center gap-2 md:gap-3 mb-3">
              <input
                type="radio"
                checked={useCustomAddress}
                onChange={() => setUseCustomAddress(true)}
                className="w-4 h-4 text-[#859F3D] flex-shrink-0"
              />
              <span className={`font-semibold text-sm md:text-base ${themeClasses.heading}`}>
                Custom Polkadot Address
              </span>
            </div>

            {useCustomAddress && (
              <div className="mt-3">
                <input
                  type="text"
                  value={customAddress}
                  onChange={(e) => handleCustomAddressChange(e.target.value)}
                  placeholder="5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"
                  className={`${themeClasses.input} font-mono text-xs ${
                    !isValidAddress ? 'border-red-500' : ''
                  }`}
                />
                {!isValidAddress && (
                  <p className="text-red-500 text-xs mt-1">
                    ⚠️ Invalid Polkadot address (SS58 format required)
                  </p>
                )}
                <p className={`${themeClasses.textMuted} text-xs mt-1`}>
                  Enter any Polkadot/Kusama/Substrate SS58 address
                </p>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className={`block ${themeClasses.label} mb-2`}>
            Amount (tokens)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            step="0.000000000001"
            min="0.000000000001"
            className={themeClasses.input}
            placeholder="1.0"
          />
          <p className={`${themeClasses.textMuted} text-xs mt-1`}>
            Amount in native tokens (PAS)
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || !isValidAddress}
          className={`w-full ${themeClasses.button}`}
        >
          {loading ? '⏳ Teleporting...' : '🚀 Send Cross-Chain'}
        </button>
      </form>

      {txHash && (
        <div className={`mt-4 ${themeClasses.success}`}>
          <p className="text-sm font-semibold">✓ Teleport successful!</p>
          <p className="text-xs font-mono mt-1 break-all opacity-80">{txHash}</p>
        </div>
      )}

      {error && (
        <div className={`mt-4 ${themeClasses.error} text-sm`}>
          <p className="font-semibold">Error</p>
          <p className="text-xs mt-1">{error}</p>
        </div>
      )}

      <div className={`mt-4 md:mt-6 ${themeClasses.info} text-xs md:text-sm`}>
        <p className="font-semibold mb-2">
          💡 How it works:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-2 opacity-90">
          <li>Your Polkadot address is automatically converted to bytes32 format</li>
          <li>Native PAS tokens are teleported via XCM (not ERC20 tokens)</li>
          <li>Tokens arrive at the specified Polkadot address on the target parachain</li>
          <li>The contract must have sufficient native balance to execute</li>
        </ul>
      </div>
    </div>
  );
}