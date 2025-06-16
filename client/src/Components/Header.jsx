import PropTypes from 'prop-types';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Header.css';

const HeaderPage = ({ isAuthenticated = false, role = '' }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    try {
      localStorage.removeItem('authToken');
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
      // Still navigate even if localStorage fails
      navigate('/login');
    }
    setShowLogoutConfirm(false);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header>
        <nav className="navigation" role="navigation" aria-label="Navigation principale">
          {/* Mobile hamburger button */}
          <button 
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-menu ${isMobileMenuOpen ? 'nav-menu-open' : ''}`}>
            <li>
              <NavLink 
                to="/" 
                onClick={closeMobileMenu}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                Accueil
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/expertise" 
                onClick={closeMobileMenu}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                Expertises
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/work" 
                onClick={closeMobileMenu}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                Réalisations
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                onClick={closeMobileMenu}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                Contact
              </NavLink>
            </li>
            {isAuthenticated ? (
              <>
                {role === 'admin' ? (
                  <li>
                    <NavLink 
                      to="/dashboard" 
                      onClick={closeMobileMenu}
                      className={({ isActive }) => isActive ? 'active' : ''}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                ) : (
                  <li>
                    <NavLink 
                      to="/profile" 
                      onClick={closeMobileMenu}
                      className={({ isActive }) => isActive ? 'active' : ''}
                    >
                      Profil
                    </NavLink>
                  </li>
                )}
                <li>
                  <button onClick={handleLogout} className="logout-button">
                    Se déconnecter
                  </button>
                </li>
              </>
            ) : (
              <li>
                <NavLink 
                  to="/login" 
                  onClick={closeMobileMenu}
                  className={({ isActive }) => isActive ? 'active' : ''}
                >
                  Connexion
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </header>

      {/* Logout confirmation modal */}
      {showLogoutConfirm && (
        <div className="modal-overlay" onClick={cancelLogout}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Confirmer la déconnexion</h3>
            <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
            <div className="modal-buttons">
              <button onClick={confirmLogout} className="confirm-button">
                Oui, se déconnecter
              </button>
              <button onClick={cancelLogout} className="cancel-button">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Add PropTypes validation
HeaderPage.propTypes = {
  isAuthenticated: PropTypes.bool,
  role: PropTypes.string,
};

export default HeaderPage;