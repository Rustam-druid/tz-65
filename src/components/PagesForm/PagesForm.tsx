import React, { useState } from 'react';
import { IPagesAppMutation } from '../../types';

interface Props {
  addNewPage: (newPage: IPagesAppMutation) => void;
  EditPage?:IPagesAppMutation;
  isEditing?:boolean;
}

const initionState = {
  title:'',
  Content: '',
};

const PagesForm: React.FC<Props> = ({addNewPage, EditPage= initionState , isEditing=false}) => {
  const [newPage,setNewPage] = useState<IPagesAppMutation>(initionState);

  const changePageContent = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    });
    if (!isEditing){
      setNewPage({
        title:'',
        Content: '',
      });
    };
  }
};


  return (
    <form onSubmit={onSubmit} className='p-3'>
      <h3>add</h3>
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