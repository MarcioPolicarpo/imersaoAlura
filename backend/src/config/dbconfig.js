import { MongoClient } from "mongodb";

export default async function connectDatabase(connectionString) {
  let mongoClient;

  try {
    mongoClient = new MongoClient(connectionString);
    console.log("Conectando ao banco de dados...");
    await mongoClient.connect();
    console.log("Conectado ao banco de dados");

    return mongoClient;
  } catch (e) {
    console.error("Não foi possível conectar ao banco de dados", e);
    process.exit();
  }
}
