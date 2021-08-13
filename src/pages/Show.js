import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getURL } from '../misc/config';

const Show = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    getURL(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(r => r.json())
      .then(res => setShow(res));
  }, [id]);

  console.log(show);

  return <div>this is show page</div>;
};

export default Show;
