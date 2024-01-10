/**
 * @file This file is responsible for importing and deleting data from the database.
 * It reads a JSON file, connects to the database, and performs the necessary operations.
 * The data can be imported or deleted based on the command line arguments.
 */
import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Tour from '../../models/tourModel.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config({ path: './config.env' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => console.log('DB connection successful!'));

// READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
      } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
      } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
    importData();
} else if ( process.argv[2] === '--delete') {
    deleteData();
}

