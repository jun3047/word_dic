import React from 'react';
import SearchBar from './components/SearchBar';

const App = () => {
  return (
    <div className=''>
      <SearchBar
        search={()=>console.log('search')}
        setSearchWord={(e)=>console.log(e.target.value)}
      />
    </div>
  );
};

export default App;