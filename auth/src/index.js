import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const PORT = process.env.PORT || 8000;

const app = express();
app.use(bodyParser.json());

app.post("/", async (req, res) => {
  res.json({ user: "test", token: "abcd" });
});

app.get("/", async (req, res) => {
  try {
    console.log("Adding user to database...");
    const email = "hello@gmail.com";
    await axios.get(`http://load-balancer/greeting?email=${email}`);
    await axios.get(`http://load-balancer/gift-card?email=${email}`);
    res.send("Registration complete!");
  } catch (error) {
    res.status(500).send("Could not finish registration process!");
  }
});

app.listen(PORT, () => {
  console.log("Auth app is listening on port: " + PORT);
});
