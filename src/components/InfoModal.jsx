import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function InfoModal(props) {
  const [show, setShow] = useState(true);
  const [movieInfo, setInfoData] = useState([]);
  const [refreshModal, setRefresh] = useState(true);
  const [validData, setValidData] = useState(false);

  // useEffect for getting products

  useEffect(() => {
    console.log('inside the useEffect');

    async function getInfo() {
      try {
        console.log('calling async api');

        const movieUrl = `${process.env.REACT_APP_BE_LOCAL}/moviedetails?id=${props.movieid}`;
        const newData = await axios.get(movieUrl);

        console.log(' here is the data   ', newData);

        setRefresh(false);
        setInfoData(newData);
        setValidData(true);
        // response.status(200).send(digiData);
      } catch (error) {
        console.log(error);
        console.log('error in acquiring movie info');

        //response.status(500).send("error in request for images");
      }
      //setCallApi(false);
    }

    if (refreshModal) {
      getInfo();
    }
  });

  // handler for close button icon in header

  const handleClose = () => setShow(false);

  if (validData) {
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
}

export default InfoModal;
