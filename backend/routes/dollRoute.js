const express = require('express');
const router = express.Router();
const dollController = require('../controllers/dollController');

// GET all dolls
router.get('/', dollController.getAllDolls);

// GET a single doll
router.get('/:id', dollController.getDollById);

// POST a new doll
router.post('/', dollController.createDoll);

// UPDATE a doll
router.patch('/:id', dollController.updateDoll);

// DELETE a doll
router.delete('/:id', dollController.deleteDoll);
router.get('/default', dollController.getDefaultDoll);

module.exports = router;