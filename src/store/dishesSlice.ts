import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Dish, DishesState} from "../types";

const initialState: DishesState = {
  dishes: [],
  editedDish: null,
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
    editDish: (state, action: PayloadAction<Dish | null>) => {
      state.editedDish = action.payload;
    },
  },
});

export const {addDish, deleteDish, setDishes, editDish} = dishesSlice.actions;
export default dishesSlice.reducer;
