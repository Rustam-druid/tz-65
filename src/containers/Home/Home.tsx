import Dishes from '../../components/Dishes/Dishes.tsx';
import Cart from '../../components/Cart/Cart.tsx';
import { DishCart, IDish } from '../../types';
import * as React from 'react';
import { useCallback } from 'react';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';
import axiosApi from '../../axiosAPI.ts';


interface  Props {
  dishes: IDish[];
  isLoadingDishes: boolean;
}

const Home: React.FC<Props> = ({dishes,isLoadingDishes = false , }) => {



  return (
    <>
    {
      isLoadingDishes ? <Spinner/> :
        <div className="row justify-content-between">
          <div className="col col-md-5 mb-2">
            {dishes.length > 0 ?
              <Dishes dishes={dishes}  />
              : <p>Not dishes</p>
            }
          </div>
        </div>
    }
    </>
  );
};

export default Home;