import { PingEvent, PingPong } from '../typechain-types/PingPong';
import DataPersistence from './DataPersistence';
import PriorityPongQueue from './PongPriorityQueue';

export default class Process {
  constructor(
    private readonly dataPersistence: DataPersistence,
    private readonly priorityPongQueue: PriorityPongQueue,
    private readonly pingPong: PingPong,
  ) {
    console.log('Process loaded');
  }

  public async run() {
    console.log('Getting past events');
    const pongedData = this.dataPersistence.get();
    if (pongedData.lastBlockNumber !== 0) {
      let eventFilter = this.pingPong.filters.Ping();
      let pingEvents: PingEvent[] = await this.pingPong.queryFilter(eventFilter, pongedData.lastBlockNumber + 1);
      pingEvents.forEach((e: PingEvent) => this.priorityPongQueue.enqueue(e));
    }

    console.log('Listening for new events');
    this.pingPong.on('Ping', (e: PingEvent) => this.priorityPongQueue.enqueue(e));

    while (true) {
      await this.priorityPongQueue.dequeue();
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}
