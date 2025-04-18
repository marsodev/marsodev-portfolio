import React, { useState, useRef } from "react";
import { faArrowLeft, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../../ui/IconButton/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ContactApp.css";

const ContactApp = ({ onBackHome }) => {
  const [messages, setMessages] = useState([
    {
      fromMe: false,
      text: "Hey ! Tu souhaites me contacter ? Laisse-moi un petit message 😊",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef(null);

  const handleSend = () => {
    if (inputValue.trim() === "") return;

    setMessages((prev) => [
      ...prev,
      { fromMe: true, text: inputValue.trim() },
      { fromMe: false, text: "Votre message a été envoyé ✅" },
    ]);
    setInputValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="contact-app">
      <div className="contact-header">
        <IconButton icon={faArrowLeft} onClick={onBackHome} />
        <h2>Contact</h2>
      </div>

      <div className="contact-messages">
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
      </div>

      <div className="contact-input-area">
        <textarea
          ref={textareaRef}
          className="contact-textarea"
          placeholder="Écris ton message..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <button className="send-button" onClick={handleSend}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default ContactApp;
