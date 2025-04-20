import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import IconButton from "../../ui/IconButton/IconButton";
import "./SpotifyApp.css";

const SpotifyApp = ({ onBackHome }) => {
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLastFmData = async () => {
      try {
        const res = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=marsodev&api_key=5f3b9f3d81709209a03a8210d48cac5e&format=json&limit=10`
        );
        const data = await res.json();
        setTracks(data.recenttracks.track);

        const preloadImages = data.recenttracks.track.map((track) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = track.image[2]["#text"];
            img.onload = resolve;
            img.onerror = resolve;
          });
        });

        await Promise.all(preloadImages);

        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching Last.fm data:", error);
        setIsLoading(false);
      }
    };

    fetchLastFmData();
  }, []);

  return (
    <div className="spotify-app">
      <div className="spotify-header">
        <IconButton icon={faArrowLeft} onClick={onBackHome} />
        <h2>Spotify</h2>
      </div>

      <div className="spotify-content">
        {isLoading ? (
          <div className="loading-screen">
            <div className="spinner"></div>
            <p>Loading my recent tracks...</p>
          </div>
        ) : (
          <>
            <h3 className="recent-title">Recent Listens</h3>
            <div className="tracks-list">
              {tracks.map((track, index) => {
                const trackName = encodeURIComponent(track.name);
                const artistName = encodeURIComponent(track.artist["#text"]);
                const spotifySearchUrl = `https://open.spotify.com/search/${trackName}%20${artistName}`;

                return (
                  <div key={index} className="track-card">
                    <img
                      src={
                        track.image[2]["#text"] ||
                        "https://via.placeholder.com/64"
                      }
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
                        <FontAwesomeIcon
                          icon={faSpotify}
                          className="spotify-icon"
                        />
                        Listen on Spotify
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SpotifyApp;
