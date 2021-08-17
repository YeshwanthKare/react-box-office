import React from 'react';
import ShowCard from './ShowCard';
import IMAGE_NOT_FOUND from '../../images/not-found.png';
import { FlexGrid } from '../styled';
import { useShows } from '../../misc/custom-hooks';

const ShowGrid = ({ data }) => {
  const [starredShows, dispatchStarred] = useShows();

  console.log('starred:', starredShows, 'dispatch:', dispatchStarred);

  return (
    <FlexGrid>
      {data.map(({ show }) => {
        const isStarred = starredShows.includes(show.id);

        const onClickStar = () => {
          if (isStarred) {
            dispatchStarred({ type: 'REMOVE', showId: show.id });
          } else {
            dispatchStarred({ type: 'ADD', showId: show.id });
          }
        };

        return (
          <ShowCard
            key={show.id}
            name={show.name}
            id={show.id}
            image={show.image ? show.image.medium : IMAGE_NOT_FOUND}
            summary={show.summary}
            onClickStar={onClickStar}
            isStarred={isStarred}
          />
        );
      })}
    </FlexGrid>
  );
};

export default ShowGrid;
