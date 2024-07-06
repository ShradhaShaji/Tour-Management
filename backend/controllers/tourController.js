import { CURSOR_FLAGS } from 'mongodb';
import Tour from '../models/Tour.js';

export const createTour = async (req,res)=>{
    const newTour=new Tour(req.body);

    try{
        const savedTour = await newTour.save();

        res.status(200)
        .json({
            success:true,
            message:"Successfully created",
            data: savedTour,
        });

    }
    catch (err)
    {
        res
            .status(500)
            .json({success: false,
                message: "Failed to create. Try again"})
    }
};

// update tour
export const updateTour = async (req,res)=>{
    const id = req.params.id
    try {
            const updatedTour = await Tour.findByIdAndUpdate(id,
            {
                $set: req.body
            },{
                new:true
            })
            res.status(200).json({
            success:true,
            message:"Successfully updated",
            data: updatedTour,
        });
    }
    catch(err){
        res.status(500)
        .json({
            success:false,
            message:"Failed to update",
        });

    }
};

// delete tour
export const deleteTour = async (req,res)=>{
    const id = req.params.id
    try {
            await Tour.findByIdAndDelete(id,
            {
                $set: req.body
            },{
                new:true
            })
            res.status(200).json({
            success:true,
            message:"Successfully delete",
            
        });
    }
    catch(err){
        res.status(500)
        .json({
            success:false,
            message:"Failed to delete",
        });

    }
};

// get single tour
export const getSingleTour = async (req,res)=>{
    const id = req.params.id;
    try {
            const tour = await Tour.findById(id);
            res.status(200).json({
            success:true,
            message:"Successful",
            data: tour,
            
        });
    }
    catch(err){
        res.status(404)
        .json({
            success:false,
            message:"Not found",
        });

    }
};

// get all tour
export const getAllTour = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = 8;
  
    try {
      const totalTours = await Tour.countDocuments(); // Count total tours
      const tours = await Tour.find({})
        .populate('reviews')
        .skip(page * limit)
        .limit(limit);
  
      res.status(200).json({
        success: true,
        count: tours.length,
        message: "Successful",
        data: tours,
        totalPages: Math.ceil(totalTours / limit), // Return total pages
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: "Not found",
      });
    }
  };
  
//get tour by search

export const getTourBySearch = async(req,res)=>{

    //here 'i' means case sensitive
    const city = new RegExp(req.query.city, 'i')
    const distance = parseInt(req.query.distance)
    const maxGroupSize = parseInt(req.query.maxGroupSize)

    try{
        const tours = await Tour.find({ city,distance:{$gte:distance},
        maxGroupSize:{$gte:maxGroupSize}})

        res.status(200).json({
            success:true,
            message:"Successful",
            data: tours,
        });
    }
    catch(err){
        res.status(404)
        .json({
        success:false,
        message:"Not found",
    });
        
    }
};

// get featured tour
export const getFeaturedTour = async(req,res)=>{
    
    try {
        const tours = await Tour.find({ featured : true })
        .populate('reviews')
        .limit(8);
        res.status(200).json({
        success:true,
        message:"Successful",
        data: tours,
        
    });
}
catch(err){
    res.status(404)
    .json({
        success:false,
        message:"Not found",
    });

}

};

// get tour counts

export const getTourCount = async(req,res)=>
{
    try{
        const tourCount = await Tour.estimatedDocumentCount();

        res.status(200).json({success:true,data:tourCount});
    }

    catch(err){
        res.status(500).json({success:false,message:"Failed to fetch"});
    }
};

