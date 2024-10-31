import React, { useCallback } from 'react';
import { IPagesApp } from '../../types';
import PagesContent from '../../components/PagesContent/PagesContent.tsx';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';
import axiosApi from '../../axiosAPI.ts';

interface Props {
  loadingFromApp: boolean;
  pages:IPagesApp[];
}

const Home: React.FC<Props> = ({loadingFromApp, pages}) => {

  const deletePage = useCallback(async (id:string) => {
    try {
      const a = await axiosApi.delete(`pages/${id}.json`);

    }catch (e) {
      console.error(e);
    }
  }, []);
  return (
    <>
      {loadingFromApp ? <Spinner/> :
        <div className='row justify-content-between m-2'>

        <PagesContent pages={pages} deletePage={deletePage}/>

      </div>}


    </>
  );
};

export default Home;