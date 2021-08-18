import styled from 'styled-components';
import FadeIn from 'react-fade-in';

export const FlexGrid = styled(FadeIn)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const Star = styled.div`
  display: inline-block;
  width: 18px;
  height: 18px;
  background-color: ${props => {
    return props.active ? '#ffc806' : '#ddd';
  }};
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
`;
