import { PublicKey } from '@solana/web3.js';

export interface LoyaltyProgramTier {
  name: string;
  xpRequired: number;
  rewards: string[];
}

export interface PointsPerAction {
  [key: string]: number;
}

export interface ProgramMetadata {
  organizationName: string;
  brandColor?: string;
}

export interface CreateLoyaltyProgramParams {
  loyaltyProgramName: string;
  metadataUri: string;
  programAuthority: PublicKey;
  updateAuthority?: PublicKey;
  metadata: ProgramMetadata;
  tiers: LoyaltyProgramTier[];
  pointsPerAction: PointsPerAction;
}

export interface UpdateLoyaltyProgramParams {
  collectionAddress: PublicKey;
  programAuthority: PublicKey;
  updateAuthority: PublicKey;
  newTiers?: LoyaltyProgramTier[];
  newPointsPerAction?: PointsPerAction;
}

export interface IssueLoyaltyPassParams {
  collectionAddress: PublicKey;
  recipient: PublicKey;
  passName: string;
  passMetadataUri: string;
  assetSigner?: PublicKey;
  updateAuthority: PublicKey;
}

export interface AwardPointsParams {
  passAddress: PublicKey;
  action: string;
  signer: PublicKey;
  multiplier?: number;
}

export interface RevokePointsParams {
  passAddress: PublicKey;
  pointsToRevoke: number;
  signer: PublicKey;
}

export interface GiftPointsParams {
  passAddress: PublicKey;
  pointsToGift: number;
  signer: PublicKey;
  action: string;
}

export interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: number;
  read: boolean;
}

export interface Broadcast {
  id: string;
  content: string;
  sender: string;
  timestamp: number;
  read: boolean;
  recipients?: {
    type: 'all' | 'tier' | 'specific';
    value?: string[];
  };
}

export interface AssetData {
  xp: number;
  lastAction: string | null;
  actionHistory: Array<{
    type: string;
    points: number;
    timestamp: number;
    newTotal: number;
  }>;
  currentTier: string;
  tierUpdatedAt: number;
  rewards: string[];
  name: string;
  uri: string;
  owner: string;
  pass: string;
  metadata: ProgramMetadata;
  rewardTiers: LoyaltyProgramTier[];
}

export interface ProgramDetails {
  name: string;
  uri: string;
  collectionAddress: string;
  updateAuthority: string;
  numMinted: number;
  creator: string;
  tiers: LoyaltyProgramTier[];
  pointsPerAction: PointsPerAction;
  metadata: ProgramMetadata;
  broadcasts?: Broadcast[];
  totalBroadcasts?: number;
} 