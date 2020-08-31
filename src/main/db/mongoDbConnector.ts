/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { MongoClient, Db } from 'mongodb';

export class MongoDBConnector {
  public static client: MongoClient;
  public static config: any;

  public static connect(config: any): Promise<MongoClient> {
    return MongoClient.connect(config.mongoUrl, {
      appname: config.mongoDbName,
      auth: {
        user: config.mongoUser,
        password: config.mongoPass
      }
    }).then((mongoClient) => {
      MongoDBConnector.client = mongoClient;
      MongoDBConnector.config = config;
      return mongoClient;
    });
  }

  public static getTodoAppDB(): Db {
    return MongoDBConnector.client.db(this.config.mongoDbName);
  }

  public disconnect(): void {
    MongoDBConnector.client.close();
  }
}
