import { MongoClient, Db, MongoError } from "mongodb";
import { strictEqual } from "assert";

interface ExecutorArgs {
  db: Db;
  client: MongoClient;
}

const uri = "mongodb://localhost:27017";

async function mognodbFunc(func: (obj: ExecutorArgs) => Promise<void>): Promise<void> {
  MongoClient.connect(uri, { useUnifiedTopology: true }, (err: MongoError, client: MongoClient) => {
    strictEqual(null, err);
    const db = client.db("PD");
    func({ client, db });
  });
}

export default mognodbFunc;
