import React from "react";

const GitHubProfile = ({ profile }) => {
  if (!profile) return null;

  return (
    <div className="profile-section">
      <img src={profile.avatar_url} alt="Avatar" className="avatar" />
      <h3>{profile.login}</h3>
      <p>{profile.bio}</p>
    </div>
  );
};

export default GitHubProfile;
