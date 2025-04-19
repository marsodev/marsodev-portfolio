import React, { useState, useRef, useEffect } from "react";
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
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (inputValue.trim() === "") return;

    setMessages((prev) => [
      ...prev,
      { fromMe: true, text: inputValue.trim() },
      { fromMe: false, text: "J'ai bien reçu ton message ✅" },
    ]);
    setInputValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "44px";
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);

    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = "auto";

      const baseHeight = 44;
      const scrollHeight = textarea.scrollHeight;

      if (scrollHeight > baseHeight) {
        textarea.style.height = `${Math.min(scrollHeight, 120)}px`;
      } else {
        textarea.style.height = `${baseHeight}px`;
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
        <div ref={messagesEndRef}></div>
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
