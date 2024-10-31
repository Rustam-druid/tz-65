import { IPagesApp } from '../../types';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  page: IPagesApp;
  onDeletePage:React.MouseEventHandler<HTMLButtonElement>;
}

const PagesItemContent: React.FC<Props> = ({ page, onDeletePage}) => {

  return (
    <div className="row ">
      <div className="card mb-3 p-4 border border-dark border-3 bg-dark-subtle">
        <div className="row justify-content-between border border-dark p-2 bg-body-secondary ">
          <div className="col-6">
            <h5 className="card-title">{page.title}</h5>
            <p className="card-text">{page.Content}</p>
          </div>
          <div className='row gap-3 row-cols-2 mt-3'>

            <NavLink className='btn btn-info col-2' to={`/editDish/${page.id}`}>Edit</NavLink>
            <button className='btn btn-danger col-2' onClick={() => onDeletePage(page.id)}>delete</button>
          </div>

        </div>
      </div>
    </div>

  );
};

export default PagesItemContent;
