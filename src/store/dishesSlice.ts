import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Dish {
  id: string;
  title: string;
  price: number;
  image: string;
}

interface DishesState {
  dishes: Dish[];
}

const initialState: DishesState = {
  dishes: [],
};

const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
    addDish: (state, action: PayloadAction<Dish>) => {
      state.dishes.push(action.payload);
    },
    deleteDish: (state, action: PayloadAction<string>) => {
      state.dishes = state.dishes.filter((dish) => dish.id !== action.payload);
    },
    setDishes: (state, action: PayloadAction<Dish[]>) => {
      state.dishes = action.payload;
    },
  },
});

export const { addDish, deleteDish, setDishes } = dishesSlice.actions;
export default dishesSlice.reducer;
