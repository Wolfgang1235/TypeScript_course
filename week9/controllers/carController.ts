import {NextFunction, Request, Response} from 'express';
import catchAsync from "../utilities/catchAsync";
import Car from '../models/carModel';
import Review from "../models/reviewModel";
import validator from 'validator';

interface Review {
    comment:string
}

interface Car {
    id:string,
    model:string,
    price:number,
    year:number,
    color:string,
    reviews:Review[]
}

export const getAllCars = async (req:Request, res:Response, next:NextFunction) => {
    const data:Car[] = await Car.find();
    res.status(200).json({
        data
    })
}

export const getCarById = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    const car:Car|undefined = await Car.findById(req.params.id)
    res.status(200).json({
        car
    })

});

export const createCar = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    const newCar:Car = await Car.create(req.body);
    res.status(201).json({
        data: newCar
    })
});

export const deleteCar = catchAsync(async(req:Request, res:Response, next:NextFunction) => {

    await Car.findByIdAndDelete(req.params.id)
    res.status(204).json({
        status: "success"
    })
});

export const updateCar = catchAsync(async(req:Request, res:Response, next:NextFunction) => {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {new:true});

    if (!updatedCar) {
        res.status(404).json ({
            error: 'No such car to update'
        })
    }
    res.status(200).json({
        updatedCar
    })
});

export const createCarReview = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    const car = await Car.findById(req.params.id)
    if (!car) {
        return res.status(404).json ({
            error: 'No such car'
        })
    }
    const comment = req.body.comment;
    const review = new Review({'comment': comment});
    await review.save();
    car.reviews.push(review);
    await car.save();
    res.status(201).json({
        car
    })
})

export const getCarReviewFromCarId = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    const car = await Car.findById(req.params.id).populate('reviews');
    if (!car) {
        return res.status(404).json ({
            error: 'No such car'
        })
    }
    res.status(200).json({
        data: car.reviews.map((review:Review)=> review.comment)
    })
})