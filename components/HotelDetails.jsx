import React from 'react';
import './HotelList.css';

function HotelDetails({ hotel, onBack }) {
    if (!hotel) return <div>No hotel selected.</div>;
    const mapSrc = `https://maps.google.com/maps?q=${hotel.lat},${hotel.lng}&z=15&output=embed`;

    return (
        <div className="HotelList" style={{ padding: '2rem' }}>
            <button 
                onClick={onBack}
                className="filterButton"
                style={{ width: '120px', marginBottom: '1.5rem' }}
            >
                &larr; Back to List
            </button>
            <div style={{ backgroundColor: '#22222f', padding: '2rem', borderRadius: '8px', border: '1px solid #2a2a35' }}>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                    <img 
                        src={hotel.image} 
                        alt={hotel.name} 
                        style={{ width: '400px', height: '250px', objectFit: 'cover', borderRadius: '6px' }} 
                    />
                    <div style={{ flex: 1 }}>
                        <h1 style={{ color: '#f7a8b8', marginTop: 0 }}>{hotel.name}</h1>
                        <p style={{ fontSize: '1.1rem', color: '#ddd' }}>{hotel.description}</p>
                        <p><strong>Location:</strong> {hotel.location}</p>
                        <p><strong>Price:</strong> ₹{hotel.price} / night</p>
                        <p><strong>Rating:</strong> ⭐ {hotel.rating} Stars</p>
                        <p style={{ fontSize: '0.9rem', color: '#aaa' }}>
                            Coordinates: {hotel.lat}, {hotel.lng}
                        </p>
                    </div>
                </div>
                <div style={{ marginTop: '2rem' }}>
                    <h3 style={{ color: '#f7a8b8' }}>Location on Map</h3>
                    <iframe 
                        title="hotel-map"
                        width="100%" 
                        height="350" 
                        style={{ border: 0, borderRadius: '6px' }}
                        loading="lazy"
                        allowFullScreen
                        src={mapSrc}
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
export default HotelDetails;