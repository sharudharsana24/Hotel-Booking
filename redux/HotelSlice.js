import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchHotels = createAsyncThunk('hotels/fetchHotels', async () => {
    const response = await fetch('http://localhost:5000/api/hotels');
    const data = await response.json();
    return Array.isArray(data) ? data : data.hotels;
});

export const addHotel = createAsyncThunk('hotels/addHotel', async (newHotelData) => {
    const response = await fetch('http://localhost:5000/api/hotels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newHotelData),
    });
    const data = await response.json();
    return data.hotel || data;
});

export const updateHotel = createAsyncThunk('hotels/updateHotel', async ({ id, updatedHotelData }) => {
    const response = await fetch(`http://localhost:5000/api/hotels/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedHotelData),
    });
    const data = await response.json();
    return data.hotel || data;
});

export const deleteHotel = createAsyncThunk('hotels/deleteHotel', async (id) => {
    await fetch(`http://localhost:5000/api/hotels/${id}`, { method: 'DELETE' });
    return id;
});
const hotelSlice = createSlice({
    name: 'hotels',
    initialState: {
        hotels: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHotels.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.hotels = action.payload;
            })
            .addCase(addHotel.fulfilled, (state, action) => {
                state.hotels.push(action.payload);
            })
            .addCase(updateHotel.fulfilled, (state, action) => {
                const updated = action.payload;
                state.hotels = state.hotels.map((hotel) => 
                    Number(hotel.id) === Number(updated.id) ? updated : hotel
                );
            })
            .addCase(deleteHotel.fulfilled, (state, action) => {
                state.hotels = state.hotels.filter((hotel) => Number(hotel.id) !== Number(action.payload));
            });
    },
});
export default hotelSlice.reducer;