import {configureStore} from "@reduxjs/toolkit";
import {DishesReducer} from "../containers/ThunkFetch/FetchSlice.ts";

export const store = configureStore({
    reducer:{
        dishes: DishesReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;