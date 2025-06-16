import { Link } from 'react-router-dom';
import './Gallery.css'; 

const Gallery = () => {
    return (
        <div className="gallery">
            <div className="category">
                <h2>Plaque</h2>
                <div className="photos">
                    <div className="photo big-photo">
                        <img src="/public/56242e0ce17057fef4a81419a72cb23028249c28.jpg" alt="Plaque" />
                        <div className="hover-text">Plaque</div>
                    </div>
                    <Link to="/contact" className="photo small-photo">
                        <img src="/public/istockphoto-941965912-612x612.jpg" alt="Ouvrier sur une échelle installant une cloison isolante intérieure." />
                        <div className="hover-text">Savoir en plus</div>
                    </Link>
                </div>
            </div>

            <div className="category">
                <h2>Maçonnerie</h2>
                <div className="photos">
                    <div className="photo big-photo">
                        <img src="/public/Ootravaux_Maçonnerie_Devis_1000x667.jpg" alt="Maçonnerie" />
                        <div className="hover-text">Maçonnerie</div>
                    </div>
                    <Link to="/contact" className="photo small-photo">
                        <img src="/public/creer-une-entreprise-de-maconnerie.png" alt="Maçon appliquant du ciment sur des briques pour monter un mur" />
                        <div className="hover-text">Savoir en plus</div>
                    </Link>
                </div>
            </div>

            <div className="category">
                <h2>Carrelage</h2>
                <div className="photos">
                    <div className="photo big-photo">
                        <img src="/public/29594768-adobestock-271883431.jpg" alt="Carrelage" />
                        <div className="hover-text">Carrelage</div>
                    </div>
                    <Link to="/contact" className="photo small-photo">
                        <img src="/public/pose-de-carrelage.jpg" alt=" Pose d’un carrelage au sol par un ouvrier avec des gants" />
                        <div className="hover-text">Savoir en plus</div>
                    </Link>
                </div>
            </div>
            <div className="category">
                <h2>Construction de la piscine</h2>
                <div className="photos">
                    <div className="photo big-photo">
                        <img src="/public/la-declaration-de-travaux-pour-la-piscine-29139-1200-630.jpg" alt="Construction de la piscine" />
                        <div className="hover-text">Construction de la piscine</div>
                    </div>
                    <Link to="/contact" className="photo small-photo">
                        <img src="/public/Renovation-Diffazur.webp" alt="Piscine avant et après rénovation, avec un revêtement modernisé" />
                        <div className="hover-text">Savoir en plus</div>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default Gallery;
