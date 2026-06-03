import "./footer.scss";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footerContainer">
      <p>
        &copy; {year} | Developed by <span>Sumit Sourav Choudhury</span>
      </p>
    </footer>
  );
};

export default Footer;
