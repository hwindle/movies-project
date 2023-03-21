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
              <>
                <InfoSquare
                  data-tooltip-id="infoTip"
                  data-tooltip-content="Movie Info"
                  color="gray"
                  size={32}
                  onClick={() => {
                    props.handler('info', props.idx);
                  }}
                  idx={props.idx}
                />
                <Tooltip id="infoTip" />
              </>
            )}
          </div>
          <div style={{ marginLeft: 'auto' }}>
            {props.buttonvariant === '1' && (
              <>
                <Star
                  data-tooltip-id="favTip"
                  data-tooltip-content="Add to Favourites"
                  color="gray"
                  size={32}
                  onClick={() => {
                    props.handler('favourite', props.idx);
                  }}
                  idx={props.idx}
                />
                <Tooltip id="favTip" />
              </>
            )}
            {props.buttonvariant === '2' && (
              <>
                <Trash3
                  data-tooltip-id="delTip"
                  data-tooltip-content="Delete Movie"
                  color="gray"
                  size={32}
                  onClick={() => {
                    props.handler('delete', props.idx);
                  }}
                  idx={props.idx}
                />
                <Tooltip id="delTip" />
              </>
            )}
          </div>
        </Stack>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
