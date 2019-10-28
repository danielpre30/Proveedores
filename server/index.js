import express from "express";
import jwt from "express-jwt";
import cors from "cors";
import jwks from "jwks-rsa";
import jwtAuthz from "express-jwt-authz";
import bodyParser from "body-parser";
import { ObjectID, MongoClient } from "mongodb";
import { getComments, getServices, getScore } from "./utils";
var port = process.env.PORT || 5000;

// Database Name
const dbName = "upcluster";

// Connection URL
const url = `mongodb://upcluster:UpCluster12345@ds217438.mlab.com:17438/${dbName}`;

// Create a new MongoClient
const client = new MongoClient(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

//Crear servidor
const app = express();

//Configurar el servidor para json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://danielpre30.auth0.com/.well-known/jwks.json"
  }),
  audience: "http://upcluster",
  issuer: "https://danielpre30.auth0.com/",
  algorithms: ["RS256"]
});

//revisamos y validamos los scopes
const checkScopes = jwtAuthz(["read:business"]);

app.get(
  `/business`,
  /*jwtCheck, checkScopes,*/ async (req, res) => {
    //Use connect method to connect to the Server

    const serv = await client.connect();
    const db = serv.db(dbName);

    const query = { ...query, email: { $eq: req.query.email } };
    const business = await db.collection("business").findOne(query);

    const services = await getServices(db, "" + business._id);
    client.close();

    res.json({ ...business, services });
  }
);

app.get(`/business/:id`, async (req, res) => {
  //Use connect method to connect to the Server
  const id = req.params.id;
  const idRequest = req.query.idRequest;
  const serv = await client.connect();
  const db = serv.db(dbName);

  let business, response;

  if (req.query.other) {
    const query = { _id: { $ne: ObjectID(id) } };
    business = await db
      .collection("business")
      .find(query)
      .toArray();

    response = business;
  } else {
    const query = { _id: { $eq: ObjectID(id) } };
    business = await db.collection("business").findOne(query);

    const services = await getServices(db, id);
    const comments = await getComments(db, id);
    const score = getScore(comments);

    const isProvider = services.servicesAsProvider.some(
      service => service.contractorId === idRequest
    );

    response = {
      business,
      score,
      comments: [...comments],
      services,
      isProvider
    };
  }

  client.close();

  res.json(response);
});

// unused
app.get(`/comments/:target`, async (req, res) => {
  //Use connect method to connect to the Server
  client
    .connect()
    .then(serv => serv.db(dbName))
    .then(db =>
      db
        .collection("Comments")
        .find({ target: req.params.idTo })
        .toArray()
    )
    .then(collection => {
      client.close();
      res.json(collection);
    });
});

app.post(`/business`, (req, res) => {
  client
    .connect()
    .then(serv => serv.db(dbName))
    .then(db => db.collection("business").insertOne(req.body))
    .then(collection => {
      client.close();
      res.json(collection);
    });
});

app.post(`/comments/`, async (req, res) => {
  const serv = await client.connect();
  const db = serv.db(dbName);

  const response = await db.collection("Comments").insertOne(req.body);
  const comments = await getComments(db, req.body.target);
  client.close();
  const score = getScore(comments);
  res.json({ comments, score });
});

//unused
app.post(`/business/:id`, (req, res) => {
  client
    .connect()
    .then(serv => serv.db(dbName))
    .then(db =>
      db
        .collection("business")
        .updateOne(
          { _id: ObjectID(req.params.id) },
          { $set: { score: req.body } }
        )
    )
    .then(collection => {
      client.close();
      res.json(collection);
    });
});

app.post(`/services`, (req, res) => {
  client
    .connect()
    .then(serv => serv.db(dbName))
    .then(db => db.collection("services").insertMany(req.body))
    .then(collection => {
      client.close();
      res.json(collection);
    });
});

app.listen(port, () => {
  console.log(`Servidor funcionando
  http://localhost:${port}`);
});

// app.use(jwtCheck);

// app.get('/authorized', function (req, res) {
//     res.send('Secured Resource');
// });
