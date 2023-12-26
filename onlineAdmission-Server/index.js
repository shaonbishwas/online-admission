const express = require("express");
const cors = require("cors");
const moment = require("moment");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;
// DB_USER=uobonlineadmission
// DB_PASS=pQHkjLYG38K7nXWO
const uri = `mongodb+srv://uobonlineadmission:pQHkjLYG38K7nXWO@cluster0.c7vh25v.mongodb.net/?retryWrites=true&w=majority`;

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
    // Send a ping to confirm a successful connection
    const formcollectedCollection = client
      .db("uobOnlineAdmission")
      .collection("formcollected");
    const interestedCollection = client
      .db("uobOnlineAdmission")
      .collection("interested");
    //POST APIS
    app.post("/add", async (req, res) => {
      const category = req.query.category;
      const body = req.body;
      console.log(body);
      body.regDate = moment().format("MMM Do YY");
      if (category === "INTERESTED") {
        const result = await interestedCollection.insertOne(body);
        res.send(result);
      } else {
        const result = await formcollectedCollection.insertOne(body);
        res.send(result);
      }
    });

    //GET APIS
    app.get("/data", async (req, res) => {
      // const category = req.query.category;
      const result1 = await interestedCollection.find().toArray();
      const result2 = await formcollectedCollection.find().toArray();
      const result = [...result1, ...result2];
      res.send(result);
      // const query = {}
      // if (category) {
      //   if (category == "interested") {
      //     const result = await interestedCollection.find().toArray();
      //     res.send(result);
      //   } else {
      //     const result = await formcollectedCollection.find().toArray();
      //     res.send(result);
      //   }
      // } else {
      //   const result1 = await interestedCollection.find().toArray();
      //   const result2 = await formcollectedCollection.find().toArray();
      //   const result = [...result1, ...result2];
      //   res.send(result);
      // }
    });
    //UPDATE/DELETE APIS
    app.delete("/delete/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const type = req.query.type;
      if (type === "INTERESTED") {
        const result = await interestedCollection.deleteOne(query);
        res.send(result);
      }
      if (type === "FORM COLLECTED") {
        const result = await formcollectedCollection.deleteOne(query);
        res.send(result);
      }
    });

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
  res.send("Hello from online admission server");
});
app.listen(port, () => {
  console.log("online admission server is running");
});
