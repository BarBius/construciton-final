import { body, validationResult } from 'express-validator';


const DevisController = {
    // Method to handle form submission
    submitDevis: async (req, res) => {
        // Validate form data (optional, you can modify this based on your needs)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract form data
        const { nom, email, telephone, ville, projet, budget, date } = req.body;

        // Here you can add logic to save the data into your database
        // Example (assuming you're using MySQL):
        // await DevisModel.create(nom, email, telephone, ville, projet, budget, date);

        try {
            // Assuming you have a DevisModel to handle database operations
            // Here we simulate saving the data and returning a success message
            console.log('Form data received:', { nom, email, telephone, ville, projet, budget, date });

            // Send success response
            res.status(200).json({ message: 'Form submitted successfully' });
        } catch (error) {
            console.error('Error submitting form:', error);
            res.status(500).json({ error: 'Error while submitting form' });
        }
    }
};

export default DevisController;
