const hre = require("hardhat");
const { FixedSizeBinary } = require("polkadot-api");

async function main() {
  // New Contract addresses
  const copyrightNFTAddress = "0x8EE0410f86B68B9650Ff230c534787186526c9D9";
  const nftMoneyAddress = "0x36C62ECf9d2EAd778ca6778794809e96559aa02c";

  // Get contract factories
  const SimpleCopyright = await hre.ethers.getContractFactory(
    "SimpleCopyright"
  );
  const NFTMoney = await hre.ethers.getContractFactory("NFTMoney");

  // Attach to deployed contracts
  const nftContract = await SimpleCopyright.attach(copyrightNFTAddress);
  const nftMoneyContract = await NFTMoney.attach(nftMoneyAddress);

  // Get signers
  const [deployer] = await hre.ethers.getSigners();

  console.log(`Interacting with contracts`);
  console.log(`CopyrightNFT at: ${copyrightNFTAddress}`);
  console.log(`NFTMoney at: ${nftMoneyAddress}`);
  console.log(`Using account: ${deployer.address}\n`);

  // Step 1: Register a Copyright Asset
  console.log("=== Step 1: Registering Copyright Asset ===");
  const registryFee = await nftContract.registryFee();
  console.log(`Registry fee: ${hre.ethers.formatEther(registryFee)} DOT`);

  const registerTx = await nftContract.registerCopyrightAsset(
    "My Artwork",
    "A beautiful digital artwork",
    "ipfs://QmExampleHash123",
    { value: registryFee || hre.ethers.parseEther("0.01") }
  );
  const registerReceipt = await registerTx.wait();

  // Get the token ID from the Transfer event
  const transferEvent = registerReceipt.logs.find(
    (log) =>
      log.topics[0] === hre.ethers.id("Transfer(address,address,uint256)")
  );
  const tokenId = Number(transferEvent.topics[3]);

  console.log(`✓ Copyright asset registered with token ID: ${tokenId}`);

  // Verify ownership
  const nftOwner = await nftContract.ownerOf(tokenId);
  console.log(`NFT owner: ${nftOwner}\n`);

  // Step 2: Approve NFTMoney contract to transfer the NFT
  console.log("=== Step 2: Approving NFTMoney contract ===");
  const approveTx = await nftContract.approve(nftMoneyAddress, tokenId);
  await approveTx.wait();
  console.log(`✓ NFTMoney contract approved to transfer token ${tokenId}\n`);

  // Step 3: Wrap the Copyright NFT
  console.log("=== Step 3: Wrapping Copyright NFT ===");
  const balanceBefore = await nftMoneyContract.balanceOf(deployer.address);
  console.log(
    `Token balance before wrapping: ${hre.ethers.formatUnits(
      balanceBefore,
      18
    )}`
  );

  const wrapTx = await nftMoneyContract.wrapCopyright(
    copyrightNFTAddress,
    tokenId
  );
  const receipt = await wrapTx.wait();
  console.log(`✓ Copyright NFT wrapped successfully!`);

  // Verify NFT is now owned by NFTMoney contract
  const newNftOwner = await nftContract.ownerOf(tokenId);
  console.log(`NFT is now held by: ${newNftOwner}`);

  // Check updated token balance
  const balanceAfter = await nftMoneyContract.balanceOf(deployer.address);
  console.log(
    `Token balance after wrapping: ${hre.ethers.formatUnits(balanceAfter, 18)}`
  );

  const rewardEarned = balanceAfter - balanceBefore;
  console.log(
    `Reward earned: ${hre.ethers.formatUnits(rewardEarned, 18)} tokens\n`
  );

  // Display wrapping info
  const wrappedOwner = await nftMoneyContract.wrappedNFTs(
    copyrightNFTAddress,
    tokenId
  );
  console.log("=== Wrapping Info ===");
  console.log(`NFT Contract: ${copyrightNFTAddress}`);
  console.log(`Token ID: ${tokenId}`);
  console.log(`Wrapped by: ${wrappedOwner}`);

  // Display NFTMoney token info
  const name = await nftMoneyContract.name();
  const symbol = await nftMoneyContract.symbol();
  const totalSupply = await nftMoneyContract.totalSupply();
  console.log("\n=== NFTMoney Token Info ===");
  console.log(`Token: ${name} (${symbol})`);
  console.log(
    `Total Supply: ${hre.ethers.formatUnits(totalSupply, 18)} tokens`
  );
  console.log(
    `Your Balance: ${hre.ethers.formatUnits(balanceAfter, 18)} tokens`
  );

  // Step 4: Teleport tokens to another parachain
  console.log("\n=== Step 4: Teleporting Tokens ===");
  const paraId = 1000; // Target parachain ID (example: Asset Hub)
  const beneficiaryAddress = "13mEPECpownFgBYbssfq23V8xjm2oarxieMVoKAKME4L8JXn"; // SS58 address
  const teleportAmount = 1_000_000_000_000n; // Amount to teleport (1 token in plancks = 10^12)

  // Decode SS58 address to bytes32 using polkadot-api
  const beneficiaryBytes32 =
    FixedSizeBinary.fromAccountId32(beneficiaryAddress);
  const beneficiary = beneficiaryBytes32.asHex(); // Convert to hex string (already includes 0x)

  console.log(`Teleporting to parachain: ${paraId}`);
  console.log(`Beneficiary (SS58): ${beneficiaryAddress}`);
  console.log(`Beneficiary (bytes32): ${beneficiary}`);
  console.log(`Amount: ${teleportAmount} tokens`);

  try {
    // First check balance
    const balance = await nftMoneyContract.balanceOf(deployer.address);
    console.log(
      `Current balance: ${hre.ethers.formatUnits(balance, 18)} tokens`
    );

    // Test if INK_LIBRARY_ADDRESS has code
    const INK_LIBRARY_ADDRESS = "0xEF1ec0952D3F96ca6C94e217975F89eFee42a9C2";
    const libraryCode = await hre.ethers.provider.getCode(INK_LIBRARY_ADDRESS);
    console.log(`INK Library has code: ${libraryCode !== "0x"}`);

    // Test if XCM precompile has code
    const XCM_PRECOMPILE_ADDRESS = "0x00000000000000000000000000000000000A0000";
    const xcmCode = await hre.ethers.provider.getCode(XCM_PRECOMPILE_ADDRESS);
    console.log(`XCM Precompile has code: ${xcmCode !== "0x"}`);

    // First, test calling the ink library directly to see what message it generates
    console.log("\nTesting ink! library message generation...");
    try {
      const libraryAbi = require("../contracts/ink/target/ink/ink_library.json").output.abi;
      const library = new hre.ethers.Contract(INK_LIBRARY_ADDRESS, libraryAbi, deployer);

      const generatedMessage = await library.teleport(paraId, beneficiary, teleportAmount);
      console.log(`✓ Message generated by ink! library:`);
      console.log(`  ${generatedMessage}`);
      console.log(`  Length: ${generatedMessage.length} characters\n`);
    } catch (libError) {
      console.error(`✗ Library message generation failed: ${libError.message}`);
    }

    // Try calling with static call first to see if it would revert
    console.log("Trying teleport static call...");
    try {
      await nftMoneyContract.teleport.staticCall(
        paraId,
        beneficiary,
        teleportAmount
      );
      console.log("Static call succeeded!");
    } catch (staticError) {
      console.error(`Static call failed: ${staticError.message}`);
      if (staticError.data) {
        console.error(`Error data: ${staticError.data}`);
      }
      throw staticError;
    }

    console.log("\nSending actual transaction...");
    const teleportTx = await nftMoneyContract.teleport(
      paraId,
      beneficiary,
      teleportAmount
    );
    await teleportTx.wait();
    console.log(`✓ Tokens teleported successfully!`);

    // Check balance after teleport
    const balanceAfterTeleport = await nftMoneyContract.balanceOf(deployer.address);
    console.log(
      `Balance after teleport: ${hre.ethers.formatUnits(
        balanceAfterTeleport,
        18
      )} tokens`
    );
  } catch (error) {
    console.error(`✗ Teleport failed: ${error.message}`);
    if (error.data) {
      console.error(`Error data: ${error.data}`);
    }
    if (error.reason) {
      console.error(`Error reason: ${error.reason}`);
    }
    console.error(`Full error:`, error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
