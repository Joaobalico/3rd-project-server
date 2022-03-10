const router = require("express").Router();
const mongoose = require("mongoose");

const Group = require("../models/group.model");

router.post("/group", (req, res, next) => {
  const { location, groupName, image, type, description } = req.body;

  Group.create({ location,
    groupName,
    image,
    type,
    description,
    users: [] })
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

router.get("/group/:groupId", (req, res, next) => {
  const { groupId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(groupId)) {
    res.status(400).json({ message: "Specified Id is not valid" });
    return;
  }

  Group.findById(groupId)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.put("/group/:groupId", (req, res, next) => {
  const { groupId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(groupId)) {
    res.status(400).json({ message: "Specified Id is not valid" });
    return;
  }

  Group.findByIdAndUpdate(groupId, req.body, { new: true })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.delete("/group/:groupId", (req, res, next) => {
  const { groupId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(groupId)) {
    res.status(400).json({ message: "Specified Id is not valid" });
    return;
  }
  Group.findByIdAndRemove(groupId)
    .then(() =>
      res.json({ message: `Project with ${groupId} was removed successfully` })
    )
    .catch((err) => res.json(err));
});

module.exports = router;
