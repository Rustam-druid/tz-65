import { IDish } from '../../types';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  dish: IDish;

}

const DishItem: React.FC<Props> = ({ dish,}) => {

  return (
    <div className="card mb-3 p-4" >
      <div className="row justify-content-between">
        <div className="col-6">
          <h5 className="card-title">{dish.name}</h5>
          <p className="card-text">{dish.description}</p>
          <p className="card-text">Price: {dish.price} SOM</p>
        </div>
        <div className='row justify-content-between row-cols-2'>
          <NavLink to={`/editDish/${dish.id}`}>Edit</NavLink>

        </div>

      </div>
    </div>
  );
};

export default DishItem;
