import { useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACTS } from '../config';
import { themeClasses } from '../styles/theme';

const COPYRIGHT_ABI = [
  'function registerCopyrightAsset(string memory title, string memory description, string memory uri) payable returns (uint256)',
  'function registryFee() view returns (uint256)',
  'function approve(address to, uint256 tokenId)',
];

const USING_XCM_ABI = [
  'function wrapCopyright(address copyrightContract, uint256 tokenId)',
];

export default function CopyrightRegistry({ account, provider }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uri, setUri] = useState('');
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [error, setError] = useState('');
  const [tokenId, setTokenId] = useState(null);

  const registerCopyright = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTxHash('');

    try {
      const signer = await provider.getSigner();
      const copyrightContract = new ethers.Contract(
        CONTRACTS.SIMPLE_COPYRIGHT,
        COPYRIGHT_ABI,
        signer
      );

      // Get registry fee
      const fee = await copyrightContract.registryFee();

      // Register copyright
      const tx = await copyrightContract.registerCopyrightAsset(
        title,
        description,
        uri,
        { value: fee }
      );

      setTxHash(tx.hash);
      const receipt = await tx.wait();

      // Extract token ID from Transfer event
      const transferEvent = receipt.logs.find(
        (log) => log.topics[0] === ethers.id('Transfer(address,address,uint256)')
      );

      if (transferEvent) {
        const newTokenId = Number(transferEvent.topics[3]);
        setTokenId(newTokenId);
      }

      // Clear form
      setTitle('');
      setDescription('');
      setUri('');
    } catch (err) {
      console.error('Error registering copyright:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const wrapNFT = async () => {
    if (!tokenId) return;

    setLoading(true);
    setError('');

    try {
      const signer = await provider.getSigner();

      // Approve UsingXcm contract
      const copyrightContract = new ethers.Contract(
        CONTRACTS.SIMPLE_COPYRIGHT,
        COPYRIGHT_ABI,
        signer
      );

      const approveTx = await copyrightContract.approve(
        CONTRACTS.USING_XCM,
        tokenId
      );
      await approveTx.wait();

      // Wrap the NFT
      const xcmContract = new ethers.Contract(
        CONTRACTS.USING_XCM,
        USING_XCM_ABI,
        signer
      );

      const wrapTx = await xcmContract.wrapCopyright(
        CONTRACTS.SIMPLE_COPYRIGHT,
        tokenId
      );
      await wrapTx.wait();

      alert('NFT wrapped successfully! You earned 1000 tokens!');
      setTokenId(null);
    } catch (err) {
      console.error('Error wrapping NFT:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={themeClasses.card}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl md:text-3xl">🎨</span>
        <h3 className={`text-lg md:text-2xl ${themeClasses.heading}`}>Register & Monetize</h3>
      </div>
      <p className={`${themeClasses.textMuted} text-xs md:text-sm mb-4 md:mb-6`}>
        Protect your IP, wrap it, and earn liquid tokens
      </p>

      <form onSubmit={registerCopyright} className="space-y-3 md:space-y-4">
        <div>
          <label className={`block ${themeClasses.label} mb-2`}>
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={themeClasses.input}
            placeholder="My Artwork"
          />
        </div>

        <div>
          <label className={`block ${themeClasses.label} mb-2`}>
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
            className={`${themeClasses.input} resize-none`}
            placeholder="A beautiful digital artwork..."
          />
        </div>

        <div>
          <label className={`block ${themeClasses.label} mb-2`}>
            IPFS URI
          </label>
          <input
            type="text"
            value={uri}
            onChange={(e) => setUri(e.target.value)}
            required
            className={themeClasses.input}
            placeholder="ipfs://QmExampleHash123"
          />
          <p className={`${themeClasses.textMuted} text-xs mt-1`}>
            Upload your file to IPFS first, then paste the URI here
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full ${themeClasses.button}`}
        >
          {loading ? '⏳ Registering...' : '✨ Register Copyright (0.01 ETH)'}
        </button>
      </form>

      {txHash && (
        <div className={`mt-4 ${themeClasses.success}`}>
          <p className="text-sm font-semibold">✓ Transaction confirmed!</p>
          <p className="text-xs font-mono mt-1 break-all opacity-80">{txHash}</p>
          {tokenId && (
            <button
              onClick={wrapNFT}
              disabled={loading}
              className={`mt-3 w-full ${themeClasses.button}`}
            >
              💎 Wrap NFT #{tokenId} → Earn 1000 Tokens
            </button>
          )}
        </div>
      )}

      {error && (
        <div className={`mt-4 ${themeClasses.error} text-sm`}>
          <p className="font-semibold">Error</p>
          <p className="text-xs mt-1">{error}</p>
        </div>
      )}
    </div>
  );
}