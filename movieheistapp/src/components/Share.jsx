import React, { useState, useEffect } from 'react';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";

const Share = ({ movies }) => {
  const [shareText, setShareText] = useState("");
  const [shareURL, setShareURL] = useState("");

  useEffect(() => {
    if (movies.length > 0) {
      const text = movies.map(movie => movie.title).join(", ");
      setShareText(text);
      setShareURL(window.location.href);
    }
  }, [movies]);

  return (
    <div className="flex gap-3 justify-end">
      <FacebookShareButton url={shareURL} quote={shareText}>
        <FaFacebook />
      </FacebookShareButton>
      <TwitterShareButton url={shareURL} title={shareText}>
        <FaTwitter />
      </TwitterShareButton>
      <WhatsappShareButton url={shareURL} title={shareText}>
        <FaWhatsapp />
      </WhatsappShareButton>
    </div>
  );
};

export default Share;
