import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router';
import { getURL } from '../misc/config';

const initialState = {
  show: null,
  error: null,
  isLoading: true,
};

const reducer = (prevState, action) => {
  switch (action) {
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

const Show = () => {
  const { id } = useParams();

  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(state);

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

  // console.log(show);

  // if (isLoading) {
  //   return <div>The page is being loaded</div>;
  // }

  // if (error) {
  //   return <div>error occured: {error}</div>;
  // }

  return <div>this is show page</div>;
};

export default Show;
