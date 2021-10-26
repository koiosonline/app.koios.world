import SetupModal from "../components/SetupModal";
import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import {
  selectedAccount,
  profilePicture,
  profileName,
} from "../components/Web3/Web3";
import { ShowBadges } from "../components/Web3/Badges";
import { ProfileTokenInformation } from "../components/Web3/Tokencount";
import { Icon } from "../components/Util/Icon";
import ExploreMore from "../components/ExploreMore";
import { Connect, Disconnect } from "../components/Web3/ConnectionCheck";
import { web3Modal } from "../components/Web3/WalletProvider";
import { UserContext } from "../Context/UserContext";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [badges, setBadges] = useState<any[]>();
  const [tokens, setTokens] = useState<any>();
  const { user, setUser } = useContext(UserContext);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const modalState = () => {
    setIsModalOpen(!isModalOpen);
  };

  const getBadges = async () => {
    let badges = await ShowBadges();
    setBadges(badges);
  };

  const connectProvider = async () => {
    const checkProvider = await Connect();
    handleConnectClick();
    setUser(checkProvider);
  }

  const disconnectProvider = async () => {
    const checkProvider = await Disconnect();
    setUser(checkProvider);
  }

  const handleConnectClick = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectProvider();
    } else {
      disconnectProvider();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])


  useEffect(() => {
    getBadges();
    getTokens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAccount]);

  const getTokens = async () => {
    let tokens = await ProfileTokenInformation();
    setTokens(tokens);
  }

  return (
    <div className={"profile"}>
      {!user && (
        <div className={"container"}>
          <img
            src={"/images/pepe.png"}
            alt={"Pepe the frog"}
            className={"profile__img"}
          />
          <h1 className={"profile__name"}>Pepe is that you?!</h1>
          <p className={"profile__description"}>
            Please connect your wallet to collect achievements and see your
            stats.
          </p>

          <div className={"wallet-connection"}>
            <button
              onClick={modalState}
              className={"wallet-connection__setup-button"}
            >
              <p>Set up a wallet</p>
            </button>
            <button
              onClick={connectProvider}
              className={"wallet-connection__connect-button"}
            >
              <p>Connect wallet</p>
            </button>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
              <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                No metamask detected!
              </Alert>
            </Snackbar>
          </div>
        </div>
      )}

      {user && (
        <div className={"container"}>
          <div className={'actionContainer'}>
            <div className={'actionContainer__actions'}>
              <div onClick={disconnectProvider} className={'actionContainer__actions__item'}>
                <p>Logout</p>
                <Icon type="sign-out" className="profile__sign-out" />
              </div>
              <a href={'https://clay.self.id/'} target={'_blank'} rel={'noreferrer noopener'} className={'actionContainer__actions__item'}>
                <p>Edit profile</p>
                <Icon type="edit-profile" className="profile__sign-out" />
              </a>
            </div>
          </div>
          {!profilePicture ?
            <img
              src={"/images/pepe.png"}
              alt={"Pepe the frog"}
              className={"profile__img"}
            />
            :
            <img
              src={profilePicture}
              alt={"User"}
              className={"profile__img profile__img--active"}
            />
          }
          {!profileName ?
            <h1 className={"profile__name"}>No 3Box profile name</h1>
            :
            <h1 className={"profile__name"}>{profileName}</h1>
          }
          <div className="profile__network">
            <p className="profile__address">{selectedAccount}</p>
            {/*<a href={'https://3box.io/hub'}><Icon type="edit-profile" className="profile__sign-out" /></a>*/}
            {/*<div onClick={disconnectProvider}><Icon type="sign-out" className="profile__sign-out" /></div>*/}
          </div>

          <div className={"collectibles"}>
            <div className="achievements">
              <h2 className="achievements__header">Your achievements</h2>
              {badges?.length > 0 ? (
                <ul className="achievements__list">
                  {badges.map((item, index) => (
                    <li className="achievements__list-item" key={index}>
                      <img
                        src={item.image}
                        alt={"Badge"}
                        className="achievements__img"
                      />
                      <p className="achievements__title">{item.name}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="achievements__list--empty">No achievements huh? Start learning to earn some!</p>
              )}
            </div>
            <div className="fungible-tokens">
              <h2 className="fungible-tokens__header">Your tokens</h2>
              {tokens?.length > 0 ? (
                <ul className="fungible-tokens__list">
                  {tokens.map((item, index) => (
                    <li className="fungible-tokens__list-item" key={index}>
                      <img
                        src={item.image}
                        alt={'token'}
                        className="fungible-tokens__img"
                      />
                      <p className="fungible-tokens__title">{"Titan: "}</p>
                      <p className="fungible-tokens__balance">{item.balance}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="fungible-tokens__list--empty">No tokens huh? Start learning to earn some!</p>
              )}

            </div>
          </div>
        </div>
      )}

      <div className={"links"}>
        <Link to={"/coming-soon"} className={"links__item"}>
          <p>Donate</p>
        </Link>
        <Link to={"/coming-soon"} className={"links__item"}>
          <p>Reward Center</p>
        </Link>
        <Link to={"/leaderboard"} className={"links__item"}>
          <p>Leaderboard</p>
        </Link>
      </div>

      {isModalOpen && <SetupModal modalState={modalState} />}
      <ExploreMore title={'Explore more worlds'} buttonTitle={'Go to worlds'} buttonLink={'/worlds'} />
    </div>
  );
};
