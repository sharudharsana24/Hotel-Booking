import React from "react";
import './HotelList.css';
import './HotelCard.css';
function HotelCard({ hotel, onEdit, onDelete, onSelect }){
    return(
        <div className="hotelCard" onClick={() => onSelect(hotel)}>
            <img src={hotel.image} alt={hotel.name} className="hotelImage" />
            <div className="info">
                <h3>{hotel.name}</h3>
                <p className="description">{hotel.description}</p>
                <p className="location">{hotel.location}</p>
                <p className="price">₹{hotel.price} <span>/ night</span></p>
                <p className="rating">⭐ {hotel.rating}</p>
                <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                    <button onClick={(e) => {
                            e.stopPropagation();
                            onEdit(hotel);
                        }}
                    >Edit</button>
                    <button className='deleteButton'onClick={(e) => {
                            e.stopPropagation();
                            onDelete(hotel.id);
                        }} 
                    >Delete</button>
                </div>
            </div>
        </div>
    );
}
export default HotelCard;