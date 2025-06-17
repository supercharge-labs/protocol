# supercharge-core

A Solana-based loyalty checkout program protocol that enables businesses to create and manage loyalty programs on the Solana blockchain.

## Installation

```bash
npm install supercharge-core
# or
yarn add supercharge-core
# or
pnpm add supercharge-core
```

## Quick Start

```typescript
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { initializeProtocol } from 'supercharge-core';
import { publicKey } from '@metaplex-foundation/umi';

// Create UMI instance with your RPC URL
const umi = createUmi('YOUR_RPC_URL');

// Initialize protocol with your program authority
const protocol = initializeProtocol(
  umi,
  publicKey('YOUR_PROGRAM_AUTHORITY')
);
```

## Core Features

### 1. Create a Loyalty Program

```typescript
const result = await protocol.createLoyaltyProgram({
  loyaltyProgramName: "Coffee Shop Rewards",
  metadataUri: 'https://arweave.net/your-metadata-uri',
  programAuthority: publicKey('YOUR_PROGRAM_AUTHORITY'),
  metadata: {
    organizationName: 'Coffee Shop',
    brandColor: '#FF5733',
  },
  tiers: [
    {
      name: 'Bronze',
      xpRequired: 500,
      rewards: ['2% cashback'],
    },
    {
      name: 'Silver',
      xpRequired: 1000,
      rewards: ['5% cashback', 'Free coffee monthly'],
    },
    {
      name: 'Gold',
      xpRequired: 2000,
      rewards: ['10% cashback', 'Free coffee weekly', 'Priority service'],
    },
  ],
  pointsPerAction: {
    purchase: 100,
    review: 50,
    referral: 200,
  },
});

console.log('Program created:', result);
// {
//   collection: KeypairSigner,
//   signature: 'transaction_signature',
//   programAuthority: PublicKey
// }
```

### 2. Issue a Loyalty Pass

```typescript
const pass = await protocol.issueLoyaltyPass({
  collectionAddress: publicKey('YOUR_COLLECTION_ADDRESS'),
  recipient: publicKey('CUSTOMER_WALLET_ADDRESS'),
  passName: 'Coffee Rewards Pass',
  passMetadataUri: 'https://arweave.net/pass-metadata-uri',
  updateAuthority: publicKey('YOUR_PROGRAM_AUTHORITY'),
});

console.log('Pass issued:', pass);
// {
//   asset: KeypairSigner,
//   signature: 'transaction_signature'
// }
```

### 3. Award Points

```typescript
const pointsResult = await protocol.awardLoyaltyPoints({
  passAddress: publicKey('PASS_ADDRESS'),
  action: 'purchase',
  signer: publicKey('YOUR_PROGRAM_AUTHORITY'),
  multiplier: 1.5, // Optional: 1.5x points for special events
});

console.log('Points awarded:', pointsResult);
// {
//   points: 150,
//   signature: 'transaction_signature',
//   newTier: { name: 'Silver', xpRequired: 1000, rewards: [...] }
// }
```

### 4. Send Messages to Pass Holders

```typescript
const message = await protocol.sendMessage({
  passAddress: publicKey('PASS_ADDRESS'),
  message: 'Welcome to our loyalty program!',
  sender: publicKey('YOUR_PROGRAM_AUTHORITY'),
  signer: publicKey('YOUR_PROGRAM_AUTHORITY'),
});

console.log('Message sent:', message);
// {
//   signature: 'transaction_signature',
//   message: {
//     id: 'message_id',
//     content: 'Welcome to our loyalty program!',
//     sender: 'sender_address',
//     timestamp: 1234567890,
//     read: false
//   }
// }
```

### 5. Send Broadcasts to All Holders

```typescript
const broadcast = await protocol.sendBroadcast({
  collectionAddress: publicKey('COLLECTION_ADDRESS'),
  message: 'Special weekend promotion: Double points on all purchases!',
  sender: publicKey('YOUR_PROGRAM_AUTHORITY'),
  signer: publicKey('YOUR_PROGRAM_AUTHORITY'),
});

console.log('Broadcast sent:', broadcast);
// {
//   signature: 'transaction_signature',
//   broadcast: {
//     id: 'broadcast_id',
//     content: 'Special weekend promotion...',
//     sender: 'sender_address',
//     timestamp: 1234567890,
//     read: false
//   }
// }
```

### 6. Get Program Details

```typescript
const programDetails = await protocol.getProgramDetails();

console.log('Program details:', programDetails);
// {
//   name: 'Coffee Shop Rewards',
//   uri: 'metadata_uri',
//   collectionAddress: 'collection_address',
//   updateAuthority: 'authority_address',
//   numMinted: 100,
//   creator: 'creator_address',
//   tiers: [...],
//   pointsPerAction: {
//     purchase: 100,
//     review: 50,
//     referral: 200
//   },
//   metadata: {
//     organizationName: 'Coffee Shop',
//     brandColor: '#FF5733'
//   }
// }
```

### 7. Get Asset Data

```typescript
const assetData = await protocol.getAssetData(publicKey('PASS_ADDRESS'));

console.log('Asset data:', assetData);
// {
//   xp: 1500,
//   lastAction: 'purchase',
//   actionHistory: [...],
//   currentTier: 'Silver',
//   tierUpdatedAt: 1234567890,
//   rewards: ['5% cashback', 'Free coffee monthly'],
//   name: 'Coffee Rewards Pass',
//   uri: 'pass_metadata_uri',
//   owner: 'owner_address',
//   pass: 'pass_address',
//   metadata: {
//     organizationName: 'Coffee Shop',
//     brandColor: '#FF5733'
//   },
//   rewardTiers: [...]
// }
```

## Additional Features

- **Revoke Points**: Remove points from a pass
- **Gift Points**: Award bonus points
- **Transfer Approval**: Approve pass transfers
- **Message Management**: Read and manage messages
- **Broadcast Management**: Send and manage broadcasts
- **Tier Management**: Update program tiers
- **Points Configuration**: Update points per action

## Error Handling

All methods return promises that can be caught and handled:

```typescript
try {
  const result = await protocol.createLoyaltyProgram(params);
  console.log('Success:', result);
} catch (error) {
  console.error('Error creating loyalty program:', error);
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT 
