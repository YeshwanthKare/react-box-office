import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';

const Home = () => {
  const [input, setInput] = useState('');

  const onSearch = () => {
    fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
      .then(r => r.json())
      .then(r => console.log(r));
  };

  const onKeyCode = e => {
    if (e.keyCode === 13) {
      onSearch();
    }
  };

  const onChnageKey = e => {
    setInput(e.target.value);
  };
  return (
    <MainPageLayout>
      <input
        type="text"
        onChange={onChnageKey}
        value={input}
        onKeyDown={onKeyCode}
      />
      <button type="button" disabled={!input} onClick={onSearch}>
        Search
      </button>
    </MainPageLayout>
  );
};

export default Home;
