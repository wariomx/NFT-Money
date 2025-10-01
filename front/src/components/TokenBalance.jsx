import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CONTRACTS } from '../config';
import { themeClasses } from '../styles/theme';

const USING_XCM_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function balanceOf(address) view returns (uint256)',
  'function totalSupply() view returns (uint256)',
];

export default function TokenBalance({ account, provider }) {
  const [balance, setBalance] = useState('0');
  const [totalSupply, setTotalSupply] = useState('0');
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (account && provider) {
      fetchBalance();
    }
  }, [account, provider]);

  const fetchBalance = async () => {
    try {
      setLoading(true);
      const contract = new ethers.Contract(
        CONTRACTS.USING_XCM,
        USING_XCM_ABI,
        provider
      );

      const [bal, supply, name, symbol] = await Promise.all([
        contract.balanceOf(account),
        contract.totalSupply(),
        contract.name(),
        contract.symbol(),
      ]);

      setBalance(ethers.formatUnits(bal, 18));
      setTotalSupply(ethers.formatUnits(supply, 18));
      setTokenName(name);
      setTokenSymbol(symbol);
    } catch (error) {
      console.error('Error fetching balance:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={themeClasses.card}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl md:text-3xl">💰</span>
        <h3 className={`text-lg md:text-2xl ${themeClasses.heading}`}>Your Liquid Assets</h3>
      </div>
      <p className={`${themeClasses.textMuted} text-xs md:text-sm mb-4 md:mb-6`}>
        NFT-backed tokens ready to move cross-chain
      </p>

      {loading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-20 md:h-24 bg-[#859F3D]/10 dark:bg-[#859F3D]/20 rounded-lg md:rounded-xl"></div>
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div className="h-16 md:h-20 bg-[#859F3D]/10 dark:bg-[#859F3D]/20 rounded-lg"></div>
            <div className="h-16 md:h-20 bg-[#859F3D]/10 dark:bg-[#859F3D]/20 rounded-lg"></div>
          </div>
        </div>
      ) : (
        <div className="space-y-3 md:space-y-4">
          {/* Main Balance Card */}
          <div className="bg-gradient-to-br from-[#31511E]/20 to-[#859F3D]/20 dark:from-[#31511E]/30 dark:to-[#859F3D]/30 rounded-lg md:rounded-xl p-4 md:p-5 border-2 border-[#859F3D]/30 dark:border-[#859F3D]/40">
            <p className={`${themeClasses.label} mb-2`}>Your Balance</p>
            <p className={`text-2xl md:text-4xl font-bold ${themeClasses.heading}`}>
              {parseFloat(balance).toLocaleString(undefined, { maximumFractionDigits: 4 })}
            </p>
            <p className={`${themeClasses.text} text-sm md:text-base mt-1`}>{tokenSymbol}</p>
          </div>

          {/* Token Info Grid */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div className="bg-[#859F3D]/10 dark:bg-[#859F3D]/20 rounded-lg p-3 md:p-4 border border-[#859F3D]/30 dark:border-[#859F3D]/40">
              <p className={`${themeClasses.textMuted} text-xs mb-1`}>Token Name</p>
              <p className={`${themeClasses.text} font-semibold text-sm md:text-base truncate`}>
                {tokenName}
              </p>
            </div>
            <div className="bg-[#859F3D]/10 dark:bg-[#859F3D]/20 rounded-lg p-3 md:p-4 border border-[#859F3D]/30 dark:border-[#859F3D]/40">
              <p className={`${themeClasses.textMuted} text-xs mb-1`}>Total Supply</p>
              <p className={`${themeClasses.text} font-semibold text-sm md:text-base`}>
                {parseFloat(totalSupply).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
            </div>
          </div>

          {/* Refresh Button */}
          <button
            onClick={fetchBalance}
            className={`w-full ${themeClasses.buttonSecondary}`}
          >
            🔄 Refresh Balance
          </button>
        </div>
      )}
    </div>
  );
}