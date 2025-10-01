# 💰 NFT-MONEY

**Turn Your Copyright NFTs Into Liquid Cross-Chain Tokens**

Wrap your copyright NFTs to get instant liquidity, then send tokens anywhere in the Polkadot ecosystem using XCM.

---

## What It Does

1. **Register** your copyright as an NFT
2. **Wrap** the NFT → get 1000 liquid tokens instantly
3. **Trade** or **teleport** tokens to any Polkadot parachain
4. **Unwrap** anytime to get your NFT back

---

## Tech Stack

**Contracts:**

- Solidity 0.8.28 (ERC20 + ERC721)
- Ink! (Rust) for XCM message generation
- Hardhat + OpenZeppelin

**Frontend:**

- React + Vite + TailwindCSS
- MetaMask + Polkadot.js wallets
- ethers.js

**Network:**

- Polkadot Hub Testnet
- XCM for cross-chain transfers

---

## Quick Start

### 1. Install

```bash
# Clone repo
git clone https://github.com/yourusername/nft-money.git
cd nft-money

# Contracts
cd contracts
npm install
npx hardhat compile

# Frontend
cd ../front
npm install
npm run dev
```

### 2. Deploy Contracts

```bash
cd contracts
npx hardhat ignition deploy ignition/modules/UsingXcmModule.js --network polkadotHubTestnet
```

### 3. Test

```bash
npx hardhat run scripts/interact.js --network polkadotHubTestnet
```

---

## Deployed Contracts

**Polkadot Hub Testnet:**

| Contract     | Address                                      |
| ------------ | -------------------------------------------- |
| CopyrightNFT | `0x8EE0410f86B68B9650Ff230c534787186526c9D9` |
| NFTMoney     | `0x36C62ECf9d2EAd778ca6778794809e96559aa02c` |
| Ink! Library | `0xEF1ec0952D3F96ca6C94e217975F89eFee42a9C2` |

---

## How It Works

```
Register Copyright NFT
         ↓
Approve NFTMoney Contract
         ↓
Wrap NFT → Get 1000 Tokens
         ↓
    Use Tokens:
    • Trade
    • Teleport to parachain
    • Hold
         ↓
Unwrap NFT (optional)
```

---

## Project Structure

```
nft-money/
├── contracts/          # Solidity + Ink! contracts
│   ├── contracts/
│   │   ├── CopyrightNFT.sol
│   │   ├── NFTMoney.sol
│   │   └── ink/        # Ink! XCM library
│   ├── scripts/
│   └── ignition/
└── front/             # React frontend
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── config.js
    └── package.json
```

---

## Environment Setup

Create `.env` in `/contracts`:

```env
PRIVATE_KEY=your_private_key_here
```

---

## Roadmap

- [x] Copyright NFT registration
- [x] NFT wrapping for liquidity
- [x] Cross-chain teleport via XCM
- [x] MetaMask + Polkadot.js integration
- [ ] Time-based rewards for locked NFTs
- [ ] Multi-NFT batch operations
- [ ] Additional parachain support

---

## Author

**Wario - Mario Andrade**

📧 wario@soft.law

---

## License

MIT License - see [LICENSE](LICENSE)

---

Built with ❤️ for the PBA Hackathon 2025
