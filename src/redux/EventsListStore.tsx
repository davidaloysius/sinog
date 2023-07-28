import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface EventModel {
  title: string;
  description: string;
  venue: string;
  date: string;
  players: string[];
}

const headers = {
  "api-key": "xd12Uz1jPNghWAhmBnHhlfpAnhM8ypv3mH8Fx7OeJOTl7mIlpzOrGVQp0HplVL21",
};

const mongoConfig = {
  collection: "Thugs Ultimate Events",
  database: "ultimate_events",
  dataSource: "Cluster0",
};

const baseUrl = "https://event-server-one.vercel.app/";

export const getEvents = createAsyncThunk("ultimateEvents/get", async () => {
  const config: any = {
    headers: { ...headers, "api-url": "find" },
  };

  const response = await axios.post(baseUrl, mongoConfig, config);
  const data = (await response) && response.data ? response.data : response;
  return data;
});

export const addEvent = createAsyncThunk<any, any>(
  "ultimateEvents/addEvent",
  async (payload) => {
  
    const config: any = {
      headers: { ...headers, "api-url": "insertOne" },
    };

    const response = await axios.post(
      baseUrl,
      {
        ...mongoConfig,
        document: {
          ...payload
        }
      },
      config
    );
    const data = (await response) && response.data ? response.data : response;
    return { ...data, newEvent: {...payload} };
  }
);

export const addNewPlayer = createAsyncThunk<any, any>(
  "ultimateEvents/update",
  async (payload) => {
    console.log(payload);
    const { id, newData } = payload;
    const config: any = {
      headers: { ...headers, "api-url": "updateOne" },
    };

    const response = await axios.post(
      baseUrl,
      {
        ...mongoConfig,
        filter: {
          _id: { $oid: id },
        },
        update: {
          $set: {
            ...newData,
          },
        },
      },
      config
    );
    const data = (await response) && response.data ? response.data : response;
    return { ...data, _id: id, newData: newData.players };
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
      const response = action.payload;
      const result: any[] = [...response.documents];
      state.events = result;
    },
    [addNewPlayer.fulfilled.type]: (state, action) => {
      const response = action.payload;

      if (!response._id) return;

      const events: any = [ ...state.events ];
      const updatedEventIndex = events.findIndex((event: any) => event?._id === response._id);

      if (updatedEventIndex < 0) return;

      events[updatedEventIndex].players = [...response.newData];
      state.events = events;
    },
    [addEvent.fulfilled.type]: (state, action) => {
      const response = action.payload;

      if (!response.newEvent) return;

      state.events = [ ...state.events, response.newEvent];
    },
  },
});

// Action creators are generated for each case reducer function
export const { insertNewEvent } = eventsListSlice.actions;

export default eventsListSlice.reducer;
