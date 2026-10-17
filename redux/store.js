import { configureStore } from '@reduxjs/toolkit';
import hotelReducer from './HotelSlice';

export const store = configureStore({
    reducer: {
        hotels: hotelReducer,
    },
});