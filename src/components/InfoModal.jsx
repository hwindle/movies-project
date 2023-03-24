import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import React, { useState, useEffect } from "react";
import "./InfoModal.css";

function InfoModal(props) {
  const [show, setShow] = useState(true);
  const [movieInfo, setMovieInfo] = useState([]);

  const [refreshModal, setRefresh] = useState(true);
  const [validData, setValidData] = useState(false);

  // useEffect for getting products

  useEffect(() => {
    //console.log('inside the useEffect');
    setShow(props.show);

    async function getInfo() {
      try {
        console.log("calling async api");
        setRefresh(true);
        setMovieInfo(props.data);
        console.log("in modal ", movieInfo);
        setValidData(true);
      } catch (error) {
        console.log(error);
        console.log("error in acquiring movie info");
      }
    }

    if (refreshModal) {
      getInfo();
      console.log(show);
    }
  }, [props.movieid, refreshModal, props.show, movieInfo, props.data, show]);

  if (validData) {
    let formattedTime = 0;
    if (parseInt(movieInfo.runtime) > 60) {
      formattedTime =
        Math.floor(parseInt(movieInfo.runtime) / 60) + " hrs and ";
      formattedTime += (parseInt(movieInfo.runtime) % 60) + " mins";
    } else {
      formattedTime = props.data.runtime + " mins";
    }

    return (
      <Modal show={props.show} onHide={props.handleClose} fullscreen={true}>
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title style={{ color: "white", fontWeight: "bold" }}>
            {props.data.title}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{
            color: "#afafaf",
            fontWeight: "bold",
          }}
        >
          <div className="d-flex gap-5">
            <Image
              src={`https://image.tmdb.org/t/p/original/${props.data.poster_path}`}
              style={{
                borderRadius: 5,
                boxShadow: "rgb(46 255 14 / 10%) -1px -1px 57px 1px",
                width: 350,
                height: 500,
                objectFit: "cover",
              }}
            />
            <div>
              <p>
                <span>Overview: </span>
                {props.data.overview}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Release Date: </span>
                {props.data.release_date}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Original Language: </span>
                {props.data.original_language}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Imdb ID: </span>
                {movieInfo.imdb_id}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Budget: </span>$
                {props.data.budget}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Revenue: </span>$
                {props.data.revenue}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Run time: </span>
                {formattedTime}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Popularity: </span>
                {movieInfo.popularity}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Vote Count: </span>
                {movieInfo.vote_count}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Vote Average: </span>
                {movieInfo.vote_average}
              </p>
            </div>
          </div>
          <br />
          <h2>Cast</h2>
          <div className="d-flex flex-wrap gap-5 mt-5">
            {props.movieCast?.map((cast) => {
              return (
                <div
                  key={cast.id}
                  style={{ display: "grid", placeItems: "center" }}
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`}
                    style={{
                      borderRadius: 5,
                      boxShadow: "rgb(46 255 14 / 10%) -1px -1px 57px 1px",
                      width: 100,
                      height: 100,
                      objectFit: "cover",
                    }}
                  />
                  <p style={{ color: "white", textAlign: "center" }}>
                    {cast.name}
                  </p>
                  <p style={{ color: "white", textAlign: "center" }}>
                    {cast.character}
                  </p>
                </div>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }
}

export default InfoModal;
