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
    await db.collection(collectionName).insertOne({
      sex: "Male",
      first_name: "Ernest",
      last_name: "Drobny",
      job: "Developer",
      email: "edrob@gmail.com",
      location: {
        city: "Warsaw",
        address: {
          streetname: "Złota",
          streetnumber: 44,
        },
      },
      description: "some desc",
      height: 190,
      weight: 70.9,
      birth_date: "1999-05-03T07:23:16Z",
      nationality: "Poland",
      credit: [
        {
          type: "solo",
          number: 3530733569132235,
          currency: "PLN",
          balance: 234324413.72,
        },
      ],
    });
    console.log("Twoje dane zostały dodane do bazy.");
    // wyszukuje dodany obiekt w bazie
    const result = await db.collection(collectionName).findOne({
      first_name: "Ernest",
      last_name: "Drobny",
    });
    // zapisuje wynik wyszukiwania do pliku
    await fs.writeFile("wynik_6.json", JSON.stringify(result, null, 2));
    console.log("Wynik wyszukiwania zapisano do pliku wynik_6.json");
  } finally {
    // zamykam połączenie
    await client.close();
  }
}
// wywołuje funkcję main
main().catch(console.error);
