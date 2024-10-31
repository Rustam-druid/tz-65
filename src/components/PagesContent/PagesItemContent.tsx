import { IPagesApp } from '../../types';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  page: IPagesApp;

}

const PagesItemContent: React.FC<Props> = ({ page,}) => {

  return (
    <div className="card mb-3 p-4" >
      <div className="row justify-content-between">
        <div className="col-6">
          <h5 className="card-title">{page.title}</h5>
          <p className="card-text">{page.Content}</p>
        </div>
        <div className='row justify-content-between row-cols-2'>
          <NavLink to={`/editDish/${page.id}`}>Edit</NavLink>

        </div>

      </div>
    </div>
  );
};

export default PagesItemContent;
