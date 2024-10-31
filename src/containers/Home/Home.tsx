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
            <div>
              <ul className="col-6 list-unstyled d-flex flex-wrap justify-content-between">
                <li className="btn btn-primary text-success"><NavLink to={`/`}> <p className='text-white m-0'>All</p> </NavLink></li>
                {categories.map((category) => (
                  <li className="btn btn-primary" key={category.id}><NavLink
                    to={`/pages/${category.id}`}> <p className='text-white m-0'>{category.title}</p> </NavLink></li>
                ))}
              </ul>
            </div>


            <div className="col-8">
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