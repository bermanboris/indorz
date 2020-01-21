import mongoose from "mongoose";
import axios from "axios";

import response from "../helpers/response";
import request from "../helpers/request";
import pagination from "../helpers/pagination";

const User = mongoose.model("User");

exports.list = function(req, res) {
  if (req.currentUser.role != "admin") return response.sendForbidden(res);
  User.paginate(
    request.getFilteringOptions(req, ["email", "role"]),
    request.getRequestOptions(req),
    function(err, result) {
      if (err) return res.send(err);
      pagination.setPaginationHeaders(res, result);
      res.json(result.docs);
    },
  );
};

exports.read = function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) return response.sendNotFound(res);
    if (!req.currentUser.canRead(user)) return response.sendForbidden(res);
    res.json(user);
  });
};

exports.create = async function(req, res) {
  const newUser = new User(req.body);
  newUser.role = "user";
  newUser.save(async function(err, user) {
    if (err) return response.sendBadRequest(res, err);
    try {
      await axios.get(`http://load-balancer/greeting?email=${newUser.email}`);
      await axios.get(`http://load-balancer/gift-card?email=${newUser.email}`);
      console.info("Send both greeting & gift card!");
      response.sendCreated(res, user);
    } catch (error) {
      User.remove({ _id: user._id }, function(err, user) {
        return response.sendBadRequest(
          res,
          "Could not send emails, so account could not be created.",
        );
      });
    }
  });
};

exports.update = function(req, res) {
  const user = req.body;
  delete user.role;
  if (!req.currentUser.canEdit({ _id: req.params.id }))
    return response.sendForbidden(res);
  User.findOneAndUpdate(
    { _id: req.params.id },
    user,
    { new: true, runValidators: true },
    function(err, user) {
      if (err) return response.sendBadRequest(res, err);
      res.json(user);
    },
  );
};

exports.delete = function(req, res) {
  User.remove({ _id: req.params.id }, function(err, user) {
    if (err) return res.send(err);
    if (!req.currentUser.canEdit(user)) return response.sendForbidden(res);
    res.json({ message: "User successfully deleted" });
  });
};

exports.loadUser = function(req, res, next) {
  User.findById(req.params.userId, function(err, user) {
    if (err) return response.sendNotFound(res);
    if (!req.locals) req.locals = {};
    req.locals.user = user;
    next();
  });
};
