import React from 'react';
import Start from './components/Start';
import Instructions from './components/Instructions';
import Quiz from './components/Quiz';
import Result from './components/Result';
import { DataProvider } from './context/dataContext';

function App() {
  return (
    <DataProvider>
      {/* Welcome Page */}
      <Start/>

      {/*instructions*/}
      <Instructions/>

      {/* Quiz Page */}
      <Quiz/>

      {/* Result Page */}
      <Result/>

    </DataProvider>
  );
}

export default App;
