import express from 'express';
import DevisController from '../controllers/devisController.js'; // Controller for handling the form data

const router = express.Router();

// Route to handle form submission
router.post('/', DevisController.submitDevis); // POST request to submit the form data

export default router;
