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
    const cursor = db.collection(collectionName).aggregate([
      {
        $match: {
          birth_date: {
            $gt: "2001-01-01T00:00:00Z",
            $lt: "2100-01-01T00:00:00Z",
          },
        },
      },
      {
        $project: {
          first_name: 1,
          last_name: 1,
          city: "$location.city",
          _id: 0,
        },
      },
    ]);
    // konwertuję wynik do tablicy
    const result = await cursor.toArray();
    // zapisuję wynik do pliku
    await fs.writeFile("wynik_5.json", JSON.stringify(result, null, 2));
    console.log("wynik zapisano do pliku wynik_5.json");
  } finally {
    // zamykam połączenie
    await client.close();
  }
}
// wywołuję funkcję main
main().catch(console.error);
