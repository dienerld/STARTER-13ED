import { Redis } from "ioredis";
import { redis } from "../config/cache.config";

export class RedisConnection {
  private static _connection: Redis;

  public static get connection(): Redis {
    if (!this._connection) {
      throw new Error("Não existe conexão com o banco estabelecida");
    }

    return this._connection;
  }

  public static async connect() {
    if (!this._connection) {
      this._connection = redis;
      console.log("Conexão com o Redis foi inicializada");
    }
  }
}
