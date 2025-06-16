import { useState } from 'react';
import './Form.css';

const Form = () => {
// Form state
const [nom, setNom] = useState('');
const [email, setEmail] = useState('');
const [telephone, setTelephone] = useState('');
const [ville, setVille] = useState('');
const [projet, setProjet] = useState('');
const [budget, setBudget] = useState('');
const [date, setDate] = useState('');

// Feedback state
const [statusMessage, setStatusMessage] = useState('');
const [isSuccess, setIsSuccess] = useState(false);
const [isLoading, setIsLoading] = useState(false); // For showing loading state

// Handle form submission
const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Show loading spinner
    setIsLoading(true);
    setStatusMessage('');
    setIsSuccess(false);

    const formData = { nom, email, telephone, ville, projet, budget, date };

    try {
    const response = await fetch('http://localhost:5000/api/devis', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    // Hide loading spinner
    setIsLoading(false);

    if (response.ok) {
        setStatusMessage('Soumission réussie !');
        setIsSuccess(true);
        // Optionally clear the form after submission
        setNom('');
        setEmail('');
        setTelephone('');
        setVille('');
        setProjet('');
        setBudget('');
        setDate('');
    } else {
        setStatusMessage('Erreur lors de la soumission.');
        setIsSuccess(false);
    }
    } catch (error) {
    setIsLoading(false);
    setStatusMessage('Erreur lors de la soumission.');
    setIsSuccess(false);
    }
};

return (
    <section>
    <h1 className="devis">Demander un devis</h1>
    <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
        <label htmlFor="nom">Nom - Prénom *</label>
        <input type="text" id="nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
        </div>
        <div className="form-group">
        <label htmlFor="email">Adresse email *</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
        <label htmlFor="telephone">Téléphone *</label>
        <input type="tel" id="telephone" value={telephone} onChange={(e) => setTelephone(e.target.value)} required />
        </div>
        <div className="form-group">
        <label htmlFor="ville">Ville *</label>
        <input type="text" id="ville" value={ville} onChange={(e) => setVille(e.target.value)} required />
        </div>
        <div className="form-group">
        <label htmlFor="projet">Quel est votre projet?</label>
        <textarea id="projet" value={projet} onChange={(e) => setProjet(e.target.value)}></textarea>
        </div>
        <div className="form-group">
        <label htmlFor="budget">Quel est votre budget?</label>
        <input type="text" id="budget" value={budget} onChange={(e) => setBudget(e.target.value)} />
        </div>
        <div className="form-group">
        <label htmlFor="date">Date de réalisation du projet</label>
        <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <button type="submit" disabled={isLoading}>Envoyer</button>
    </form>

    {/* Loading Spinner */}
    {isLoading && <div className="spinner">Envoi en cours...</div>}

    {/* Feedback Messages */}
    {statusMessage && (
        <div className={isSuccess ? 'success' : 'error'}>
        {statusMessage}
        </div>
    )}
    </section>
);
};

export default Form;
