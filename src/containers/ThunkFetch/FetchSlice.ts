import {createSlice} from "@reduxjs/toolkit";

interface DishProps{
    title: string;
    price: number;
    img: string;
}

interface DishState {
    dishes: DishProps[];
    loading: boolean;
    error: boolean;
}

const initialState: DishState = {
    dishes: [],
    loading: false,
    error: false,
}

export const DishesSlice = createSlice({
    name: 'dishes',
    initialState,
    reducers: {
        consoleLogger: (state) => {
            console.log(state.dishes)
        },
    },
})


export const DishesReducer = DishesSlice.reducer;

export const  {consoleLogger}  = DishesSlice.actions;