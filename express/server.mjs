import dotenv from "dotenv";
import express from "express";
import joi from 'joi'

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let planets = [
  { id: 1, name: "Mercury" },
  { id: 2, name: "Venus" },
  { id: 3, name: "Earth" },
  { id: 4, name: "Mars" },
  { id: 5, name: "Jupiter" },
  { id: 6, name: "Saturn" },
  { id: 7, name: "Uranus" },
  { id: 8, name: "Neptune" },
];

const planetSchema = Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().required()
})

app.get("/planets", (req, res) => {
  res.status(200).json(planets);
});

app.get('planets/:id', (req, res) => {
    const {id} = req.params
    const planet = 
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
