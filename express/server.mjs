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

const planetSchema = joi.object({
    id: joi.number().integer().required(),
    name: joi.string().required()
})

app.get("/planets", (req, res) => {
  res.status(200).json(planets);
});

app.get('/planets/:id', (req, res) => {
    const {id} = req.params
    const planet = planets.find(el => el.id === Number(id))

    res.status(200).json(planet)
})

app.post('/planets', (req, res) => {
  const {id, name} = req.body
  const newPlanet = {id , name}
  planets = [...planets, newPlanet]

  res.status(201).json({msg:'new planet created'})
})

app.put('/planets/:id', (req,res) => {
  const {id} = req.params
  const {name} = req.body
  planets = planets.map(p => p.id === Number(id) ? ({...p, name}) : p)

  console.log(planets)
  res.status(200).json({msg: 'planet modified'})
})

app.delete('/planets/:id', (req, res) => {
  const {id} = req.body
  planets = planets.filter(p => p.id !== Number(id))

  res.status(200).json({msg:'planet deleted'})
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
