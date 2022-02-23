export const formatPublicKey = (publicKey: string) => {
  const firstCharacters = publicKey.slice(0, 6);
  const lastCharacters = publicKey.slice(publicKey.length - 4);
  return `${firstCharacters}...${lastCharacters}`;
};
