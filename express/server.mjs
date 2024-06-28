import dotenv from 'dotenv';
import express from 'express';
import Joi from 'joi';
import pgPromise from 'pg-promise';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const db = pgPromise()('postgres://postgres:postgres@localhost:5432/planets');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

const setupDb = async () => {
  await db.none(`
    DROP TABLE IF EXISTS planets;
    CREATE TABLE planets(
      id SERIAL NOT NULL PRIMARY KEY,
      name TEXT NOT NULL,
      image TEXT
    );
  `);
  const planets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];
  for (const planet of planets) {
    await db.none('INSERT INTO planets (name) VALUES ($1)', [planet]);
  }
};

setupDb();

const planetSchema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
});

app.get('/planets', async (req, res) => {
  const planets = await db.manyOrNone('SELECT * FROM planets');
  res.status(200).json(planets);
});

app.get('/planets/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const planet = await db.one('SELECT * FROM planets WHERE id=$1', [Number(id)]);
    res.status(200).json(planet);
  } catch (error) {
    res.status(404).json({ error: 'Planet not found' });
  }
});

app.post('/planets', async (req, res) => {
  const { name } = req.body;
  await db.none('INSERT INTO planets (name) VALUES ($1)', [name]);
  res.status(201).json({ msg: 'New planet created' });
});

app.put('/planets/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  await db.none('UPDATE planets SET name=$1 WHERE id=$2', [name, id]);
  res.status(200).json({ msg: 'Planet modified' });
});

app.delete('/planets/:id', async (req, res) => {
  const { id } = req.params;
  await db.none('DELETE FROM planets WHERE id=$1', [id]);
  res.status(200).json({ msg: 'Planet deleted' });
});

app.post('/planets/:id/image', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const imagePath = `/uploads/${req.file.filename}`;
  try {
    await db.none('UPDATE planets SET image=$1 WHERE id=$2', [imagePath, id]);
    res.status(200).json({ msg: 'Planet image updated', imagePath });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update planet image' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});