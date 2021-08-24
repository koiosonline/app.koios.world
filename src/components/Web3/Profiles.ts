import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import Ceramic from '@ceramicnetwork/http-client'
import { IDX } from '@ceramicstudio/idx'
import { DID } from 'dids'
import { provider } from './Web3'

declare const window: any;

const CERAMIC_URL = process.env.CERAMIC_API || 'http://localhost:7007'

export const authenticate = async () => {
  const ethProvider = provider;
  const addresses = await ethProvider.enable()

  console.log("adds: ", addresses)

  const threeIdConnect = new ThreeIdConnect()
  const authProvider = new EthereumAuthProvider(ethProvider, addresses[0])
  await threeIdConnect.connect(authProvider)

  const ceramic = new Ceramic(CERAMIC_URL)

  console.log("ceramic initialized");
  const did = new DID({
    provider: threeIdConnect.getDidProvider(),
    resolver: ThreeIdResolver.getResolver(ceramic)
  })

  console.log("did: ", did);

  await did.authenticate()
  console.log("authenticated");
  console.log(did.id)

  const jws = await did.createJWS({ hello: 'world' })
  console.log(jws)

  window.idx = new IDX({ ceramic })
  window.ceramic = ceramic
  window.did = did.id
}

export const FindAuthenticatedProfile = async (address: string) => {
  try {
    if (localStorage.getItem(address)) {
      let entry = JSON.parse(localStorage.getItem(address));
      return entry;
    }
    else {
      const profile = await window.idx.get("basicProfile", window.did);
      let profilename: string = profile.name ? profile.name : address;
      let picturesource;
      if (profile.image) {
        picturesource = profile.image.original.src;
      }
      let entry = { "name": profilename, "image": picturesource };
      localStorage.setItem(address, JSON.stringify(entry));
      return entry;
    }
  }
  catch {
    console.error("DID not found");
  }
}

export const FindProfileLeaderboard = async (address: string) => {
  console.log("in findprofile")
  const profile = await window.idx.get("basicProfile", "did:3:kjzl6cwe1jw145t8az6xf1dd4rl94cd7h0yvly1xffj5vav5adiym6ncxb71jxp");

  console.log(profile);
}

/*
export const FindProfile = async (address: string) => {
  try {
    const profile = await getLegacy3BoxProfileAsBasicProfile(address);
    if (localStorage.getItem(address)) {
      let entry = JSON.parse(localStorage.getItem(address));
      console.log(entry);
      return entry;
    }
    else {
      let profilename: string = profile.name ? profile.name : address;
      let picturesource;
      if (profile.image) {
        picturesource = profile.image.original.src;
      }
      let entry = { "name": profilename, "image": picturesource };
      localStorage.setItem(address, JSON.stringify(entry));
      return entry;
    }
  } catch {
    console.error("DID not found");
  }
}*/