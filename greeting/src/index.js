import express from "express";

const app = express();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  if (req.query.email === undefined) {
    return res.status(500).send("Missing email query parameter.");
  }

  console.log(`Sending greeting email to ${req.query.email}...`);
  res.send("Greeting email has been sent!");
});

app.listen(PORT, () =>
  console.log("Greeting app is listening on port: " + PORT),
);
