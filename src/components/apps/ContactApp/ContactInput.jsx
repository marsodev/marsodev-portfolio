import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const ContactInput = ({
  inputValue,
  onChange,
  onKeyDown,
  onSend,
  isSending,
  textareaRef,
}) => {
  return (
    <div className="contact-input-area">
      <textarea
        ref={textareaRef}
        className="contact-textarea"
        placeholder="Écris ton message..."
        value={inputValue}
        onChange={onChange}
        onKeyDown={onKeyDown}
        rows={1}
      />
      <button className="send-button" onClick={onSend} disabled={isSending}>
        {isSending ? (
          <div className="mini-spinner"></div>
        ) : (
          <FontAwesomeIcon icon={faPaperPlane} />
        )}
      </button>
    </div>
  );
};

export default ContactInput;
