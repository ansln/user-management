import { useState, useEffect, lazy } from 'react';
import './index.css';
import "preline/preline";
const LoginComponent = lazy(() => import('./Components/LoginComponents'));
const DataSiswaComponent = lazy(() => import('./Components/DataSiswaComponents'));

function App() {

  return (
    <>
        <LoginComponent />
      {/* <div className='w-full h-screen flex flex-col gap-3 bg-defaultBackground p-3 font-defaultText text-defaultBodyText'></div> */}
    </>
  )
}

export default App