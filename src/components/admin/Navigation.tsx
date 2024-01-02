import React from 'react';
import {Link} from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link to='/admin'>
          <span className="navbar-brand">Turtle Pizza Admin</span>
        </Link>
        <ul className="navbar-nav mr-auto flex-row gap-2 flex-nowrap">
          <li className="nav-item">
            <Link to="/admin/dishes" className="nav-link">Dishes</Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/orders" className="nav-link">Orders</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
