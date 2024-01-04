import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axiosApi from '../../axiosApi';
import {addDish, editDish} from '../../store/dishesSlice';
import Navigation from './Navigation';
import {RootState} from '../../store/store';
import {useParams, useNavigate} from 'react-router-dom';

const defaultImageUrl = 'https://www.eclosio.ong/wp-content/uploads/2018/08/default.png';

const DishForm: React.FC = () => {
  const dispatch = useDispatch();
  const editedDish = useSelector((state: RootState) => state.dishes.editedDish);
  const {id} = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState(editedDish?.title || '');
  const [price, setPrice] = useState(editedDish?.price || 0);
  const [image, setImage] = useState(editedDish?.image || '');

  useEffect(() => {
    if (editedDish) {
      setTitle(editedDish.title);
      setPrice(editedDish.price);
      setImage(editedDish.image);
    }
  }, [editedDish]);

  const handleSubmit = async () => {
    try {
      const imageToSend = image || defaultImageUrl;

      if (editedDish) {
        await axiosApi.put(`/dishes72/${editedDish.id}.json`, {title, price, image: imageToSend});
        dispatch(editDish({...editedDish, title, price, image: imageToSend}));
      } else {
        const response = await axiosApi.post('/dishes72.json', {title, price, image: imageToSend});
        const newDishId = response.data.name;
        dispatch(addDish({id: newDishId, title, price, image: imageToSend}));
      }
      setTitle('');
      setPrice(0);
      setImage('');
      dispatch(editDish(null));
      navigate('/admin/dishes');
    } catch (error) {
      console.error('Error adding/editing dish:', error);
    }
  };

  return (
    <div>
      <Navigation/>
      <form>
        <label className="m-3">
          Title:
          <input type="text" className="ms-5" value={title} onChange={(e) => setTitle(e.target.value)}/>
        </label>
        <br/>
        <label className="m-3">
          Price:
          <input type="number" className="ms-5" value={price} onChange={(e) => setPrice(Number(e.target.value))}/>
        </label>
        <br/>
        <label className="m-3">
          Image URL:
          <input type="text" className="ms-1" value={image} onChange={(e) => setImage(e.target.value)}/>
        </label>
        <br/>
        <button type="button" className="btn btn-primary m-3" onClick={handleSubmit}>
          {id ? 'Edit Dish' : 'Add Dish'}
        </button>
      </form>
    </div>
  );
};

export default DishForm;
