import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axiosAPI from "../../axios/AxiosAPI.ts";

export interface DishProps{
    id?: string;
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

export const postDish = createAsyncThunk<DishProps, DishProps>('dishes/postDish', async (newDish) => {
    try {
        const response = await axiosAPI.post('/pizzaturtle/dishes.json', newDish);
        return { ...newDish, id: response.data.name };
    } catch (error) {
        console.error('Error:', error);
    }
});

export const DishesSlice = createSlice({
    name: 'dishes',
    initialState,
    reducers: {
        consoleLogger: (state) => {
            console.log(state.dishes)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(postDish.pending, (state:DishState) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(postDish.fulfilled, (state:DishState, action: PayloadAction<DishProps>) => {
                state.dishes.push(action.payload);
                state.loading = false;
            })
            .addCase(postDish.rejected, (state:DishState) => {
                state.loading = false;
                state.error = true;
            });
    },
})


export const DishesReducer = DishesSlice.reducer;

export const  {consoleLogger}  = DishesSlice.actions;