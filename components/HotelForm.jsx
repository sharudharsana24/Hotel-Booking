import React, { useState, useEffect } from 'react';
import './HotelForm.css';

function HotelForm({ onAddHotel, initialData }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [rating, setRating] = useState('5');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    useEffect(() => {
        if (initialData) {
            setName(initialData.name || '');
            setDescription(initialData.description || '');
            setLocation(initialData.location || '');
            setPrice(initialData.price || '');
            setRating(initialData.rating || '5');
            setLat(initialData.lat || '');
            setLng(initialData.lng || '');
            setImage(initialData.image || '');
            setImagePreview(initialData.image || '');
        } else {
            setName('');
            setDescription('');
            setLocation('');
            setPrice('');
            setRating('5');
            setLat('');
            setLng('');
            setImage('');
            setImagePreview('');
        }
    }, [initialData]);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
            setImage(previewUrl);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !price || lat === '' || lng === '') {
            alert("Please fill in all required fields (Name, Price, Latitude, and Longitude).");
            return;
        }
        const hotelData = {
            id: initialData ? initialData.id : Date.now(),
            name,
            description,
            location: location || 'India',
            price: Number(price),
            rating: Number(rating),
            lat: Number(lat),
            lng: Number(lng),
            image: image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
        };
        onAddHotel(hotelData);
    };

    return (
        <div className="hotel-form-container">
            <h3>
                {initialData ? 'Edit Hotel Details' : 'Add New Hotel'}
            </h3>
            <form onSubmit={handleSubmit} className="hotel-form">
                <div className="form-group">
                    <label>Hotel Name *</label>
                    <input 
                        type="text" 
                        placeholder="Enter hotel name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea 
                        placeholder="Enter hotel description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        rows="3"
                    />
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Location / City</label>
                        <input 
                            type="text" 
                            placeholder="e.g. Chennai" 
                            value={location} 
                            onChange={(e) => setLocation(e.target.value)} 
                        />
                    </div>
                    <div className="form-group">
                        <label>Price per night (₹) *</label>
                        <input 
                            type="number" 
                            placeholder="e.g. 4500" 
                            min="0"
                            value={price} 
                            onChange={(e) => setPrice(e.target.value)} 
                            required
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Latitude *</label>
                        <input 
                            type="number" 
                            step="any" 
                            placeholder="e.g. 13.0827" 
                            value={lat} 
                            onChange={(e) => setLat(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Longitude *</label>
                        <input 
                            type="number" 
                            step="any" 
                            placeholder="e.g. 80.2707" 
                            value={lng} 
                            onChange={(e) => setLng(e.target.value)} 
                            required
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Star Rating</label>
                    <select 
                        value={rating} 
                        onChange={(e) => setRating(e.target.value)}
                    >
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Hotel Image Upload</label>
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {imagePreview && (
                        <div className="image-preview-wrapper">
                            <p>Image Preview:</p>
                            <img src={imagePreview} alt="Hotel Preview" className="image-preview" />
                        </div>
                    )}
                </div>
                <button type="submit" className="submit-btn">
                    {initialData ? 'Update Hotel' : 'Add Hotel'}
                </button>
            </form>
        </div>
    );
}
export default HotelForm;