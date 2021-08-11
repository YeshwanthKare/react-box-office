import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { getURL } from '../misc/config';

const Home = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);

  const onSearch = () => {
    getURL(`/search/shows?q=${input}`)
      .then(r => r.json())
      .then(r => setResults(r));
  };

  const onKeyCode = e => {
    if (e.keyCode === 13) {
      onSearch();
    }
  };

  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>No Results</div>;
    }
    if (results && results.length > 0) {
      return results.map(item => (
        <div key={item.show.id}>{item.show.name}</div>
      ));
    }
    return null;
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
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
