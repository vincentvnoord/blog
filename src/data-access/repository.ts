import { Pool } from "pg";

const pool = new Pool(
  {
    connectionString: process.env.DATABASE_URL,
  }
);

export abstract class Repository {
  protected client = pool;

}
