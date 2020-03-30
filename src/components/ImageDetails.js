import React, { Fragment, useEffect, useContext, useState } from 'react';
import ImageContext from '../ImageContext';
import Tesseract from 'tesseract.js';
import axios from 'axios';
import { Button, Spinner } from 'react-bootstrap';

function ImageDetails() {
  const { selectedId, fetchAssetPath } = useContext(ImageContext);
  let [selectedImg, selectImg] = useState({});
  let [loading, setLoading] = useState(false);
  let [scannedText, changeText] = useState('');
  const imageStore = 'https://74k4rzrsqubz5ma3f-mock.stoplight-proxy.io/api/v1/images';

  const fetchOCR = async () => {
    setLoading(true);
    const { data: { text }} = await Tesseract.recognize(
      require(`../${fetchAssetPath(selectedImg.id)}`),
      'eng',
    );
    setLoading(false);
    changeText(text);
  };

  useEffect(()=> {
    const fetchImage = async() => {
      const { data } = await axios.get(imageStore, {
        params: {
          id: selectedId,
        },
      });
      selectImg(data);
      changeText(''); // Reset scanned text
    };
    fetchImage();
  }, [selectedId]);

  return (
    <Fragment>
      <div className="item-details">
        <h3>Details</h3>
        <hr/>
        <div className="item-details-container">
          <img
            className="item-details-container-image"
            src={selectedImg.id && require(`../${fetchAssetPath(selectedImg.id)}`)}
            alt={`Item ${selectedImg.id}`}
            height="200"
            width="160">  
          </img>
          <div className="item-details-container-desc">
            <h1>{selectedImg.title}</h1>
            <span>Quantity: <b>{selectedImg.quantity}</b></span>
            <br/><br/>
            <p>
              <span><b>Description:</b></span><br/>
              {selectedImg.description}
            </p>
          </div>
          <div className="item-details-container-feature">
            <span><b>Features:</b></span>
            <ol>
              {(selectedImg.features || []).map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ol>
          </div>
          <div className="item-details-container-footer">
            <Button variant="primary" disabled={loading || !selectedImg.id} onClick={fetchOCR}>
              {
                loading ?
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  /> :
                  ''
              }
              {loading ? '  Scanning' : 'Scan Now'}
            </Button>
          </div>
        </div>
        <div className="scanned-text">
          {scannedText || "Click 'Scan Now' to fetch image text"}
        </div>
      </div>
    </Fragment>
  );
}

export default ImageDetails;