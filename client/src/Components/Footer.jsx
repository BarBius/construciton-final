import "./Footer.css";

const Footer = () => {
return (
<footer className="footer">
    <div className="map-responsive">
    <iframe
        title="Google Maps"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2831.385522766957!2d-0.5851806233242554!3d44.79333127794885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5527149554d85b%3A0xae3827de57cde807!2sRue%20Henry%20de%20Montherlant%2C%20Talence!5e0!3m2!1sfr!2sfr!4v1713342565249!5m2!1sfr!2sfr"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
    </div>
</footer>
);
};

export default Footer;

