import React from 'react';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import { Tooltip } from 'react-tooltip';
import { Star, InfoSquare, Trash3 } from 'react-bootstrap-icons';

function MovieCard(props) {
  const movie = props.movie;
  const { poster_path, title, release_date, overview } = movie;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img
        variant="top"
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Release date: {release_date}
        </Card.Subtitle>
        <Card.Text>{overview}</Card.Text>
        <Stack direction="horizontal" gap={3} style={{ margin: '5px' }}>
          <div>
            {props.buttonvariant !== '0' && (
              <button
                style={{ marginRight: '3px', border: '0px' }}
                onClick={props.infohandler}
                //idx={props.idx}
                data-tooltip-id="viewTip"
                data-tooltip-content="Movie Info"
              >
                <InfoSquare
                  color="gray"
                  size={32}
                  //onClick={props.infohandler}
                  idx={props.idx}
                />
                <Tooltip id="viewTip" />
              </button>
            )}
          </div>
          <div style={{ marginLeft: 'auto' }}>
            {props.buttonvariant === '1' && (
              <button
                style={{ marginRight: '3px', border: '0px' }}
                onClick={props.favhandler}
                idx={props.idx}
                data-tooltip-id="favTip"
                data-tooltip-content="Add to Favourites"
              >
                <Star
                  //onClick={props.favhandler}
                  idx={props.idx}
                  color="gray"
                  size={32}
                />
                <Tooltip id="favTip" />
              </button>
            )}
            {props.buttonvariant === '2' && (
              <button
                style={{ marginRight: '3px', border: '0px' }}
                onClick={props.delhandler}
                idx={props.idx}
                data-tooltip-id="delTip"
                data-tooltip-content="Delete Movie"
              >
                <Trash3
                  //onClick={props.delhandler}
                  idx={props.idx}
                  color="gray"
                  size={32}
                />
                <Tooltip id="delTip" />
              </button>
            )}
          </div>
        </Stack>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
