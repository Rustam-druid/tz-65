import React, { useCallback, useEffect, useState } from 'react';
import { ApiPageCategory, IPagesApp } from '../../types';
import PagesContent from '../../components/PagesContent/PagesContent.tsx';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';
import axiosApi from '../../axiosAPI.ts';
import { categories } from '../constants.ts';
import { NavLink, useParams } from 'react-router-dom';

interface Props {
  loadingFromApp: boolean;
}

const categoriesList = categories;

const Home: React.FC<Props> = ({loadingFromApp}) => {
const {categoryId} = useParams();
const [loading, setLoading] = useState(false);
const [page, setPage] = useState<IPagesApp[]>([]);

const fetchData = useCallback(async () => {
  try{
    setLoading(true);
    const response = await axiosApi(
      !categoryId ? 'pages.json' : `/pages.json?orderBy="category"&equalTo="${categoryId}"`);

    const pagesObj: ApiPageCategory =response.data;

    if (pagesObj === null){
      setPage([]);
    }

    if (pagesObj) {
      const Pages = Object.keys(pagesObj).map(pageId => {
        return {
          id: pageId,
          ...pagesObj[pageId],
        };
      });
      setPage(Pages);
      console.log(Pages);
    }
  }catch(error){
    console.log(error);
  }finally {
    setLoading(false);
  }

},[categoryId]);



  const getTitle = (categoryId: string) => {
    const getClickCategory = categoriesList.filter(category => {
      return category.id === categoryId;
    });
    return getClickCategory[0].title;
  };

  const deletePage = useCallback(async (id:string) => {
    try {
       await axiosApi.delete(`pages/${id}.json`);
         await  fetchData();
    }catch (e) {
      console.error(e);
    }
  }, [categoryId]);

  useEffect(() => {
    void fetchData();
  }, [fetchData, categoryId ] );

  return (
    <>
      {loadingFromApp ? <Spinner/> :
        <div className='row justify-content-between m-2'>

          <div className='row'>
            <ul className='col-4 list-unstyled row me-auto'>
              <li className='btn btn-light'><NavLink to={`/`}>All</NavLink></li>
              {categories.map((category) => (
                <li className='btn btn-light' key={category.id}><NavLink to={`/pages/${category.id}`}>{category.title}</NavLink></li>
              ))}
            </ul>
            <div className='col-8'>
              <h2>{!categoryId ? 'all' : getTitle(categoryId)}</h2>
              <div>
                {page.length === 0 ? <p>no pages</p> : <>
                  <PagesContent pages={page} deletePage={deletePage}/>
                </>
                }
              </div>
            </div>
          </div>

        </div>}


    </>
  );
};

export default Home;