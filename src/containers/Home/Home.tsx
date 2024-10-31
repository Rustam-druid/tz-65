import React, { useCallback, useEffect, useState } from 'react';
import { ApiPageCategory, IPagesApp } from '../../types';
import PagesContent from '../../components/PagesContent/PagesContent.tsx';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';
import axiosApi from '../../axiosAPI.ts';
import { categories } from '../constants.ts';
import { NavLink, useParams } from 'react-router-dom';

interface Props {
  loadingFromApp: boolean;
  pages:IPagesApp[];
}

const categoriesList = categories;

const Home: React.FC<Props> = ({loadingFromApp, pages}) => {
const {categoryId} = useParams();
const [page, setPage] = useState<IPagesApp[]>([]);

const fetchData = useCallback(async () => {
  try{
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
  }

},[categoryId]);

  useEffect(() => {
void fetchData();
  }, [fetchData] );

  const getTitle = (categoryId: string) => {
    const getClickCategory = categoriesList.filter(category => {
      return category.id === categoryId;
    });
    return getClickCategory[0].title;
  };

  const deletePage = useCallback(async (id:string) => {
    try {
       await axiosApi.delete(`pages/${id}.json`);

    }catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <>
      {loadingFromApp ? <Spinner/> :
        <div className='row justify-content-between m-2'>

          <div>
            <ul>
              <li> <NavLink to={`/`}>All</NavLink> </li>
              {categories.map((category) => (
                <li key={category.id}> <NavLink to={`/pages/${category.id}`}>{category.title}</NavLink> </li>
                ))}
            </ul>

            <div className='title'>
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