// potteryDatabase TKVdyqBYMIFMXXZQ

const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const cors = require("cors");
const port = 3000;

// middle ware
app.use(cors());
app.use(express.json());

// MongoDB

const uri =
  "mongodb+srv://potteryDatabase:TKVdyqBYMIFMXXZQ@cluster0.sp25joa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const craftsCollection = client.db("craftsDB").collection("craft");

    // save to mongoDb
    app.post("/crafts", async (req, res) => {
      const newCraft = req.body;
      const result = await craftsCollection.insertOne(newCraft);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Helsdffsdlo World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});