import React, { useState } from "react";
import Backdrop from "./Backdrop";
import Modal from "./Modal";
import "./HelpModal.css";
import { screenshots } from "./img";

const HelpModal = ({ setLoadHelp }) => {
  const text1 = (
    <p>
      In the context of this app, mining involves trying different nonce values until one is found that, when combined
      with <br />
      Exif data of the image and the previous block's hash, creates a hash with two leading zeros. <br />
      These elements are concatenated into a single string, which is then fed into a cryptographic hashing function
      SHA-256. <br />
      To start the blockchain, drag and drop the first image and click on 'Mine.' <br />
      When Hash is produced, Prev Hash of the next block is automatically set.
    </p>
  );

  const text2 = (
    <p>
      You can follow the same process for the other images. <br />
      Because the hash function is deterministic, any modification to the Exif data, <br />
      previous block's hash, or nonce would produce a completely different hash value. <br />
      The remaining steps show that if a bad actor alters a past transaction, all subsequent blocks must be re-hashed. <br />
      To experiment with Bad Actor mode, click on the 'Bad Actor' button.
    </p>
  );

  const text3 = (
    <p>
      An altered image of Vermeer's "Astronomer" appears in the image repository <br />
      In Bad Actor mode you can drag and drop an image onto a previously hashed block. <br />
      This will effectively change the exif data.
    </p>
  );

  const text4 = <p>At this point a new Hash must be found.</p>;

  const text5 = (
    <p>If the altered block is rehashed, Prev Hash of the next block will no longer match the Hash of the altered block.</p>
  );

  const text6 = (
    <p>
      The process is intentionally cumbersome. <br />
      After clicking the "Mine" button, use the copy icon to save the new Hash to the clipboard. <br />
      Then click on the Prev Hash of the next block.
    </p>
  );

  const text7 = (
    <p>
      Paste the new Hash of the previous block from the clipboard, <br />
      click "Done," and click on the "Mine" button to re-hash the current block. <br />
      A bad actor would have to repeat these steps for all subsequent blocks.
    </p>
  );

  const images = [
    {
      id: 0,
      src: screenshots.help1,
      text: text1,
    },
    {
      id: 1,
      src: screenshots.help2,
      text: text2,
    },
    {
      id: 2,
      src: screenshots.help3,
      text: text3,
    },
    {
      id: 3,
      src: screenshots.help4,
      text: text4,
    },
    {
      id: 4,
      src: screenshots.help5,
      text: text5,
    },
    {
      id: 5,
      src: screenshots.help6,
      text: text6,
    },
    {
      id: 6,
      src: screenshots.help7,
      text: text7,
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => Math.min(prevIndex + 1, images.length - 1));
  };

  return (
    <>
      <Backdrop />
      <Modal>
        <div className="help-modal">
          <div className="image-container">
            <img src={images[currentImageIndex].src} alt={`Help ${currentImageIndex + 1}`} className="screenshot" />
          </div>
          <div className="image-text">{images[currentImageIndex].text}</div>
          <div className="navigation-buttons">
            <button onClick={handlePrevImage} disabled={currentImageIndex === 0} className="btn">
              Prev
            </button>
            <button onClick={handleNextImage} disabled={currentImageIndex === images.length - 1} className="btn">
              Next
            </button>
            <button className="btn close-btn" onClick={() => setLoadHelp(false)}>
              X
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default HelpModal;
