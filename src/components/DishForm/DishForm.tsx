import * as React from 'react';
import { useState } from 'react';
import { ApiDish, IDishMutation } from '../../types';

interface Props {
  addNewDish?: (dish: ApiDish) => void;
  editDish?: IDishMutation;
  isEditing?: boolean;
}

const inititaStateForm = {
  name: '',
  description: '',
  urlImage: '',
  price: 0,
};

const DishForm: React.FC<Props> = ({addNewDish , editDish= inititaStateForm,isEditing=false}) => {
  const [newDish, setNewDish] = useState<IDishMutation>(editDish);

  const changeDish = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setNewDish((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDish.name.trim().length === 0 || newDish.description.trim().length === 0) {
      alert('Заполните все поля!');
    } else {
      addNewDish({
        ...newDish,
        price: Number(newDish.price),
      });
if (!isEditing){
  setNewDish({
    name: '',
    description: '',
    urlImage: '',
    price: 0,
  });
};
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h3>{isEditing ? 'Edit new Dish' : 'Add new Dish' }</h3>
      <div className="form-group mb-2">
        <label htmlFor="name">Title:</label>
        <input
          type="text"
          onChange={changeDish}
          value={newDish.name}
          id="name"
          name="name"
          className="form-control"
        />
      </div>

      <div className="form-group mb-2">
        <label htmlFor="description">Description:</label>
        <textarea
          value={newDish.description}
          id="description"
          name="description"
          onChange={changeDish}
          className="form-control"
        />
      </div>
      <div className="form-group mb-2">
        <label htmlFor="urlImage">Url image:</label>
        <input
          value={newDish.urlImage}
          type="url"
          id="urlImage"
          name="urlImage"
          onChange={changeDish}
          className="form-control"
        />
      </div>

      <div className="form-group mb-2">
        <label htmlFor="price">Price:</label>
        <input
          value={newDish.price}
          onChange={changeDish}
          type="number"
          id="price"
          name="price"
          min={1}
          className="form-control"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        {isEditing ? 'Edit Dish' : 'Add Dish'}
      </button>
    </form>
  );
};

export default DishForm;
