import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';

function InfoModal(props) {
  const [show, setShow] = useState(true);

  // handler for close button icon in header

  const handleClose = () => setShow(false);
  const movieInfo = props.data;

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{movieInfo.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>
              <span style={{ fontWeight: 'bold' }}>Overview: </span>$
              {movieInfo.overview}
            </p>
            <p>
              <span style={{ fontWeight: 'bold' }}>Release Date: </span>$
              {movieInfo.release_date}
            </p>
            <p>
              <span style={{ fontWeight: 'bold' }}>Original Language: </span>$
              {movieInfo.original_language}
            </p>
            <p>
              <span style={{ fontWeight: 'bold' }}>Imdb ID: </span>$
              {movieInfo.imdb_id}
            </p>
            <p>
              <span style={{ fontWeight: 'bold' }}>Budget: </span>$
              {movieInfo.budget}
            </p>
            <p>
              <span style={{ fontWeight: 'bold' }}>Revenue: </span>$
              {movieInfo.revenue}
            </p>
            <p>
              <span style={{ fontWeight: 'bold' }}>Run time: </span>$
              {movieInfo.runtime}
            </p>
            <p>
              <span style={{ fontWeight: 'bold' }}>Popularity: </span>$
              {movieInfo.popularity}
            </p>
            <p>
              <span style={{ fontWeight: 'bold' }}>Vote Count: </span>$
              {movieInfo.vote_count}
            </p>
            <p>
              <span style={{ fontWeight: 'bold' }}>Vote Average: </span>$
              {movieInfo.vote_average}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default InfoModal;
