import express from 'express';
import fs from 'fs';
import 'dotenv/config';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app  = express();
const PORT = process.env.PORT || 3000;

// ES modules don't support __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// app.get('/', (req, res) => {
//     res.status(200).json({ message: 'Hello from the server side!', app: 'Natours' });
// })

// app.post('/', (req, res) => {
//     res.send('You can post to this endpoint...');
// })

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });
});



app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});