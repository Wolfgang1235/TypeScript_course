import {getAllCars,getCarById,createCar,deleteCar,updateCar,createCarReview} from '../controllers/carController';
import express = require("express");

const carRouter = express.Router();

carRouter.route("/").get(getAllCars).post(createCar);
carRouter.route("/:id").get(getCarById).delete(deleteCar).patch(updateCar)
carRouter.route("/:id/reviews").post(createCarReview)

export default carRouter;