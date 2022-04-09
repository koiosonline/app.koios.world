import { useContext, useEffect, useState } from 'react';
import { getClaimTokens } from '../api/Api';
import { UserContext } from '../Context/UserContext';
import ABI from '../components/Web3/static/ABI.json';
import Web3 from 'web3';

const Faucet = () => {
  const [hasClaimed, setHasClaimed] = useState();
  const { userAccount } = useContext(UserContext);
  const [apiResonse, setApiresonse] = useState({ message: '' });
  const web3 = new Web3('https://rinkeby.infura.io/v3/8e4de63cfa6842e2811b357d94423d01');

  const contract = new web3.eth.Contract(JSON.parse(ABI.result), '0x600060B19BE5Cb622800A243e6aAFe9F672E58F2');

  const claimTokens = async (claimAddress: string) => {
    const response = await getClaimTokens(claimAddress);
    setApiresonse(response);
  };

  useEffect(() => {
    const checkWallet = async () => {
      const data = await contract.methods.claimedList(userAccount.publicKey).call();
      setHasClaimed(data);
    };

    if (userAccount) {
      checkWallet();
    }
  }, [userAccount, apiResonse]);

  return (
    <>
      <div
        className={'header__with-min-height'}
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255, 11, 172, 0.5), rgba(47, 18, 220, 0.5)), url(https://images.unsplash.com/photo-1534996858221-380b92700493?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1931&q=80)',
        }}
      ></div>
      <div className={'title-container'}>
        <div className={'title-container__title'}>
          <h1>koios Faucet</h1>
          {!userAccount && <h3>Please connect your wallet first.</h3>}
          {userAccount && <h3 className={'title-container__wallet'}>{userAccount.publicKey}</h3>}
        </div>
      </div>
      {userAccount && !hasClaimed && (
        <div className={'content-container'}>
          <div className={'claim-container'}>
            <div className={'claim-area'}>
              <div onClick={() => claimTokens(userAccount.publicKey)} className={'btn-gradient'}>
                <h1>CLAIM</h1>
              </div>
            </div>
          </div>
          <div className={'claim-container'}>{apiResonse.message !== '' && <h2>{apiResonse.message}</h2>}</div>
        </div>
      )}
      {hasClaimed && (
        <div className={'content-container'}>
          <div className={'claim-container'}>
            <div className={'claim-area'}>
              <h2>Addres has already claimed from the faucet.</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Faucet;
