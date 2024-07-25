import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axiosAPI from "../../axios/AxiosAPI.ts";
import {RootState} from "../../app/slice.ts";

export interface DishProps{
    id?: string;
    title: string;
    price: number;
    img: string;
}

interface Order {
    id: string;
    items: Record<string, number>;
}
interface DishState {
    dishes: DishProps[];
    orders: Order[];
    loading: boolean;
    error: boolean;
}

const initialState: DishState = {
    dishes: [],
    orders: [],
    loading: false,
    error: false,
}
export const getDish = createAsyncThunk<DishProps[], void, {state: RootState}>('dishes/getDishes', async () => {
    try {
        const response = await axiosAPI.get(`/pizzaturtle/dishes.json`);
        return Object.keys(response.data).map(key => ({...response.data[key], id: key}));
    } catch (error) {
        console.error('Error:', error);
    }
});
export const postDish = createAsyncThunk<DishProps, DishProps>('dishes/postDish', async (newDish) => {
    try {
        const response = await axiosAPI.post('/pizzaturtle/dishes.json', newDish);
        return { ...newDish, id: response.data.name };
    } catch (error) {
        console.error('Error:', error);
    }
});
export const sendOrder = createAsyncThunk<DishProps, DishProps>('dishes/sendDish', async (order) => {
    try {
        const response = await axiosAPI.post('/pizzaturtle/orders.json', order);
        return { ...order, id: response.data.name };
    } catch (error) {
        console.error('Error:', error);
    }
});
export const putDish = createAsyncThunk<DishProps, { id: string, updatedContact: DishProps }>('contacts/putContact', async ({id, updatedContact}) => {
    try {
        const response = await axiosAPI.put<DishProps>(`/pizzaturtle/dishes/${id}.json`, updatedContact);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
    }
});
export const deleteDish = createAsyncThunk<string, string, { state: RootState }>('dishes/deleteContact', async (id:string) => {
    try {
        await axiosAPI.delete(`/pizzaturtle/dishes/${id}.json`);
        return id;
    }catch (error) {
        console.error('Error:', error);
    }
});

export const deleteOrder = createAsyncThunk<string, string, { state: RootState }>('orders/deleteOrder', async (orderId: string) => {
    try {
        await axiosAPI.delete(`/pizzaturtle/orders/${orderId}.json`);
        return orderId;
    } catch (error) {
        console.error('Error:', error);
        throw error;
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
        builder.addCase(postDish.pending, (state:DishState) => {
                state.loading = true;
                state.error = false;
            }).addCase(postDish.fulfilled, (state:DishState, action: PayloadAction<DishProps>) => {
                state.dishes.push(action.payload);
                state.loading = false;
            }).addCase(postDish.rejected, (state:DishState) => {
                state.loading = false;
                state.error = true;
            }).addCase(getDish.pending, (state:DishState) => {
                state.loading = true;
                state.error = false;
            }).addCase(getDish.fulfilled, (state:DishState, action: PayloadAction<DishProps[]>) => {
                state.dishes = action.payload;
                state.loading = false;
            }).addCase(getDish.rejected, (state:DishState) => {
                state.loading = false;
                state.error = true;
            }).addCase(sendOrder.pending, (state:DishState) => {
                state.loading = true;
                state.error = false;
            }).addCase(sendOrder.fulfilled, (state:DishState) => {
                state.loading = false;
                state.error = false;
            }).addCase(sendOrder.rejected, (state:DishState) => {
                state.loading = false;
                state.error = true;
            }).addCase(putDish.pending, (state:DishState) => {
                state.loading = true;
                state.error = false;
            }).addCase(putDish.fulfilled, (state:DishState) => {
                state.loading = false;
                state.error = false;
            }).addCase(putDish.rejected, (state:DishState) => {
                state.loading = false;
                state.error = true;
            }).addCase(deleteDish.pending, (state: DishState) => {
                state.loading = true;
                state.error = false;
            }).addCase(deleteDish.fulfilled, (state: DishState, action: PayloadAction<string>) => {
                state.loading = false;
                state.dishes = state.dishes.filter(dish => dish.id !== action.payload);
            }).addCase(deleteDish.rejected, (state: DishState) => {
                state.loading = false;
                state.error = true;
            }).addCase(deleteOrder.pending, (state: DishState) => {
                state.loading = true;
                state.error = false;
            }).addCase(deleteOrder.fulfilled, (state: DishState, action: PayloadAction<string>) => {
                state.loading = false;
                state.orders = state.orders.filter(order => order.id !== action.payload);
            }).addCase(deleteOrder.rejected, (state: DishState) => {
                state.loading = false;
                state.error = true;
            });
    },
})


export const DishesReducer = DishesSlice.reducer;

export const  {consoleLogger}  = DishesSlice.actions;