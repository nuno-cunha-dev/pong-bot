import fs from 'fs';
import hre, { ethers } from 'hardhat';

const encoding = 'utf8';
const pingPongArtifactPath = './artifacts/contracts/PingPong.sol/PingPong.json';
const chainId = hre.network.config.chainId;

const getPingPongContractAddress = () => {
  switch (chainId) {
    case 42:
      return process.env.KOVAN_PING_PONG_CONTRACT_ADDRESS || '';
    case 4:
      return process.env.RINKEBY_PING_PONG_CONTRACT_ADDRESS || '';
    default:
      return '';
  }
};

export const address = getPingPongContractAddress();
export const abi = JSON.parse(fs.readFileSync(pingPongArtifactPath, encoding)).abi;
export const signer = ethers.provider.getSigner();
