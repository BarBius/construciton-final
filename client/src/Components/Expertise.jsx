import './Expertise.css';

const Expertise = () => {
return (
<div className="expertise-container">
    <section className="mission">
    <h2>Notre Mission</h2>
    <p>
        Chez <strong>Serpenstar</strong>, notre mission est de transformer vos idées en réalité. Avec des années d`expérience dans l`industrie de la construction, nous nous engageons à fournir des solutions de construction de haute qualité, sécurisées et durables.
    </p>
    </section>

    <section className="competences">
    <h2>Nos Compétences</h2>

    <div className="competence">
        <h3>1. Conception et Planification</h3>
        <ul>
        <li>Planification architecturale détaillée.</li>
        <li>Utilisation de logiciels de pointe pour des modélisations 3D.</li>
        <li>Collaboration avec des ingénieurs et des architectes pour des designs innovants.</li>
        </ul>
    </div>

    <div className="competence">
        <h3>2. Construction Résidentielle</h3>
        <ul>
        <li>Maisons individuelles et lotissements.</li>
        <li>Rénovation et extensions.</li>
        <li>Utilisation de matériaux de qualité pour des constructions durables.</li>
        </ul>
    </div>

    <div className="competence">
        <h3>3. Construction Commerciale</h3>
        <ul>
        <li>Bureaux et espaces commerciaux.</li>
        <li>Centres commerciaux et magasins de détail.</li>
        <li>Respect des normes de sécurité et des délais.</li>
        </ul>
    </div>

    <div className="competence">
        <h3>4. Gestion de Projets</h3>
        <ul>
        <li>Coordination complète du projet du début à la fin.</li>
        <li>Respect des budgets et des délais.</li>
        <li>Communication transparente avec les clients.</li>
        </ul>
    </div>

    <div className="competence">
        <h3>5. Services de Rénovation</h3>
        <ul>
        <li>Rénovations intérieures et extérieures.</li>
        <li>Modernisation et mises à jour énergétiques.</li>
        <li>Solutions personnalisées pour répondre aux besoins spécifiques des clients.</li>
        </ul>
    </div>
    </section>

    <section className="valeurs">
    <h2>Nos Valeurs</h2>
    <ul>
        <li><strong>Qualité :</strong> Nous nous engageons à n`utiliser que les meilleurs matériaux et à respecter les normes les plus strictes de l`industrie.</li>
        <li><strong>Sécurité :</strong> La sécurité de nos chantiers est notre priorité absolue.</li>
        <li><strong>Innovation :</strong> Nous utilisons les dernières technologies et techniques pour garantir des résultats exceptionnels.</li>
        <li><strong>Durabilité :</strong> Nous intégrons des pratiques durables pour minimiser notre impact environnemental.</li>
    </ul>
    </section>
</div>
);
};

export default Expertise;
