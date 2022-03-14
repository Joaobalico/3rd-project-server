const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    title: String,
    image: String,
    address: String,
    description: String,
    users:  [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);

const Event = model("Event", eventSchema);

module.exports = Event;
