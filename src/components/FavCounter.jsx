import React from 'react';
import { StarFill } from 'react-bootstrap-icons';
import { FavouriteContext } from '../FavouriteContexts/FavouriteContext';
import { useContext } from 'react';
import { Tooltip } from 'react-tooltip';

function FavCounter() {
  // destructure objects from context

  const { show, numberAdded } = useContext(FavouriteContext);

  console.log(
    'mf context: ',
    show,
    numberAdded,
    show.showStar,
    numberAdded.numFavourites
  );

  // set favourites value in local storage, clear if in favourites page
  if (numberAdded.numFavourites > 0) {
    return (
      <>
        <div
          style={{
            position: 'relative',
            width: '32px',
            height: '32px',
            textAlign: 'center',
            verticalAlign: 'center',
          }}
        >
          <StarFill
            data-tooltip-id="favTip"
            data-tooltip-content="New Favourites"
            color="yellow"
            size={32}
          />
          <Tooltip id="favTip" />
          {numberAdded.numFavourites < 10 && (
            <span
              style={{
                margin: '0 auto',
                position: 'absolute',
                left: '13px',
                top: '10px',
                fontSize: '0.65rem',
                color: 'black',
              }}
            >{` ${numberAdded.numFavourites}`}</span>
          )}
          {numberAdded.numFavourites >= 10 && (
            <span
              style={{
                margin: '0 auto',
                position: 'absolute',
                left: '11px',
                top: '10px',
                fontSize: '0.55rem',
                color: 'black',
              }}
            >{` ${numberAdded.numFavourites}`}</span>
          )}
        </div>
      </>
    );
  } else {
    return <></>;
  }
}

export default FavCounter;
