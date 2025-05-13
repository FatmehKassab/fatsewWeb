const Doll = require('../models/Doll');

// Get all dolls
exports.getAllDolls = async (req, res) => {
  try {
    const dolls = await Doll.find();
    res.json(dolls);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single doll
exports.getDollById = async (req, res) => {
  try {
    const doll = await Doll.findById(req.params.id);
    if (!doll) return res.status(404).json({ message: 'Doll not found' });
    res.json(doll);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new doll
exports.createDoll = async (req, res) => {
  const doll = new Doll({
    totalPrice: req.body.totalPrice,
    customize: req.body.customize
  });

  try {
    const newDoll = await doll.save();
    res.status(201).json(newDoll);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a doll
exports.updateDoll = async (req, res) => {
  try {
    const updatedDoll = await Doll.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDoll) return res.status(404).json({ message: 'Doll not found' });
    res.json(updatedDoll);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a doll
exports.deleteDoll = async (req, res) => {
  try {
    const doll = await Doll.findByIdAndDelete(req.params.id);
    if (!doll) return res.status(404).json({ message: 'Doll not found' });
    res.json({ message: 'Doll deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Get default doll configuration with all options
exports.getDefaultDoll = async (req, res) => {
    try {
      // This would typically come from your database
      const defaultDoll = {
        customize: {
          body: [
            { type: 'black_body', image: 'black_body.png', price: 10 },
            { type: 'white_body', image: 'white_body.png', price: 10 },
            // Add more body options
          ],
          hair: [
            { type: 'blonde_hair', image: 'boy_blonde_hair.png', price: 5 },
            { type: 'brown_hair', image: 'boy_brown_hair.png', price: 5 },
            // Add more hair options
          ],
          // Add other parts similarly
        },
        totalPrice: 0 // Initial price
      };
      res.json(defaultDoll);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };