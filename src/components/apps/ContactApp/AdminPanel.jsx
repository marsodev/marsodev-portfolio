import React from "react";
import IconButton from "../../ui/IconButton/IconButton";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const AdminPanel = ({ adminMessages, selectedMessage, onSelect, onBack }) => {
  if (selectedMessage) {
    return (
      <div className="admin-detail">
        <div className="admin-header">
          <IconButton icon={faArrowLeft} onClick={onBack} />
        </div>
        <div className="admin-message">
          <p className="admin-userid">Utilisateur : {selectedMessage.userId}</p>
          <p className="admin-text">{selectedMessage.text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-list">
        {adminMessages.map((msg) => (
          <div
            key={msg.id}
            className="admin-card"
            onClick={() => onSelect(msg)}
          >
            <div className="admin-content">
              <p className="admin-text-preview">{msg.text.slice(0, 100)}...</p>
              <p className="admin-time">{msg.timestamp.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
