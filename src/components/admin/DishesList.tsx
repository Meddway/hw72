import React from 'react';
import Navigation from './Navigation';

const DishesList:React.FC = () => {
  return (
    <div>
      <Navigation />
      <div className="container mt-3">
        <div className="row justify-content-between align-items-center">
          <div className="col-3">
            <h4>Dishes</h4>
          </div>
          <div className="col-3 text-right text-end">
            <button className="btn btn-primary btn-sm" >Add new Dish</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishesList;