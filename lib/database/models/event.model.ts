import { Schema, model, models} from "mongoose";

export interface IEvent extends Document {
  _id: string;
  title: string;
  description?: string;
  venue?: string;
  createdAt: Date;
  imageURL: string;
  startDateTime: Date;
  endDateTime: Date;
  price?: string;
  isFree: boolean;
  url?: string;
  category?: { _id: string; name: string };
  organizer?: { _id: string; firstName: string; lastName: string };
}

const eventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  venue: { type: String },
  createdAt: { type: Date, default: Date.now },
  imageURL: { type: String, required: true },
  startDateTime: { type: String, default: Date.now },
  endDateTime: { type: String, default: Date.now },
  price: { type: String },
  isFree: { type: Boolean, default: false },
  url: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  organizer: { type: Schema.Types.ObjectId, ref: "User" },
});

const Event = models.event || model("Event", eventSchema);

export default Event;
