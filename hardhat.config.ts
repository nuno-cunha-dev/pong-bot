import '@nomicfoundation/hardhat-toolbox';
import '@nomiclabs/hardhat-ethers';
import dotenv from 'dotenv';
import { HardhatUserConfig } from 'hardhat/config';
import 'reflect-metadata';

dotenv.config();

const kovanRpcUrl = process.env.KOVAN_RPC_URL || '';
const rinkebyRpcUrl = process.env.RINKEBY_RPC_URL || '';
const pongerPrivateKey = process.env.PONGER_PRIVATE_KEY || '';

const config: HardhatUserConfig = {
  solidity: '0.8.1',
  defaultNetwork: 'hardhat',
  networks: {
    kovan: {
      url: kovanRpcUrl,
      accounts: [pongerPrivateKey],
      chainId: 42,
    },
    rinkeby: {
      url: rinkebyRpcUrl,
      accounts: [pongerPrivateKey],
      chainId: 4,
    },
  },
};

export default config;
