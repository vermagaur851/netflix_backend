import { Schema, mongo } from "mongoose";
import mongoose, {Schema,mongo} from "mongoose";
import { Movie } from "./Movie.model";

const ListSchema = new Schema(
    {
        title: {type: String,required: true, unique: true },
        type: {type: String},
        genre: {type: String},
        content: {
            type:[mongoose.Schema.Types.ObjectId],
            ref: Movie
        }
    },
    {timestamps: true}
)

export const List = mongoose.model("List",ListSchema)