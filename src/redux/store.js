import { configureStore } from '@reduxjs/toolkit';
import eventListReducer from './EventsListStore';

export const store = configureStore({
	reducer: {
		eventsList: eventListReducer
	},
});
