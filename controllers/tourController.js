import Tour from '../models/tourModel.js';
const checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing name or price'
        })
    }
    next();
};

const getAllTours = (req, res) => {
    console.log(req.requestTime);

    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        // results: tours.length,
        // data: {
        //     tours
        // }
    });
};

const getTour = (req, res) => {
    console.log(req.params);

    const id = req.params.id * 1; // convert string to number
    // const tour = tours.find(el => el.id === id);
    
    
    // res.status(200).json({
    //     status: 'success',        
    //     data: {
    //         tour
    //     }
    // });
};

const createTour = (req, res) => {
    res.status(201).json({
        status: 'success',
        // data: {
        //     tour: newTour
        // }
    }); 
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

export { getAllTours, getTour, createTour, updateTour, deleteTour, checkBody };