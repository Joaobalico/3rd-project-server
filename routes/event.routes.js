const router = require("express").Router();
const mongoose = require("mongoose");

const Event = require("../models/Event.model");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.post("/event", (req, res, next) => {
  const { title, image, address, description } = req.body;

  Event.create({ title, image, address, description })
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

router.get("/events", (req, res, next) => {
  Event.find()
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.get("/event/:eventId", (req, res, next) => {
  const { eventId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    res.status(400).json({ message: "Specified Id is not valid" });
    return;
  }

  Event.findById(eventId)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.put("/event/:eventId", isAuthenticated, (req, res, next) => {
  const { eventId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    res.status(400).json({ message: "Specified Id is not valid" });
    return;
  }

  Event.findByIdAndUpdate(eventId, req.body, { new: true })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.put("/attend-event/:eventId", isAuthenticated, (req, res, next) => {
  const { eventId } = req.params;
  const user = req.payload;
  // console.log(user);

  Event.findByIdAndUpdate(
    eventId,
    { $push: { users: user._id } },
    { new: true }
  )
    .then((updatedEvent) => {
      // console.log(updatedEvent);
      console.log(`CONSOLE.LOG:${user._id}`);
      return User.findByIdAndUpdate(
        user._id,
        { $push: { events: updatedEvent._id } },
        { new: true }
      );
    })
    .then((updatedUser) => {
      console.log(updatedUser);
      res.json(updatedUser);
    })
    .catch((err) => res.json(err));
});

router.delete("/event/:eventId", (req, res, next) => {
  const { eventId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    res.status(400).json({ message: "Specified Id is not valid" });
    return;
  }
  Event.findByIdAndRemove(eventId)
    .then(() =>
      res.json({ message: `Event with ${eventId} was removed successfully` })
    )
    .catch((err) => res.json(err));
});

module.exports = router;
