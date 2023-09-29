import { RedisConnection } from "@main/database/ioredis.connection";
import { DatabaseConnection } from "@main/database/typeorm.connection";

beforeAll(async () => {
  await DatabaseConnection.connect();
  await RedisConnection.connect();
});

afterAll(async () => {
  await DatabaseConnection.destroy();
  await RedisConnection.destroy();
});
