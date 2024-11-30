import { createSlice } from "@reduxjs/toolkit";
import { eventModel } from "../../models/eventModel";
import { RootState } from "../store";


interface EventState {
  events: eventModel[];
}


const initialState: EventState = {
  events: [],
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    setEvents: (state, action) => {
      // Kiểm tra nếu action.payload là một mảng lồng, lấy mảng bên trong cùng
      if (Array.isArray(action.payload) && Array.isArray(action.payload[0])) {
        state.events = action.payload[0];
      } else {
        state.events = action.payload;
      }
      // console.log("State events in Redux store:", state.events);
    },
    
    // ... các action khác cho sự kiện (nếu cần)
  },
  
});

export const eventReducer = eventSlice.reducer;
export const { addEvent, setEvents  } = eventSlice.actions;

export const eventSelector = (state: RootState) => state.event.events;
