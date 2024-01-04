import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axiosApi from '../../axiosApi';
import { addDish } from '../../store/dishesSlice';
import Navigation from "./Navigation";

const DishForm: React.FC = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axiosApi.post('/dishes72.json', { title, price, image });

      const newDishId = response.data.name;

      dispatch(addDish({ id: newDishId, title, price, image }));

      setTitle('');
      setPrice(0);
      setImage('');
    } catch (error) {
      console.error('Error adding dish:', error);
    }
  };

  return (
    <div>
      <Navigation/>
      <form>
        <label className="m-3">
          Title:
          <input type="text" className="ms-5" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br />
        <label className="m-3">
          Price:
          <input type="number" className="ms-5" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        </label>
        <br />
        <label className="m-3">
          Image URL:
          <input type="text" className="ms-1"  value={image} onChange={(e) => setImage(e.target.value)} />
        </label>
        <br />
        <button type="button" className="btn btn-primary m-3" onClick={handleSubmit}>
          Add Dish
        </button>
      </form>
    </div>
  );
};

export default DishForm;
