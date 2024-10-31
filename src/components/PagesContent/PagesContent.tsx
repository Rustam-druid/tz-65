import PagesItemContent from './PagesItemContent.tsx';
import * as React from 'react';
import { IPagesApp } from '../../types';

interface Props {
  pages: IPagesApp[];
}

const PagesContent: React.FC<Props> = ({ pages }) => {
  return (
    <>
      {pages.map((page) => (
        <PagesItemContent key={page.id} page={page}   />
      ))}
    </>
  );
};

export default PagesContent;
