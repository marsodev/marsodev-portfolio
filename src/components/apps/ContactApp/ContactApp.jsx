import React, { useState, useRef, useEffect } from "react";
import { faArrowLeft, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../../ui/IconButton/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";

import "./ContactApp.css";

const firebaseConfig = {
  apiKey: "AIzaSyB89LDj3GswFvRfDVdKnIxcXyOBrtWJT7c",
  authDomain: "marsodev-portfolio.firebaseapp.com",
  projectId: "marsodev-portfolio",
  storageBucket: "marsodev-portfolio.appspot.com",
  messagingSenderId: "204789643546",
  appId: "1:204789643546:web:45678888b1d5a79ea894a3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const ContactApp = ({ onBackHome }) => {
  const [messages, setMessages] = useState([
    {
      fromMe: false,
      text: "Hey ! Tu souhaites me contacter ? Laisse-moi un petit message 😊",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        signInAnonymously(auth).catch((error) => {
          console.error("Erreur Auth Anonyme :", error);
        });
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!currentUser) return;

      try {
        const q = query(
          collection(db, "messages"),
          where("userId", "==", currentUser.uid),
          where("timestamp", ">=", Timestamp.fromDate(new Date(0)))
        );

        const querySnapshot = await getDocs(q);

        const fetchedMessages = querySnapshot.docs
          .map((doc) => ({
            fromMe: true,
            text: doc.data().text,
            timestamp: doc.data().timestamp?.toDate() || new Date(0),
          }))
          .sort((a, b) => a.timestamp - b.timestamp);

        setMessages((prev) => [
          {
            fromMe: false,
            text: "Hey ! Tu souhaites me contacter ? Laisse-moi un petit message 😊",
          },
          ...fetchedMessages,
        ]);
      } catch (error) {
        console.error("Erreur lors de la récupération des messages :", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };

    fetchMessages();
  }, [currentUser]);

  const handleSend = async () => {
    if (!currentUser) {
      setMessages((prev) => [
        ...prev,
        {
          fromMe: false,
          text: "⏳ Connexion en cours... réessaie dans un instant !",
        },
      ]);
      return;
    }

    if (inputValue.trim() === "") return;

    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const q = query(
        collection(db, "messages"),
        where("userId", "==", currentUser.uid),
        where("timestamp", ">=", Timestamp.fromDate(today))
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.size >= 3) {
        setMessages((prev) => [
          ...prev,
          {
            fromMe: false,
            text: "❌ Tu as déjà envoyé 3 messages aujourd'hui.",
          },
        ]);
        return;
      }
      await addDoc(collection(db, "messages"), {
        userId: currentUser.uid,
        text: inputValue.trim(),
        timestamp: Timestamp.now(),
      });

      setMessages((prev) => [
        ...prev,
        { fromMe: true, text: inputValue.trim() },
        { fromMe: false, text: "✅ Message bien reçu !" },
      ]);
      setInputValue("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "44px";
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      setMessages((prev) => [
        ...prev,
        { fromMe: false, text: "❌ Erreur lors de l'envoi du message." },
      ]);
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
        {isLoading ? (
          <div className="loading-screen">
            <div className="spinner"></div>
            <p>Chargement de vos messages...</p>
          </div>
        ) : (
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
            <div ref={messagesEndRef}></div>
          </>
        )}
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
