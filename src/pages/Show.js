import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getURL } from '../misc/config';

const Show = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    getURL(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(r => r.json())
      .then(res => {
        if (isMounted) {
          setShow(res);
          setIsLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  console.log(show);

  if (isLoading) {
    return <div>The page is being loaded</div>;
  }

  if (error) {
    return <div>error occured: {error}</div>;
  }

  return <div>this is show page</div>;
};

export default Show;
