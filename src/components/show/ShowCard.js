import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from '../styled';
import { SearchCard } from './ShowCard.Styled';

const ShowCard = ({ name, image, id, summary, onClickStar, isStarred }) => {
  const summaryAsText = summary
    ? `${summary.split(' ').slice(0, 10).join(' ').replace(/<.+?>/g, '')}...`
    : 'No description';
  return (
    <SearchCard>
      <div className="img-wrapper">
        <img src={image} alt="show" />
      </div>

      <h1>{name}</h1>

      <p>{summaryAsText}</p>

      <div>
        <Link to={`/show/${id}`}>Read more</Link>
        <button type="button" onClick={onClickStar}>
          <Star active={isStarred} />
        </button>
      </div>
    </SearchCard>
  );
};

export default ShowCard;
