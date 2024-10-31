import React, { useState } from 'react';
import { IPagesAppMutation } from '../../types';

interface Props {
  addNewPage: (newPage: IPagesAppMutation) => void;
  editPage?:IPagesAppMutation;
  isEditing?:boolean;
}

const initionState = {
  title:'',
  Content: '',
};

const PagesForm: React.FC<Props> = ({addNewPage, editPage=initionState , isEditing=false}) => {
  const [newPage,setNewPage] = useState<IPagesAppMutation>(editPage);

  const changePageContent = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewPage(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

const onSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (newPage.title.trim().length === 0 || newPage.Content.trim().length === 0) {
    alert('Заполните поля');
  }else {
    addNewPage({
      title: newPage.title,
      Content: newPage.Content,
      category: newPage.category,
    });
    if (!isEditing){
      setNewPage({
        title:'',
        Content: '',
        category:'',
      });
    };
  }
};


  return (
    <form onSubmit={onSubmit} className='p-3'>
      <h3>add</h3>

      <div className="form-group mb-2">
        <label htmlFor='category'>Category
        <select onChange={changePageContent} name='category' value={newPage.category}>
          <option value='-' selected disabled>Select the category</option>
          <option value='war' >War</option>
          <option value='tree' >tree</option>
          <option value='bad' >bad</option>
          <option value='table' >table</option>
          <option value='motivation' >motivation</option>

        </select>

        </label>

      </div>

      <div className="form-group mb-2">
        <label htmlFor='title'>Title:</label>
        <input
          type="text"
          onChange={changePageContent}
          value={newPage.title}
          id="title"
          name="title"
          className="form-control"
        />
      </div>

      <div className="form-group mb-2">
        <label htmlFor='Content'>Content:</label>
        <input
          type="text"
          onChange={changePageContent}
          value={newPage.Content}
          id="Content"
          name="Content"
          className="form-control"
        />
      </div>

      <button type='submit' className='btn btn-primary'>add</button>

    </form>
  );
};

export default PagesForm;