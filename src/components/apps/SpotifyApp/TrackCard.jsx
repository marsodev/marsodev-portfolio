import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

const TrackCard = ({ track }) => {
  const trackName = encodeURIComponent(track.name);
  const artistName = encodeURIComponent(track.artist["#text"]);
  const spotifySearchUrl = `https://open.spotify.com/search/${trackName}%20${artistName}`;

  return (
    <div className="track-card">
      <img
        src={track.image[2]["#text"] || "https://via.placeholder.com/64"}
        alt={track.name}
        className="track-cover"
      />
      <div className="track-info">
        <h3>{track.name}</h3>
        <p>{track.artist["#text"]}</p>
        <a
          href={spotifySearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="listen-button"
        >
          <FontAwesomeIcon icon={faSpotify} className="spotify-icon" />
          Listen on Spotify
        </a>
      </div>
    </div>
  );
};

export default TrackCard;
