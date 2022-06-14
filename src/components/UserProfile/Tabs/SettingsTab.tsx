import { Icon } from '../../Util/Icon';
import { SvgSprite } from '../../Util/SvgSprite';
import { AddTokenToWallet } from '../../Web3/AddTokenToWallet';
import { useWeb3 } from '../../Web3/useWeb3';
import { ThemeSwitch } from '../../../components/ThemeSwitch';

type SettingProps = {
  label: string;
  icon: keyof typeof SvgSprite;
  link?: string;
  onClick?: () => void;
};
type SettingsTabProps = {
  title: string;
};

const SettingButton: React.FC<SettingProps> = (props) => {
  const { label, icon, link, onClick } = props;

  return (
    <li className="btn btn-primary" onClick={onClick}>
      {link ? (
        <a className='link' href={link} target="_blank" rel={'noreferrer noopener'}>
          <Icon type={icon} />
          {label}
        </a>
      ) : (
        <>
          <Icon type={icon} />
          {label}
        </>
      )}
    </li>
  );
};

export const SettingsTab: React.FC<SettingsTabProps> = () => {
  const { disconnectWallet } = useWeb3();
  return (
    <div className="settings-tab">
      <ul className="settings">
        <ThemeSwitch/>
        {window.ethereum && (
          <li className="btn btn-primary" onClick={()=>AddTokenToWallet(window.ethereum)}>
            <>
              <img src="/images/MetaMask_Fox.svg" className="icon" />
              Add to MetaMask
            </>
          </li>
        )}
        <SettingButton
          icon="edit-profile"
          label="Edit profile"
          link="https://clay.self.id/"
        />
        <SettingButton
          icon="sign-out"
          label="Disconnect wallet"
          onClick={() => disconnectWallet()}
        />
      </ul>
    </div>
  );
};
