import { FaFacebook, FaTwitter, FaInstagram, FaPinterest } from 'react-icons/fa';
import Logo from './assets/PodClub__1_- black.png';

function Footer(){
    return (
        <div className="main-footer" style={{ backgroundColor: "#FFFFFF" }}>
             <div className="container main-footer-container">
                <center>
                    <div className="logo-and-icons">
                        <img src={Logo} alt="logo" style={{width: "120px"}} />
                        <div className="icon-links">
                            <a href="https://www.facebook.com/"><FaFacebook size={30} color="#000000" style={{ width: "40px", marginRight: "10px", marginBottom: "10px" }}/></a>
                            <a href="https://www.instagram.com/"><FaInstagram size={30} color="#000000" style={{ width: "40px", marginRight: "10px", marginBottom: "10px" }}/></a>
                            <a href="https://www.linkedin.com/"><FaPinterest size={30} color="#000000" style={{ width: "40px", marginRight: "10px", marginBottom: "10px"}}/></a>
                            <a href="https://twitter.com/"><FaTwitter size={30} color="#000000" style={{ width: "40px", marginRight: "10px", marginBottom: "10px" }}/></a>
                        </div>
                    </div>
                </center>
             </div>
        </div>
    );
}



export default Footer;