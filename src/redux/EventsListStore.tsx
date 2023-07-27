import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface EventModel {
  title: string;
  description: string;
  venue: string;
  date: string;
  players: string[];
}

export const getEvents = createAsyncThunk("ultimateEvents/get", async () => {
  const config: any = {
    headers: {
      "api-key":
        "xd12Uz1jPNghWAhmBnHhlfpAnhM8ypv3mH8Fx7OeJOTl7mIlpzOrGVQp0HplVL21",
    },
  };

  const response = await axios.post(
    "http://localhost:8080/",
    {
      collection: "Thugs Ultimate Events",
      database: "ultimate_events",
      dataSource: "Cluster0",
    },
    config
  );
  const data = (await response) && response.data ? response.data : response;
  return data;
});

export const addEvents = createAsyncThunk(
  "ultimateEvents/add",
  async (payload: any) => {
    debugger;
    const response = await axios.post(
      "https://ultimate-events.vercel.app/events",
      { ...payload }
    );
    debugger;
    const data = (await response) && response.data ? response.data : response;
    return data;
  }
);

export const eventsListSlice = createSlice({
  name: "eventsList",
  initialState: {
    events: [{}],
  },
  reducers: {
    insertNewEvent: (state, action) => {
      // state.events.push(action.payload);
    },
  },
  extraReducers: {
    [getEvents.fulfilled.type]: (state, action) => {
      const reponse = action.payload;
      const result: any[] = [...reponse.documents];
      state.events = result;
    },
  },
});

// Action creators are generated for each case reducer function
export const { insertNewEvent } = eventsListSlice.actions;

export default eventsListSlice.reducer;
