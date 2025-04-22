import React, { useEffect, useState } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../../ui/IconButton/IconButton";

import GitHubProfile from "./GitHubProfile";
import GitHubStats from "./GitHubStats";
import GitHubContributions from "./GitHubContributions";
import LoadingScreen from "./LoadingScreen";

import "./GitHubApp.css";

const GitHubApp = ({ onBackHome }) => {
  const [profile, setProfile] = useState(null);
  const [contributions, setContributions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await fetch("https://api.github.com/users/marsodev");
        const profileData = await profileRes.json();
        setProfile(profileData);

        const contribRes = await fetch("https://api.github.com/graphql", {
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
        });
        const contribData = await contribRes.json();
        const weeks =
          contribData.data.user.contributionsCollection.contributionCalendar
            .weeks;
        const allDays = weeks.flatMap((week) => week.contributionDays);
        const sortedDays = allDays.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        const last30Days = sortedDays.slice(-30);
        setContributions(last30Days);

        setTimeout(() => setIsLoading(false), 1000);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="github-app">
      <div className="github-header">
        <IconButton icon={faArrowLeft} onClick={onBackHome} />
        <h2>GitHub</h2>
      </div>

      <div className="github-content">
        {isLoading ? (
          <LoadingScreen text="Loading my GitHub data..." />
        ) : (
          <>
            <GitHubProfile profile={profile} />
            <GitHubStats profile={profile} />
            <GitHubContributions contributions={contributions} />
          </>
        )}
      </div>
    </div>
  );
};

export default GitHubApp;
