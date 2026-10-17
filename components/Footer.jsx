import React from "react";
import './Footer.css';
function Footer(){
    return(
        <div className="container">
            <div className="content">
                <div className="Info">
                    <h3 className="title">Hotel Booking Application</h3>
                    <p className="description">Your ultimate destination for discovering and booking luxury stays, 
            cozy mountain retreats, and modern city hotels with ease.</p>
                </div>
                <div className="section">
                    <h4>Contact Us</h4>
                    <p>📍 7th Ms Dhoni Street,Chennai,India</p>
                    <p>📞 +91 9876543210</p>
                    <p>📧 HotelBooking@gmail.com</p>
                </div>
            </div>
            <div className="bottom">
                <p>&copy; 2026 HotelBooking Inc. All rights reserved.</p>
            </div>
        </div>
    )
}
export default Footer;