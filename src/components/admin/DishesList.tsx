import React, {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Navigation from './Navigation';
import axiosApi from '../../axiosApi';
import {RootState} from '../../store/store';
import {deleteDish, setDishes, editDish} from '../../store/dishesSlice';
import {Dish} from "../../types";

const DishesList: React.FC = () => {
  const dispatch = useDispatch();
  const dishes = useSelector((state: RootState) => state.dishes.dishes);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosApi.get('/dishes72.json');
        const loadedDishes = [];

        for (const key in response.data) {
          loadedDishes.push({
            id: key,
            ...response.data[key],
          });
        }
        dispatch(setDishes(loadedDishes));

      } catch (error) {
        console.error('Error loading dishes:', error);
      }
    };
    void fetchData();
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    try {
      await axiosApi.delete(`/dishes72/${id}.json`);
      dispatch(deleteDish(id));
    } catch (error) {
      console.error('Error deleting dish:', error);
    }
  };

  const handleEdit = (dish: Dish) => {
    dispatch(editDish(dish));
    navigate(`/admin/dishes/edit/${dish.id}`);
  };

  return (
    <div>
      <Navigation/>
      <div className="container mt-3">
        <div className="col-3 text-right text-end">
          <Link to="/admin/dishes/add" className="btn btn-primary btn-sm">
            Add new Dish
          </Link>
        </div>
        <div className="row justify-content-between align-items-center">
          <div>
            <div>
              {dishes.map((dish) => (
                <div key={dish.id} className="border m-3 row row-cols-6">
                  <img src={dish.image} alt={dish.title} className="m-1" style={{maxWidth: '80px', maxHeight: '80px'}}/>
                  <h4 className="m-auto">{dish.title}</h4>
                  <p className="m-auto">{dish.price} KGS </p>
                  <Link to={`/admin/dishes/edit/${dish.id}`} className="m-auto btn-link"
                        onClick={() => handleEdit(dish)}>
                    Edit
                  </Link>
                  <button className="m-auto btn-link" onClick={() => handleDelete(dish.id)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishesList;
