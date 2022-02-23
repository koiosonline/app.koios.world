import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { UserContext } from '../../Context/UserContext';
import { web3Modal } from './WalletProvider';
import { getUserAccount } from '../UserProfile/getUserAccount';
import { getDIDAuthenticated } from '../UserProfile/getDIDAuthenticated';
import { getDecentralizedProfile } from '../UserProfile/getDecentralizedProfile';
import { mapUserData } from '../UserProfile/mapUserData';
import { getDiscordProfile } from '../../api/Api';
import { getTitanTokenCount } from '../UserProfile/getTitanTokenCount';
import { AutoNetworkSwitch } from './AutoNetworkSwitch';
import { SnackbarContext } from '../../Context/SnackbarContext';

export const useWeb3 = () => {
  const { setIsAuthenticating, isAuthenticated, setIsAuthenticated, setAuthError, provider, setProvider } =
    useContext(AuthContext);
  const { userAccount, setUserAccount } = useContext(UserContext);
  const { setDisplayMsg } = useContext(SnackbarContext);


  const connectWallet = async () => {
    try {
      setAuthError(false);
      setIsAuthenticating(true);
      const metamaskInstalled = typeof window.web3 !== 'undefined';
      const provider = metamaskInstalled ? await web3Modal.connect() : setDisplayMsg("dfgfdg");
      await AutoNetworkSwitch(provider);
      setProvider(provider);
      const accountAddress = await getUserAccount(provider);
      await getDIDAuthenticated(accountAddress, provider);
      await getUserProfile(accountAddress);
      setIsAuthenticated(true);
      setIsAuthenticating(false);
    } catch (e) {
      console.log(e);
      setAuthError(e);
    }
  };

  const disconnectWallet = async () => {
    if (isAuthenticated && provider) {
      await web3Modal.clearCachedProvider();
      setIsAuthenticated(false);
    }

    localStorage.removeItem(userAccount?.publicKey + 'authenticated');
    setUserAccount(null);
  };

  const getUserProfile = async (accountAddress: string) => {
    try {
      const decentralizedProfile = await getDecentralizedProfile(accountAddress);
      const titanTokenCount = await getTitanTokenCount(accountAddress);
      const discordUsername = decentralizedProfile?.url;
      const discordProfile = await getDiscordProfile(discordUsername);
      const userProfile = await mapUserData(
        accountAddress,
        decentralizedProfile,
        titanTokenCount,
        discordUsername,
        discordProfile
      );
      setUserAccount(userProfile);
    } catch (e) {
      console.log(e);
      setAuthError(e);
    }
  };

  return {
    connectWallet,
    disconnectWallet,
    getUserProfile,
  };
};
