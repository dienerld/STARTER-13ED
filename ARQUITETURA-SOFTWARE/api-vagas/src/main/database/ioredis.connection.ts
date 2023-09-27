import { Redis } from "ioredis";
import { redis } from "../config/cache.config";

export class RedisConnection {
  private static _connection: Redis;

  public static get connection(): Redis {
    if (!this._connection) {
      throw new Error("Conexão com a base de dados de cache não estabelecida!");
    }

    return this._connection;
  }

  public static async connect() {
    if (!this._connection) {
      this._connection = redis;
      console.log("Base de dados de cache conectada!");
    }
  }

  public static async destroy() {
    if (!this._connection) {
      throw new Error("Base não está conectada!");
    }
    await this._connection.quit();
    console.log("Base de dados de cache desconectada!");
  }
}
