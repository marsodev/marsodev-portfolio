import React from "react";

const ContactMessages = ({ messages }) => {
  return (
    <>
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`message ${msg.fromMe ? "from-me" : "from-them"}`}
        >
          {msg.text.split("\n").map((line, idx) => (
            <span key={idx}>
              {line}
              <br />
            </span>
          ))}
        </div>
      ))}
      <div style={{ height: 30 }}></div>
    </>
  );
};

export default ContactMessages;
