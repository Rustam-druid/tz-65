import React, { useCallback, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axiosAPI from './axiosAPI.ts';
import ToolBar from './components/ToolBar/ToolBar.tsx';
import Home from './containers/Home/Home.tsx';
import NewPage from './containers/NewPage/NewPage.tsx';

const App = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPages = useCallback (async () => {
    try {
      const responsePages = await axiosAPI('pages.json');

      if (responsePages.data === null) {
        setPages([]);
        return;
      }
      ;

      const addNewKeyInObj = Object.keys(responsePages.data).map(Newkey => {
        return {
          ...responsePages.data[Newkey],
          id: Newkey
        };
      });
      setPages(addNewKeyInObj);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setPages(pages);
    void fetchPages();

  }, [fetchPages]);


  return (
    <>
      <div className="container p-0 w-50 border border-3 border-black">
        <div style={{backgroundColor: '#ccc', height: 60, borderBottom: '3px solid black'}}></div>
        <header><ToolBar/></header>
        <main>
          <div className="row">
            <Routes>
              <Route path='/' element={<Home pages={pages} loadingFromApp={loading} />} />
              <Route path='/newpage' element={<NewPage />} />
            </Routes>
          </div>
        </main>


        <div style={{backgroundColor: '#ccc', height: 30, borderTop: '3px solid black'}}></div>
      </div>

    </>
  );
};

export default App;