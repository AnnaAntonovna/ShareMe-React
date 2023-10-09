import React from 'react';
import * as  Loaders from 'react-loader-spinner';

const Loader = Loaders.Circles;

const Spinner = ({ message }) => {
  return (
    <div className='flex flex-col pt-5 justify-center items-center w-full h-full'>
      <Loader
        color='#314473'
        height={60}
        width={200}
        className='m-5'
      />  

      <p className='text-lg text-center px-5 m-5'>{message}</p>

    </div>
  )
}

export default Spinner