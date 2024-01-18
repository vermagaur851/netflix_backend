import { Schema, mongo } from "mongoose";
import mongoose, {Schema,mongo} from "mongoose";

const MovieSchema = new Schema(
    {
        title: {type: String,required: true, unique: true },
        description: {type: String, required: true},
        image: {type: String, required: true},
        imgTitle: {type: String, required: true},
        Thumbnail: {type: String, required: true},
        trailer: {type: String, required: true},
        video: {type: String, required: true},
        year: {type: String, required: true},
        limit: {type: Number, required: true},
        genre: {type: String, required: true},
        isSeries: {Boolean:true, default: false ,required: true},
    },
    {timestamps: true}
)

export const Movie = mongoose.model("Movie",MovieSchema)