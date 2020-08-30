import { MongoClient, Db } from 'mongodb';
import config from '../../resources/config';

export class MongoDBClient {
  private client: MongoClient;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private config: any;

  constructor() {
    this.config = config();
    this.client = new MongoClient(this.config.mongoUrl, {
      appname: this.config.mongoDbName,
      auth: {
        user: this.config.mongoUser,
        password: this.config.mongoPass
      }
    });

    // this.client.connect();
  }

  public db(): Db {
    return this.client.db(this.config.mongoDbName);
  }

  public dbAsync(): Promise<Db> {
    return this.client
      .connect()
      .then((connection) => connection.db(this.config.mongoDbName));
  }
}
