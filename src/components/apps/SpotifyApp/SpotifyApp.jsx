import React, { useEffect, useState } from "react";
import IconButton from "../../ui/IconButton/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import TrackCard from "./TrackCard";
import { fetchLastFmRecentTracks } from "./spotifyApi";
import LoadingScreen from "./LoadingScreen";

import "./SpotifyApp.css";

const SpotifyApp = ({ onBackHome }) => {
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTracks = async () => {
      const fetchedTracks = await fetchLastFmRecentTracks();
      setTracks(fetchedTracks);
      setTimeout(() => setIsLoading(false), 1000);
    };
    loadTracks();
  }, []);

  return (
    <div className="spotify-app">
      <div className="spotify-header">
        <IconButton icon={faArrowLeft} onClick={onBackHome} />
        <h2>Spotify</h2>
      </div>

      <div className="spotify-content">
        {isLoading ? (
          <LoadingScreen text="Loading my recent tracks..." />
        ) : (
          <>
            <h3 className="recent-title">Recent Listens</h3>
            <div className="tracks-list">
              {tracks.map((track, index) => (
                <TrackCard key={index} track={track} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SpotifyApp;
