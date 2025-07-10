import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import image from '../ElmoreCTFLOGO.svg';


function Footer() {
  return (
    <footer id='main-footer'>
        <div className="footer-container">
            <div className="footer-logo">
                <img src={image} alt="Website Logo"/>
            </div>
            <div className="footer-content">
                <p>&copy; 2024 Elmore CTF. All rights reserved.</p>
                <ul className="footer-links">
                  <li><a href="/about">About Us</a></li>
                  <li><a href="/contact">Contact</a></li>
                  <li><a href="/privacy">Privacy Policy</a></li>
                </ul>
            </div>
        </div>
    </footer>
  )
}

export default Footer
