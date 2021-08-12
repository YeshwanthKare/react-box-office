import React from 'react';
import ActorCard from './ActorCard';
import IMAGE_NOT_FOUND from '../../images/not-found.png';
import { FlexGrid } from '../styled';

const ActorGrid = ({ data }) => (
  <FlexGrid>
    {data.map(({ person }) => (
      <ActorCard
        key={person.id}
        id={person.id}
        name={person.name}
        country={person.country ? person.country.name : null}
        birthday={person.birthday ? person.birthday : null}
        image={person.image ? person.image.medium : IMAGE_NOT_FOUND}
        gender={person.gender}
        deathday={person.deathday ? person.deathday : null}
      />
    ))}
  </FlexGrid>
);

export default ActorGrid;
