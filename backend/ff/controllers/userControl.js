const User = require("../models/userModel.js");

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").exec();
    if (!users) {
      return res.status(404).json({ error: "No users found" });
    }
    res.json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

async function getUser(req, res) {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

module.exports = { getUsers, getUser };
