import {NextFunction} from "express";

const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: [true, "Review needs a comment"],
        maxLength: [200, "Needs to be under 201 characters"],
        minLength: [3, "Needs to be over 3 characters"],
    },
    createdAt: {type: Date, default: Date.now}
});

reviewSchema.pre('save', async function (next:NextFunction) {
    // @ts-ignore
    this.comment = this.comment.toLowerCase()
    return next();
})

const Review = mongoose.model("Review", reviewSchema);

export default Review;