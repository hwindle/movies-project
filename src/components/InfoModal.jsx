import Modal from "react-bootstrap/Modal";
import React from "react";
import "./InfoModal.css";

function InfoModal(props) {
  if (props.show) {
    let formattedTime = 0;
    if (parseInt(props.data.runtime) > 60) {
      formattedTime =
        Math.floor(parseInt(props.data.runtime) / 60) + " hrs and ";
      formattedTime += (parseInt(props.data.runtime) % 60) + " mins";
    } else {
      formattedTime = props.data.runtime + " mins";
    }

    return (
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "white", fontWeight: "bold" }}>
            {props.data.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "#afafaf", fontWeight: "bold" }}>
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
              {props.data.imdb_id}
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

              {props.data.popularity}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Vote Count: </span>
              {props.data.vote_count}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Vote Average: </span>
              {props.data.vote_average}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }
}

export default InfoModal;
