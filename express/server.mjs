import dotenv from "dotenv";
import express from "express";
import joi from "joi";
import pgPromise from "pg-promise";

const db = pgPromise()("postgres://postgres:postgres@localhost:5432/planets");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const setupDb = async () => {
  await db.none(`
  DROP TABLE IF EXISTS planets;
  
  CREATE TABLE planets(
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL
  );
`);
  await db.none(`INSERT INTO planets (name) VALUES ('Mercury')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Venus')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Earth')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Mars')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Jupiter')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Saturn')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Uranus')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Neptune')`);
};

setupDb();

const planetSchema = joi.object({
  id: joi.number().integer().required(),
  name: joi.string().required(),
});

app.get("/planets", async (req, res) => {
  const planets = await db.many(`SELECT * FROM planets`);
  res.status(200).json(planets);
});

app.get("/planets/:id", async (req, res) => {
  const { id } = req.params;
  const planet = await db.one(`SELECT * FROM planets WHERE id=$1`, Number(id));
  res.status(200).json(planet);
});

app.post("/planets", async (req, res) => {
  const { name } = req.body;
  await db.none(`INSERT INTO planets (name) VALUES ($1)`, [name]);
  res.status(201).json({ msg: "new planet created" });
});

app.put("/planets/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  await db.none(`UPDATE planets SET name=$1 WHERE id=$2`, [name, id]);
  res.status(200).json({ msg: "planet modified" });
});

app.delete("/planets/:id", async (req, res) => {
  const { id } = req.params;
  await db.none(`DELETE FROM planets WHERE id=$1`, id);
  res.status(200).json({ msg: "planet deleted" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
