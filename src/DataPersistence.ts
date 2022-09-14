import fs from 'fs';

const filePath = './storage/ponged-data.json';
const encoding = 'utf8';

export interface PongedData {
  startBlockNumber: number;
  lastBlockNumber: number;
}

export default class DataPersistence {
  constructor() {
    console.log('Persistence loaded');
  }

  public get(): PongedData {
    try {
      if (!fs.existsSync(filePath)) {
        const model: PongedData = {
          startBlockNumber: 0,
          lastBlockNumber: 0,
        };

        fs.writeFileSync(filePath, JSON.stringify(model), encoding);
        return model;
      }

      const file = fs.readFileSync(filePath, encoding);
      return JSON.parse(file) as PongedData;
    } catch (e) {
      console.log('Error reading ponged-data.json', e);
      throw e;
    }
  }

  public set(model: PongedData) {
    try {
      if (model.startBlockNumber == 0) {
        model.startBlockNumber = model.lastBlockNumber;
      }

      fs.writeFileSync(filePath, JSON.stringify(model), encoding);
    } catch (e) {
      console.log('Error writing ponged-data.json', e);
      throw e;
    }
  }
}
