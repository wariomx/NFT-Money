---
title: "💰 NFT-MONEY"
subtitle: "Turn Your Copyright NFTs Into Liquid Cross-Chain Tokens"
author: "Wario - Mario Andrade | wario@soft.law"
date: "PBA Hackathon 2025"
---

# <span style="color:#859F3D">💰 NFT-MONEY</span>

## <span style="color:#31511E">Turn Your Copyright NFTs Into Liquid Cross-Chain Tokens</span>

---

**🌐 Website:** https://nft-money.vercel.app/

**💻 GitHub:** https://github.com/wariomx/NFT-Money

**👨‍💻 Author:** Wario - Mario Andrade

**📧 Email:** wario@soft.law

---

![NFT-MONEY Landing](https://raw.githubusercontent.com/wariomx/NFT-Money/main/presentation/images/landing.png)

---

# <span style="color:#859F3D">🚨 The Problem</span>

## <span style="color:#31511E">Current Issues with NFT Ownership</span>

### 🔒 **Locked Value**

NFTs are illiquid assets - you can't use their value without selling

### 💸 **No Instant Liquidity**

Need to find buyers, negotiate prices, wait for transactions

### 🏝️ **Isolated Networks**

NFTs stuck on single blockchain - can't move cross-chain

### 📜 **Intellectual Property Challenge**

Copyright holders can't easily monetize their IP rights

---

## <span style="color:#859F3D">❓ What if you could turn your copyright NFT into tradable tokens?</span>

---

# <span style="color:#859F3D">✨ Our Solution</span>

## <span style="color:#31511E">NFT-MONEY = Copyright + Liquidity + Cross-Chain</span>

![Solution](https://raw.githubusercontent.com/wariomx/NFT-Money/main/presentation/images/app1.png)

### The Platform:

1. **📝 Register** your copyright as an NFT on-chain
2. **🎁 Wrap** it to get **1000 liquid ERC20 tokens** instantly
3. **📤 Trade** or **teleport** tokens to ANY Polkadot parachain via XCM
4. **🔓 Unwrap** anytime to get your NFT back

---

### 💡 <span style="color:#859F3D">Key Innovation:</span>

First platform to combine **copyright protection** with **cross-chain DeFi liquidity**

---

# <span style="color:#859F3D">🔄 How It Works</span>

## <span style="color:#31511E">4 Simple Steps</span>

---

### <span style="color:#859F3D">1️⃣ REGISTER</span>

- Create copyright NFT (ERC721)
- Pay 0.01 DOT registration fee
- Metadata stored on-chain + IPFS

---

### <span style="color:#31511E">2️⃣ WRAP</span>

- Lock NFT in smart contract
- **Receive 1000 liquid tokens** (ERC20)
- You maintain ownership rights

---

### <span style="color:#859F3D">3️⃣ USE</span>

- **Trade** tokens like any ERC20
- **Teleport** to parachains via XCM
- **Transfer** to other users
- **Hold** as liquid IP representation

---

### <span style="color:#31511E">4️⃣ UNWRAP (Optional)</span>

- Return tokens → Get NFT back
- Only original wrapper can unwrap
- Reversible at any time

---

# <span style="color:#859F3D">🏗️ Technical Architecture</span>

## <span style="color:#31511E">Smart Contracts Layer</span>

### **CopyrightNFT.sol** (Solidity)

- ✅ ERC721 standard implementation
- ✅ On-chain metadata storage
- ✅ Registry fee mechanism (0.01 ETH)
- ✅ Deployed: `0x8EE0410f86B68B9650Ff230c534787186526c9D9`

---

### **NFTMoney.sol** (Solidity)

- ✅ ERC20 token standard
- ✅ NFT wrapping/unwrapping logic
- ✅ XCM cross-chain integration
- ✅ Deployed: `0x36C62ECf9d2EAd778ca6778794809e96559aa02c`

---

### **ink_library** (Rust/Ink!)

- ✅ Generates XCM messages
- ✅ Handles parachain routing
- ✅ Fee calculation
- ✅ Deployed: `0xEF1ec0952D3F96ca6C94e217975F89eFee42a9C2`

---

## <span style="color:#31511E">Frontend Layer</span>

**React** + **Vite** + **TailwindCSS** + **MetaMask** + **PAPI**

---

# <span style="color:#859F3D">🌐 Cross-Chain Magic (XCM)</span>

## <span style="color:#31511E">How Tokens Travel Between Chains</span>

```
1. User calls teleport(paraId, address, amount)
              ↓
2. NFTMoney burns tokens on source chain
              ↓
3. Ink! library generates XCM message
              ↓
4. XCM Precompile executes transfer
              ↓
5. Tokens arrive on destination parachain
```

---

## <span style="color:#859F3D">Supported Parachains</span>

- **Asset Hub** (Para ID: 1000) - Primary liquidity hub
- **Coretime** (Para ID: 1005) - Coretime market integration
- **More coming soon!**

---

# <span style="color:#859F3D">💻 Live Demo</span>

## <span style="color:#31511E">https://nft-money.vercel.app/</span>

![Dashboard](https://raw.githubusercontent.com/wariomx/NFT-Money/main/presentation/images/app2.png)

---

# <span style="color:#859F3D">🎨 Copyright Registration</span>

### Demo Flow:

1. ✅ Connect MetaMask wallet
2. ✅ Fill in copyright details
3. ✅ Pay 0.01 DOT registration fee
4. ✅ Receive copyright NFT

---

# <span style="color:#859F3D">🚀 Cross-Chain Transfer</span>

![Teleport](https://raw.githubusercontent.com/wariomx/NFT-Money/main/presentation/images/teleport.png)

### XCM Transfer Steps:

1. ✅ Connect Polkadot.js wallet
2. ✅ Select destination parachain
3. ✅ Enter amount to teleport
4. ✅ Tokens arrive instantly!

**Test Network:** Polkadot Hub Testnet (Chain ID: 420420422)

---

# <span style="color:#859F3D">📊 Deployed Contracts</span>

## <span style="color:#31511E">Live on Polkadot Hub Testnet</span>

| Contract         | Address                                      |
| ---------------- | -------------------------------------------- |
| **CopyrightNFT** | `0x8EE0410f86B68B9650Ff230c534787186526c9D9` |
| **NFTMoney**     | `0x36C62ECf9d2EAd778ca6778794809e96559aa02c` |
| **Ink! Library** | `0xEF1ec0952D3F96ca6C94e217975F89eFee42a9C2` |

### ✅ All contracts verified and functional!

---

# <span style="color:#859F3D">🛠️ Tech Stack</span>

## <span style="color:#31511E">Blockchain Layer</span>

- **Solidity** 0.8.28
- **Ink!** 5.0 (Rust smart contracts)
- **Hardhat** development environment
- **OpenZeppelin** security libraries
- **XCM Precompile** for cross-chain communication

## <span style="color:#31511E">Frontend Layer</span>

- **React** 18.3 + **Vite** 6.0
- **TailwindCSS** 3.4
- **ethers.js** 6.13 + **PAPI**

## <span style="color:#31511E">Infrastructure</span>

- **Polkadot Hub Testnet** (420420422)
- **Vercel** + **IPFS**

---

# <span style="color:#859F3D">🗺️ Roadmap</span>

## <span style="color:#31511E">✅ Hackathon Work - Completed (MVP)</span>

- ✅ Copyright NFT registration system
- ✅ NFT wrapping for instant liquidity
- ✅ Cross-chain teleport via XCM
- ✅ Dual wallet integration (MetaMask + Polkadot.js)
- ✅ Responsive web interface
- ✅ Full deployment on testnet

## <span style="color:#31511E">🚧 Next Steps</span>

- 🔜 Time-based rewards (10 tokens per 6h)
- 🔜 Multi-NFT batch operations
- 🔜 Additional parachain support
- 🔜 NFT marketplace integration
- 🔜 Governance token
- 🔜 IPFS Integration
- 🔜 SoftLaw Licensing Integration

---

# <span style="color:#859F3D">🏆 Competitive Advantages</span>

## <span style="color:#31511E">vs Traditional Copyright Registration</span>

| Feature       | NFT-MONEY  | Traditional         |
| ------------- | ---------- | ------------------- |
| **Speed**     | ⚡ Instant | 📆 Months           |
| **Cost**      | 💰 $0.01   | 💸 $100-500         |
| **Reach**     | 🌍 Global  | 🗺️ Country-specific |
| **Liquidity** | 💵 Instant | ❌ None             |

## <span style="color:#31511E">vs Other NFT Platforms</span>

| Feature         | NFT-MONEY          | Others          |
| --------------- | ------------------ | --------------- |
| **Cross-Chain** | 🔗 Yes (XCM)       | ❌ Single chain |
| **Reversible**  | 🔄 Yes             | ❌ Permanent    |
| **Focus**       | 📜 Legal Copyright | 🎨 Art only     |
| **Liquidity**   | 💎 Generated       | 💱 Trading only |

---

# <span style="color:#859F3D">🌍 Social Impact</span>

## <span style="color:#31511E">Empowering Creators Worldwide</span>

### 🌍 **Global Access**

- No geographical barriers
- Anyone can register copyright
- Instant global liquidity

### 💪 **Financial Inclusion**

- Artists don't need banks
- Direct monetization of IP
- DeFi access for creatives

### 🔓 **Democratization**

- Lower barriers to entry
- No middlemen needed
- True ownership

---

# <span style="color:#859F3D">What are you waiting for?</span>

## <span style="color:#31511E">Try NFT-MONEY Today!</span>

### Get Started:

1. Connect your MetaMask
2. Register your first copyright NFT
3. Wrap it for 1000 tokens
4. Teleport tokens cross-chain!

### Links:

- 🌐 https://nft-money.vercel.app/
- 💻 https://github.com/wariomx/NFT-Money
- 📧 wario@soft.law

### 🚀 Join the future of IP monetization!

---

# <span style="color:#859F3D">🙏 Thank You</span>

## **💰 NFT-MONEY**

### _Unlocking Liquidity for Your Creative Works_

---

### Questions?

- 📧 wario@soft.law

---

**Built with ❤️ for the PBA Hackathon 2025**
