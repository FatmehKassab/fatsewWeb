// src/redux/dollSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  doll: null,
  selectedComponents: {
    body: null,
    hair: null,
    top: null,
    bottom: null,
    shoes: null,
  },
  totalPrice: 0,
};

export const fetchDollComponents = createAsyncThunk(
  'doll/fetchDollComponents',
  async () => {
    const response = await axios.get('http://localhost:3000/api/dolls/components');
    return response.data;
  }
);

const dollSlice = createSlice({
  name: 'doll',
  initialState,
  reducers: {
    selectComponent: (state, action) => {
      const { type, component } = action.payload;
      state.selectedComponents[type] = component;

      // Recalculate total price
      state.totalPrice = Object.values(state.selectedComponents).reduce(
        (total, part) => total + (part ? part.price : 0),
        0
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDollComponents.fulfilled, (state, action) => {
      state.doll = action.payload;
    });
  },
});

export const { selectComponent } = dollSlice.actions;

export default dollSlice.reducer;
