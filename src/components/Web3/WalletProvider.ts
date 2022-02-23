import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: 'e87f83fb85bf4aa09bdf6605ebe144b7',
      // qrcode: false,
    },
    // qrcodeModalOptions: {
    //   mobileLinks: ['metamask'],
    // },
  },
};

// const providerOptions = {
//   injected: {
//     display: {
//       logo: "data:image/gif;base64,INSERT_BASE64_STRING",
//       name: "Injected",
//       description: "Connect with the provider in your Browser"
//     },
//     package: null
//   },
// };


export const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions,
});
