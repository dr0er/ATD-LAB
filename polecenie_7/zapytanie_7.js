const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
// tworzę nowego klienta
const client = new MongoClient(uri);
async function main() {
  try {
    // łączę się z bazą danych
    await client.connect();
    const dbName = "ATD";
    const db = client.db(dbName);
    const collectionName = "zad1";

    // QUERY BEDACE ROZWIAZANIEM PODPUNKTU
    const result = await db
      .collection(collectionName)
      .deleteMany({ height: { $gt: 190 } });
    // informacja o ilości usuniętych dokumentów
    console.log(`usunięto ${result.deletedCount} dokumentów.`);
  } finally {
    // zamykam połączenie
    await client.close();
  }
}
// wywołuję funkcję main
main().catch(console.error);
