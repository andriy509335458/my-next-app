import mongoose, { Document, Schema, Model } from "mongoose";

export interface IComment extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  movie_id: mongoose.Types.ObjectId;
  text: string;
  date: Date;
}

const CommentSchema: Schema<IComment> = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  movie_id: { type: Schema.Types.ObjectId, required: true, ref: "Movie" },
  text: { type: String, required: true },
  date: { type: Date, required: true },
});

const SampleComment: Model<IComment> = mongoose.model<IComment>(
  "Comment",
  CommentSchema
);

export default SampleComment;
