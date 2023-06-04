import express from "express";
import CustomerRepository from "./customer.repository";
import { MongoClient } from "mongodb";
import CustomerService from "./customer.service";


async function main() {
  const mongoClient = new MongoClient("mongodb://localhost:27017/unit-test-debugger-demo");
  await mongoClient.connect();
  const db = mongoClient.db();
  const customerRepository = new CustomerRepository(db);
  const customerService = new CustomerService(customerRepository);

  const app = express();
  app.get("/user/:id", async (req, res, next) => {
    const user = await customerService.getById(req.params.id);
    if (!user) {
      res.status(404).send("Not found");
    }
    res.send(JSON.stringify(user));
    next();
  });
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
