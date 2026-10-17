import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHotels, addHotel, updateHotel, deleteHotel } from './redux/HotelSlice';
import HotelList from "./components/HotelList";
import Footer from './components/Footer';

function App() {
  const dispatch = useDispatch();
  const { hotels, status } = useSelector((state) => state.hotels);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchHotels());
    }
  }, [status, dispatch]);
  const handleAddHotel = (newHotelData) => {
    dispatch(addHotel(newHotelData));
  };
  const handleUpdateHotel = (id, updatedHotelData) => {
    dispatch(updateHotel({ id, updatedHotelData }));
  };
  const handleDeleteHotel = (id) => {
    dispatch(deleteHotel(id));
  };

  return (
    <div>
      <HotelList 
        hotels={hotels} 
        onAddHotel={handleAddHotel} 
        onDeleteHotel={handleDeleteHotel} 
        onUpdateHotel={handleUpdateHotel} 
      />
      <Footer />
    </div>
  );
}
export default App;