import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const findLocation = createAsyncThunk(
  "location",
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  
  const {latitude, longitude} = event.coords;
  async (lat, lon, { getState, dispatch, rejectWithValue }) => {
    try {
      const { data } =
        await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=d6eab5fff7ba5e28e64aa09a00da62a0
    `);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getWeatherAction = createAsyncThunk(
  "weather",
  async (payload, { getState, dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${payload}&appid=3578dfed94786251f140917604cd3f75`
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// slices(reducers)

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {},
  extraReducers: (builder) => {
    //if data is still loading
    builder.addCase(getWeatherAction.pending, (state, action) => {
      state.loading = true;
    });
    //data awaited and retrieved
    builder.addCase(getWeatherAction.fulfilled, (state, action) => {
      state.weather = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    //rejected request, cannot get data
    builder.addCase(getWeatherAction.rejected, (state, action) => {
      state.loading = false;
      state.weather = undefined;
      state.error = action?.payload;
    });
  },
});

export default weatherSlice.reducer;
