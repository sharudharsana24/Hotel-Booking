import React, { useState } from 'react';
import HotelCard from './HotelCard';
import HotelForm from './HotelForm';
import HotelDetails from './HotelDetails';
import Pagination from './pagination';
import { Helmet } from 'react-helmet-async';
import './HotelList.css';

function HotelList({ hotels, onAddHotel, onDeleteHotel, onUpdateHotel }) {
    const [showForm, setShowForm] = useState(false);
    const [editingHotel, setEditingHotel] = useState(null); 
    const [selectedHotel, setSelectedHotel] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const hotelsPerPage = 6;

    const [searchQuery, setSearchQuery] = useState('');

    const [tempMinPrice, setTempMinPrice] = useState('');
    const [tempMaxPrice, setTempMaxPrice] = useState('');
    const [tempSliderPrice, setTempSliderPrice] = useState('50000');
    const [tempSelectedStars, setTempSelectedStars] = useState([]);

    const [appliedMinPrice, setAppliedMinPrice] = useState('');
    const [appliedMaxPrice, setAppliedMaxPrice] = useState('');
    const [appliedSliderPrice, setAppliedSliderPrice] = useState('50000');
    const [appliedSelectedStars, setAppliedSelectedStars] = useState([]);

    const handleSaveHotel = (hotelData) => {
        if (editingHotel) {
            onUpdateHotel(editingHotel.id, hotelData);
            setEditingHotel(null);
        } else {
            onAddHotel(hotelData);
        }
        setShowForm(false);
    };
    const handleDeleteClick = (id) => {
        onDeleteHotel(id);
    };
    const handleEditClick = (hotel) => {
        setEditingHotel(hotel);
        setShowForm(true);
    };
    const handleStarChange = (e) => {
        const value = Number(e.target.value);
        if (e.target.checked) {
            setTempSelectedStars([...tempSelectedStars, value]);
        } else {
            setTempSelectedStars(tempSelectedStars.filter(star => star !== value));
        }
    };
    const handleApplyFilter = () => {
        setAppliedMinPrice(tempMinPrice);
        setAppliedMaxPrice(tempMaxPrice);
        setAppliedSliderPrice(tempSliderPrice);
        setAppliedSelectedStars(tempSelectedStars);
        setCurrentPage(1);
    };
    const filteredHotels = hotels.filter((hotel) => {
        const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesMin = appliedMinPrice === '' || hotel.price >= Number(appliedMinPrice);
        const matchesMax = appliedMaxPrice === '' || hotel.price <= Number(appliedMaxPrice);
        const matchesSlider = hotel.price <= Number(appliedSliderPrice);
        const matchesStars = appliedSelectedStars.length === 0 || appliedSelectedStars.includes(hotel.rating);
        return matchesSearch && matchesMin && matchesMax && matchesSlider && matchesStars;
    });
    const startIndex = (currentPage - 1) * hotelsPerPage;
    const currentHotels = filteredHotels.slice(startIndex, startIndex + hotelsPerPage);
    const totalPages = Math.ceil(filteredHotels.length / hotelsPerPage);
    if (selectedHotel) {
        return <HotelDetails hotel={selectedHotel} onBack={() => setSelectedHotel(null)} />;
    }

    return(
        <div className='HotelList'>
            <Helmet>
                <title>HotelBooking</title>
                <meta name="description" content="Discover and book cozy mountain retreats, luxury city hotels, and scenic resorts at the best prices." />
                <meta name="keywords" content="hotel booking, luxury stays, resorts, travel accommodation, MERN stack app" />
            </Helmet>
            <div className='list'>
                <h1 className='header'>HotelBooking</h1>
                <input 
                    type='text' 
                    placeholder='Search Hotels' 
                    className='search'
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                    }}
                />
                <button 
                    onClick={() => {
                        setEditingHotel(null);
                        setShowForm(!showForm);
                    }} 
                    className='filterButton'
                    style={{ width: 'auto', padding: '0.5rem 1rem', margin: 0 }}
                >
                    {showForm ? 'Cancel' : 'Add Hotel'}
                </button>
            </div>
            <div className='main-container'>
                <div className='body'>
                    <div className='filter'>
                        <h3>Filter Hotels</h3>
                        <div className='range'>
                            <label>Price Range (₹)</label>
                            <div className='price'>
                                <input 
                                    type='number' 
                                    placeholder='Min Price (₹)' 
                                    min='0'
                                    value={tempMinPrice}
                                    onChange={(e) => setTempMinPrice(e.target.value)}
                                />
                                <br/>
                                <input 
                                    type='number' 
                                    placeholder='Max Price (₹)' 
                                    min='0'
                                    value={tempMaxPrice}
                                    onChange={(e) => setTempMaxPrice(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='range'>
                            <label>Star Rating</label>
                            <div className='star-filter'>
                                {[5, 4, 3, 2].map((star) => (
                                    <label key={star}>
                                        <input 
                                            type="checkbox" 
                                            value={star} 
                                            checked={tempSelectedStars.includes(star)}
                                            onChange={handleStarChange}
                                        /> 
                                        {star} Stars
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className='range'>
                            <label htmlFor="priceRange">Max Price: ₹<span>{tempSliderPrice}</span></label>
                            <input 
                                type="range" 
                                min="0" 
                                max="50000" 
                                step="500" 
                                value={tempSliderPrice} 
                                onChange={(e) => setTempSliderPrice(e.target.value)}
                            />
                        </div>
                        <button className='filterButton' onClick={handleApplyFilter}>
                            Apply Filter
                        </button>
                    </div>
                </div>
                <div className='card'>
                    {showForm && (
                        <HotelForm 
                            onAddHotel={handleSaveHotel} 
                            initialData={editingHotel} 
                        />
                    )}
                    <div className='grid'>
                        {currentHotels.length > 0 ? (
                            currentHotels.map((hotel)=>(
                                <HotelCard 
                                    key={hotel.id} 
                                    hotel={hotel} 
                                    onEdit={handleEditClick}
                                    onDelete={handleDeleteClick}
                                    onSelect={setSelectedHotel}
                                />
                            ))
                        ) : (
                            <p style={{ color: '#aaa', gridColumn: '1 / -1', textAlign: 'center' }}>No hotels found matching your search or filters.</p>
                        )}
                    </div>
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
export default HotelList;