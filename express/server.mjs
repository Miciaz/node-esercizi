import dotenv from "dotenv";
import express from "express";
import joi from 'joi'
import { getAll, getOneById, create, updateById,deleteById } from "./controllers/planets.mjs";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const planetSchema = joi.object({
    id: joi.number().integer().required(),
    name: joi.string().required()
})

app.get("/planets", getAll );

app.get('/planets/:id', getOneById)

app.post('/planets', create)

app.put('/planets/:id', updateById)

app.delete('/planets/:id', deleteById)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
