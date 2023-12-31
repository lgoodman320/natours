import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

// ES modules don't support __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

const checkID = (req, res, next, val) => {
    console.log(`Tour id is: ${val}`);
    
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    next();
};

const getAllTours = (req, res) => {
    console.log(req.requestTime);

    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    });
};

const getTour = (req, res) => {
    console.log(req.params);

    const id = req.params.id * 1; // convert string to number
    const tour = tours.find(el => el.id === id);
    
    
    res.status(200).json({
        status: 'success',        
        data: {
            tour
        }
    });
};

const createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    }
    );
};

const updateTour = (req, res) => {
    
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>'
        }
    });
};

const deleteTour = (req, res) => {
    
    res.status(204).json({
        status: 'success',
        data: null
    });
};

export { getAllTours, getTour, createTour, updateTour, deleteTour, checkID };