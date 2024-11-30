import { createAsyncThunk } from '@reduxjs/toolkit';
import eventAPI from '../../apis/eventApi';

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const response = await eventAPI.HandleEvent('/get-events');
  return response.data;
});