const { MongoClient } = require("mongodb");
const fs = require("fs").promises;
const uri = "mongodb://localhost:27017";
// tworze nowego klienta
const client = new MongoClient(uri);
async function main() {
  try {
    // lacze sie z baza danych
    await client.connect();
    const dbName = "ATD";
    const db = client.db(dbName);
    const collectionName = "zad1";
    // QUERY BEDACE ROZWIAZANIEM PODPUNKTU
    const result = await db.collection(collectionName).findOne({});
    // zapisuje wynik do pliku
    await fs.writeFile("wynik_1.json", JSON.stringify(result, null, 2));
    console.log("Wynik zapisano do pliku wynik_1.json");
  } finally {
    // zamykam polaczenie
    await client.close();
  }
}
// wywoluje funkcje main
main().catch(console.error);
