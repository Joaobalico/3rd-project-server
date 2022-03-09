const { Schema, model } = require("mongoose");


const citySchema = new Schema(
  {
    events: String,
    groups: String,
  },
  {
    timestamps: true,
  }
);

const City = model("City", citySchema);

module.exports = City;
