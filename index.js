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
    const categoriesCollection = client.db("craftsDB").collection("categories");

    // get all data to MongoDB
    app.get("/crafts", async (req, res) => {
      const result = await craftsCollection.find().toArray();
      res.send(result);
    });

    // get single data to MongoDB
    app.get("/crafts/:id", async (req, res) => {
      const id = req.params.id;
      const result = await craftsCollection.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    // get the email and customization ture data to MongoDB
    app.get("/myArts/:email/:allYesNo", async (req, res) => {
      const email = req.params.email;
      const allYesNo = req.params.allYesNo;

      console.log(allYesNo, email);

      const result = await craftsCollection
        .find({ userEmail: email, customization: allYesNo })
        .toArray();
      res.send(result);
    });

    // get the email true data to MongoDB
    app.get("/myArts/:email", async (req, res) => {
      const email = req.params.email;

      const result = await craftsCollection
        .find({ userEmail: email })
        .toArray();
      res.send(result);
    });

    // get categories data to MongoDb
    app.get("/categories", async (req, res) => {
      const result = await categoriesCollection.find().toArray();
      res.send(result);
    });

    // get the email data to MongoDB
    app.get("/categories/:category", async (req, res) => {
      const category = req.params.category;

      const result = await craftsCollection
        .find({ subcatagoryName: category })
        .toArray();
      res.send(result);
    });

    // save to mongoDb
    app.post("/crafts", async (req, res) => {
      const newCraft = req.body;
      const result = await craftsCollection.insertOne(newCraft);
      res.send(result);
    });

    // update
    app.put("/craftUpdate/:id", async (req, res) => {
      const id = req.params.id;
      const updateData = req.body;

      const filter = { _id: new ObjectId(id) };

      const options = { upsert: true };

      const updateDoc = {
        $set: {
          item_name: updateData.item_name,
          subcatagoryName: updateData.subcatagoryName,
          userEmail: updateData.userEmail,
          userName: updateData.userName,
          price: updateData.price,
          stockStatus: updateData.stockStatus,
          rating: updateData.rating,
          processingTime: updateData.processingTime,
          customization: updateData.customization,
          photoURL: updateData.photoURL,
          description: updateData.description,
        },
      };

      const result = await craftsCollection.updateOne(
        filter,
        updateDoc,
        options
      );

      res.send(result);
    });

    // delete user own data
    app.delete("/crafts/:id", async (req, res) => {
      const id = req.params.id;
      const result = await craftsCollection.deleteOne({
        _id: new ObjectId(id),
      });
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
