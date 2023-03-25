import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
// UI imports
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import { Tooltip } from "react-tooltip";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { StarFill, InfoSquare, Trash3 } from "react-bootstrap-icons";

function MovieCard(props) {
  const movie = props.movie;
  const { poster_path, title, release_date, overview } = movie;
  const { isAuthenticated } = useAuth0();

  let posterImg = './imgs/blank_poster.jpg';
  if (poster_path) {
    posterImg = `https://image.tmdb.org/t/p/original/${poster_path}`;
  }

  return (

    <Card style={{ width: "18rem" }}>
      <LazyLoadImage
        variant="top"
        src={posterImg}
        width={"100%"}
        alt="movie"
        effect="blur"
        style={{ objectFit: "cover" }}

      />
      <Card.Body>
        <br />
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Release date: {release_date}
        </Card.Subtitle>
        <Card.Text>{overview}</Card.Text>
        <Stack direction="horizontal" gap={3} style={{ margin: 5 }}>
          <div>
            {/* Select the correct buttons for the bottom of the 
             card */}
            {props.buttonvariant !== "0" && (
              <>
                {isAuthenticated && (
                  <InfoSquare
                    data-tooltip-id="infoTip"
                    data-tooltip-content="Movie Info"
                    color="gray"
                    className="svg-info-square"
                    size={32}
                    onClick={() => {
                      props.handler("info", props.idx);
                    }}
                    idx={props.idx}
                  />
                )}
                {isAuthenticated && <Tooltip id="infoTip" />}
              </>
            )}
          </div>

          <div style={{ marginLeft: "auto" }}>
            {props.buttonvariant === "1" && (
              <>
                {isAuthenticated && (
                  <StarFill
                    data-tooltip-id="favTip"
                    data-tooltip-content="Add to Favourites"
                    color="gray"
                    className="svg-star"
                    size={32}
                    onClick={() => {
                      props.handler("favourite", props.idx);
                    }}
                    idx={props.idx}
                  />
                )}
                {isAuthenticated && <Tooltip id="favTip" />}
              </>
            )}

            {props.buttonvariant === "2" && (
              <>
                <Trash3
                  data-tooltip-id="delTip"
                  data-tooltip-content="Delete Movie"
                  className="svg-trash"
                  color="gray"
                  size={32}
                  onClick={() => {
                    props.handler("delete", props.idx);
                  }}
                  idx={props.idx}
                />
                <Tooltip id="delTip" />
              </>
            )}
          </div>
        </Stack>
        {/* end of horizontal row of buttons */}
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
