import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { getURL } from '../misc/config';

const Home = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');
  const isShowSearch = searchOption === 'shows';

  const onSearch = () => {
    getURL(`/search/${searchOption}?q=${input}`)
      .then(r => r.json())
      .then(r => setResults(r));
  };

  console.log(results);

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
      if (results[0].show) {
        return results.map(item => (
          <div key={item.show.id}>{item.show.name}</div>
        ));
      }
      if (results[0].person) {
        return results.map(item => (
          <div key={item.person.id}>{item.person.name}</div>
        ));
      }
    }
    return null;
  };

  const changeRadioInput = e => {
    setSearchOption(e.target.value);
  };

  const onChnageKey = e => {
    setInput(e.target.value);
  };
  return (
    <MainPageLayout>
      <input
        type="text"
        onChange={onChnageKey}
        placeholder="Search for something"
        onKeyDown={onKeyCode}
      />

      <label htmlFor="show-search">
        Shows
        <input
          id="show-search"
          type="radio"
          value="shows"
          checked={isShowSearch}
          onChange={changeRadioInput}
        />
      </label>

      <label htmlFor="actor-search">
        Actors
        <input
          id="actor-search"
          type="radio"
          value="people"
          checked={!isShowSearch}
          onChange={changeRadioInput}
        />
      </label>

      <button type="button" disabled={!input} onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
