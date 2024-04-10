const { MongoClient } = require("mongodb");
const fs = require("fs").promises;
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
    const cursor = db
      .collection(collectionName)
      .find({ weight: { $gt: 68, $lt: 71.5 } });
    // konwertuję wynik do tablicy
    const result = await cursor.toArray();
    // zapisuję wynik do pliku
    await fs.writeFile("wynik_4.json", JSON.stringify(result, null, 2));
    console.log("wynik zapisano do pliku wynik_4.json");
  } finally {
    // zamykam połączenie
    await client.close();
  }
}
// wywołuję funkcję main
main().catch(console.error);
