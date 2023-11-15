import type { FC } from 'react';
import './style.css'

interface LoaderProps {
  text?: string;
}

const Loader:FC<LoaderProps> = ({ text }) => {
  return (
    <div className='loader flex items-center justify-center flex-col w-52 min-h-52'>
      <div className='loader__container'>
        <div className='loader__item loader__item-1' />
        <div className='loader__item loader__item-2' />
        <div className='loader__item loader__item-3' />
        <div className='loader__item loader__item-4' />
        <div className='loader__item loader__item-5' />
        <div className='loader__item loader__item-6' />
        <div className='loader__item loader__item-7' />
        <div className='loader__item loader__item-8' />
        <div className='loader__item loader__item-big' />
      </div>
      <p className='mt-6 text-primary'>{text}</p>
    </div>
  )
}

Loader.defaultProps = {
  text: 'Loading'
};

export default Loader;
