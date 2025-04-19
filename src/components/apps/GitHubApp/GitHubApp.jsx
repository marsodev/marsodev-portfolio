import React, { useEffect, useState } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../../ui/IconButton/IconButton";
import "./GitHubApp.css";

const GitHubApp = ({ onBackHome }) => {
  const [profile, setProfile] = useState(null);
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    fetch("https://api.github.com/users/marsodev")
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((error) => console.error("Error fetching GitHub profile:", error));

    fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        query: `
        {
          user(login: "marsodev") {
            contributionsCollection {
              contributionCalendar {
                weeks {
                  contributionDays {
                    date
                    contributionCount
                  }
                }
              }
            }
          }
        }
        `,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const weeks =
          result.data.user.contributionsCollection.contributionCalendar.weeks;
        const allDays = weeks.flatMap((week) => week.contributionDays);
        const sortedDays = allDays.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        const last30Days = sortedDays.slice(-30);
        setContributions(last30Days);
      })
      .catch((error) => console.error("Error fetching contributions:", error));
  }, []);

  const getLevel = (count) => {
    if (count >= 20) return 4;
    if (count >= 10) return 3;
    if (count >= 5) return 2;
    if (count >= 1) return 1;
    return 0;
  };

  return (
    <div className="github-app">
      <div className="github-header">
        <IconButton icon={faArrowLeft} onClick={onBackHome} />
        <h2>GitHub</h2>
      </div>

      <div className="github-content">
        {profile ? (
          <>
            <div className="profile-section">
              <img src={profile.avatar_url} alt="Avatar" className="avatar" />
              <h3>{profile.login}</h3>
              <p>{profile.bio}</p>
            </div>

            <div className="stats">
              <div className="stat-card">
                <strong>Repos</strong>
                <span>{profile.public_repos}</span>
              </div>
              <div className="stat-card">
                <strong>Followers</strong>
                <span>{profile.followers}</span>
              </div>
              <div className="stat-card">
                <strong>Following</strong>
                <span>{profile.following}</span>
              </div>
            </div>

            <div className="contribution-section">
              <h3>Last 30 Days Contributions</h3>
              <div className="contribution-grid">
                {contributions.map((day, index) => (
                  <div
                    key={index}
                    className={`day-square level-${getLevel(
                      day.contributionCount
                    )}`}
                    title={`${day.date}: ${day.contributionCount} contribution${
                      day.contributionCount !== 1 ? "s" : ""
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default GitHubApp;
