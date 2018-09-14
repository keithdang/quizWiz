const mongoose = require("mongoose");
const Survey = mongoose.model("surveys");
const User = mongoose.model("users");
module.exports = app => {
  app.post("/api/select/survey", async (req, res) => {
    req.user.survey = req.body;
    const user = await req.user.save();
    res.send(user);
  });
  app.get("/api/quiz", async (req, res) => {
    const survey = await Survey.find(function(err, survey) {
      res.send(survey);
    });
  });
  app.get("/api/all/users", async (req, res) => {
    const user = await User.find(function(err, user) {
      res.send(user);
    });
  });
  app.post("/api/submit/survey", async (req, res) => {
    req.user.submitted = req.body;
    const user = await req.user.save();
    res.send(user);
  });
};
