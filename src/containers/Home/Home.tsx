import React from 'react';
import { IPagesApp } from '../../types';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';
import PagesContent from '../../components/PagesContent/PagesContent.tsx';

interface Props {
  loadingFromApp: boolean;
  pages:IPagesApp[];
}

const Home: React.FC<Props> = ({loadingFromApp, pages}) => {
  return (
    <>

          <div className='row'>

           <PagesContent pages={pages}/>

          </div>

    </>
  );
};

export default Home;