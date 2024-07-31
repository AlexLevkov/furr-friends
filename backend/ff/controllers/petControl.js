const Pet = require("../models/petModel.js");

const getPets = async (req, res) => {
  try {
    const pets = await Pet.find({});
    if (!pets) {
      return res.status(404).json({ error: err.message });
    }
    res.json(pets);
  } catch (err) {
    console.log("err:", err);
  }
};

async function getPet(req, res) {
  try {
    const pet = await Pet.findById(req.params.id);
    res.send(pet);
    if (!pet) {
      return res.status(404).json({ error: err.message });
    }
  } catch (err) {
    console.log("err:", err);
  }
}

const updatePet = async (req, res) => {
  console.log("updatePet");
  const id = req.body._id;
  try {
    const pet = await Pet.findByIdAndUpdate(id, req.body, { new: true });
    if (!pet) res.json({ msg: "pet not found" });
    res.send(pet);
  } catch (err) {
    console.log("err:", err);
  }
};

module.exports = { getPets, getPet, updatePet };
