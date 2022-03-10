const { Schema, model } = require("mongoose");


const groupSchema = new Schema(
  {
    location: String,
    groupName: String,
    image: String,
    type: String,
    description: String,
    users: []
  },
  {
    timestamps: true,
  }
);

const Group = model("Group", groupSchema);

module.exports = Group;
