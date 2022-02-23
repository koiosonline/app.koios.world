import { DecentralizedProfile } from '../../types/UserProfile/DecentralizedProfile';
import { DiscordProfile } from '../../types/UserProfile/DiscordProfile';
import { formatPublicKey } from '../Util/formatPublicKey';
import { getCidImage } from '../Web3/Ipfs';
import { TokenBalance } from '../../types/UserProfile/TokenBalance';
import { getUserRank } from './getUserRank';

const discordProfileData = (discordUsername, discordProfile) => {
  const checkIsMember = !!discordProfile;
  const getDiscordRank = checkIsMember ? getUserRank(discordProfile?.level) : undefined;

  if (discordUsername || discordProfile) {
    return {
      isMember: checkIsMember,
      discordHandle: discordProfile?.username || discordUsername,
      level: discordProfile?.level,
      messageCount: discordProfile?.message_count,
      discordRank: getDiscordRank,
      xp: {
        currentXP: discordProfile?.detailed_xp[0],
        necessaryXP: discordProfile?.detailed_xp[1],
        totalXP: discordProfile?.detailed_xp[2],
      },
    };
  }

  return undefined;
};

export const mapUserData = async (
  accountAddress: string,
  decentralizedProfile: DecentralizedProfile,
  titanTokenCount: TokenBalance,
  discordUsername?: string,
  discordProfile?: DiscordProfile
) => {
  return {
    publicKey: accountAddress,
    publicKeyFormatted: formatPublicKey(accountAddress),
    name: decentralizedProfile?.name,
    emoji: decentralizedProfile?.emoji,
    description: decentralizedProfile?.description,
    profileBanner: await getCidImage(decentralizedProfile?.background?.original?.src),
    profileImage: await getCidImage(decentralizedProfile?.image?.original?.src),
    tokenBalance: titanTokenCount,
    discordProfile: discordProfileData(discordUsername, discordProfile),
  };
};
