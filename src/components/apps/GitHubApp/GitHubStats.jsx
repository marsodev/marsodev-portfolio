import React from "react";

const GitHubStats = ({ profile }) => {
  if (!profile) return null;

  return (
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
  );
};

export default GitHubStats;
