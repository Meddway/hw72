export interface Dish {
  id: string;
  title: string;
  price: number;
  image: string;
}

interface DishesState {
  dishes: Dish[];
  editedDish: Dish | null;
}