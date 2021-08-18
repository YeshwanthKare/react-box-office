import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import ActorGrid from '../components/actor/ActorGrid';
import { getURL } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from './Home.styled';
import CustomRadio from '../components/CustomRadio';

const Home = () => {
  const [input, setInput] = useLastQuery();
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');
  const isShowSearch = searchOption === 'shows';

  const onSearch = () => {
    getURL(`/search/${searchOption}?q=${input}`).then(r => setResults(r));
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
      const cardResult = results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
      return cardResult;
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
      <SearchInput
        type="text"
        onChange={onChnageKey}
        placeholder="Search for something"
        onKeyDown={onKeyCode}
      />
      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            id="show-search"
            type="radio"
            value="shows"
            checked={isShowSearch}
            onChange={changeRadioInput}
          />
        </div>

        <div>
          <CustomRadio
            label="Actors"
            id="actor-search"
            type="radio"
            value="people"
            checked={!isShowSearch}
            onChange={changeRadioInput}
          />
        </div>
      </RadioInputsWrapper>

      <SearchButtonWrapper>
        <button type="button" disabled={!input} onClick={onSearch}>
          Search
        </button>
      </SearchButtonWrapper>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
