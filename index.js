const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.PORT | 5000;

app.use(express.json());
app.use(cors());



//gpeYJ3jTyAALnHAr
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const uri= "mongodb+srv://rizonrahat199:AheXI006z6v9OQzl@cluster0.yuht9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
  
    const clientCollection=client.db("client").collection("person");
    const projectCollection=client.db("projects").collection("project");
    const projectCollection2=client.db("project2").collection("project");
   
   
    app.get("/client", async (req, res) => {
      const result = await clientCollection.find().toArray();
      res.send(result);
    })


    app.get("/projects", async (req, res) => {
        const result = await projectCollection.find().toArray();
        res.send(result);
      })


      
      app.get("/projects/:id", async (req, res) => {
        const id=req.params.id;
       const query={
        _id : new ObjectId(id)
       }
        const result = await projectCollection.findOne(query) ;
        console.log(result)
        res.send(result);
      });

  
      
    app.get("/projects2", async (req, res) => {
        const result = await projectCollection2.find().toArray();
        res.send(result);
      })
  
    
  
 



  } finally {
  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
  res.send("Job Task Planner server")
})

app.listen(port, () => {
  console.log(`Port number ${port}`);
})