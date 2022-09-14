import { PingEvent, PingPong } from '../typechain-types/PingPong';
import DataPersistence, { PongedData } from './DataPersistence';

export default class PriorityPongQueue {
  private readonly pongedData: PongedData;
  private readonly queue: PingEvent[] = [];

  constructor(private readonly dataPersistence: DataPersistence, private readonly pingPongContract: PingPong) {
    this.pongedData = this.dataPersistence.get();
  }

  public enqueue(pingEvent: PingEvent) {
    const index = this.queue.findIndex((e) => e.blockNumber > pingEvent.blockNumber);
    if (index === -1) {
      this.queue.push(pingEvent);
    } else {
      this.queue.splice(index, 0, pingEvent);
    }
  }

  public async dequeue() {
    while (this.queue.length > 0) {
      const pingEvent = this.queue[0];
      if (pingEvent) {
        try {
          const tx = await this.pingPongContract.pong(pingEvent.transactionHash);
          this.pongedData.lastBlockNumber = pingEvent.blockNumber;
          this.dataPersistence.set(this.pongedData);

          this.queue.shift();
          console.log(`Ponged ${pingEvent.transactionHash} in block ${pingEvent.blockNumber} with tx ${tx.hash}`);
        } catch (e) {
          console.log('Error ponging', e);
        }
      }
    }
  }
}
