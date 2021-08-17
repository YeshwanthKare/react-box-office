import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router';
import Cast from '../components/show/Cast';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import ShowMainData from '../components/show/ShowMainData';
import { getURL } from '../misc/config';
import { InfoBlock, ShowPageWrapper } from './Show.styled';

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS': {
      return { error: null, show: action.show, isLoading: false };
    }

    case 'FETCH_FAILED': {
      return { error: action.error, show: null, isLoading: false };
    }

    default:
      return prevState;
  }
};

const initialState = {
  show: null,
  error: null,
  isLoading: true,
};

const Show = () => {
  const { id } = useParams();

  const [{ show, error, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    let isMounted = true;

    getURL(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(r => r.json())
      .then(res => {
        if (isMounted) {
          dispatch({ type: 'FETCH_SUCCESS', show: res });
        }
      })
      .catch(err => {
        if (isMounted) {
          dispatch({ type: 'FETCH_FAILED', error: err.message });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return <div>The page is being loaded</div>;
  }

  if (error) {
    return <div>error occured: {error}</div>;
  }

  return (
    <ShowPageWrapper>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />

      <InfoBlock>
        <h2>Details</h2>
        <Details
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </InfoBlock>

      <div>
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.seasons} />
      </div>

      <div>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
      </div>
    </ShowPageWrapper>
  );
};

export default Show;
