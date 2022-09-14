import { ethers } from 'hardhat';
import { abi, address, signer } from '../helpers/PingPongContractHelper';
import DataPersistence from '../src/DataPersistence';
import PriorityPongQueue from '../src/PongPriorityQueue';
import Process from '../src/Process';
import { PingPong } from '../typechain-types/PingPong';

async function main() {
  const pingPong = new ethers.Contract(address, abi, signer) as PingPong;
  const dataPersistence = new DataPersistence();
  const priorityPongQueue = new PriorityPongQueue(dataPersistence, pingPong);
  const process = new Process(dataPersistence, priorityPongQueue, pingPong);

  await process.run();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
