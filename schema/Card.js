import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
});

export default mongoose.model("card", CardSchema);
