import {NextFunction} from "express";
import validator from "validator";

const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
        maxLength: 200,
        minLength: 3,
    },
    createdAt: {type: Date, default: Date.now}
});

reviewSchema.pre("save", async function (next:NextFunction) {
    // @ts-ignore
    if (!validator.isLength(this.comment, {min:3, max:200})) {
        next(new Error('Comment is not right'))
    } else {
        // @ts-ignore
        this.comment = this.comment.toLowerCase()
        return next();
    }
})

const Review = mongoose.model("Review", reviewSchema);

export default Review;