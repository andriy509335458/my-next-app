import mongoose, { ConnectOptions } from "mongoose";

const uri =
  "mongodb+srv://andriisenchyk:btSCrQVDn2W5YnQt@cluster0.zgegi.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0;";

const clientOptions: ConnectOptions = {
  serverApi: { version: "1", strict: false, deprecationErrors: true },
};

export async function connectToDB() {
  // check if the connection to the database is already open
  if (mongoose.connection.readyState === 1) {
    console.log("Connection to the database is already open");
    return;
  }

  // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
  await mongoose.connect(uri, clientOptions);

  await mongoose.connection.db.admin().command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
  const currentDb = mongoose.connection.db.databaseName;
  console.log(`The current database is: ${currentDb}`);
  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log("Collections:");
  console.log(collections);
}
