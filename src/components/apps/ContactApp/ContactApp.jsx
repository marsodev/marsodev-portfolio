import React, { useState, useRef, useEffect } from "react";
import { faArrowLeft, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "../../ui/IconButton/IconButton";
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
import sha256 from "crypto-js/sha256";

import ContactMessages from "./ContactMessages";
import AdminPanel from "./AdminPanel";
import AdminLogin from "./AdminLogin";
import ContactInput from "./ContactInput";
import LoadingScreen from "./LoadingScreen";

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
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminMessages, setAdminMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const textareaRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        signInAnonymously(auth);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!currentUser || isAdmin) return;
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

        setMessages([
          {
            fromMe: false,
            text: "Hey ! Tu souhaites me contacter ? Laisse-moi un petit message 😊",
          },
          ...fetchedMessages,
        ]);
      } finally {
        setTimeout(() => setIsLoading(false), 1000);
      }
    };
    fetchMessages();
  }, [currentUser, isAdmin]);

  const handleSend = async () => {
    if (!currentUser || inputValue.trim() === "" || isSending) return;
    setIsSending(true);
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
        setIsSending(false);
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
      if (textareaRef.current) textareaRef.current.style.height = "44px";
    } finally {
      setIsSending(false);
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

  const handleAdminLogin = async () => {
    try {
      const q = collection(db, "accounts");
      const querySnapshot = await getDocs(q);
      const accounts = querySnapshot.docs.map((doc) => doc.data());
      const enteredHash = sha256(adminPassword).toString();
      const matchedAccount = accounts.find(
        (acc) => acc.email === adminEmail && acc.passwordHash === enteredHash
      );
      if (matchedAccount) {
        setIsAdmin(true);
        fetchAdminMessages();
        setShowAdminLogin(false);
        setAdminError("");
      } else {
        setAdminError("❌ Login ou mot de passe incorrect !");
      }
    } catch {
      setAdminError("❌ Erreur serveur, réessayez.");
    }
  };

  const fetchAdminMessages = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "messages"));
      const fetched = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate() || new Date(0),
      }));
      setAdminMessages(fetched.sort((a, b) => b.timestamp - a.timestamp));
    } catch {}
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setAdminEmail("");
    setAdminPassword("");
    setSelectedMessage(null);
  };

  return (
    <div className="contact-app">
      <div className="contact-header">
        <IconButton
          icon={faArrowLeft}
          onClick={isAdmin ? handleAdminLogout : onBackHome}
        />
        <h2>{isAdmin ? "Admin Panel" : "Contact"}</h2>
        {!isAdmin && (
          <button
            onClick={() => setShowAdminLogin(true)}
            className="admin-button"
          >
            <FontAwesomeIcon icon={faUser} />
            Admin
          </button>
        )}
      </div>

      <div className="contact-messages">
        {isLoading ? (
          <LoadingScreen />
        ) : isAdmin ? (
          <AdminPanel
            adminMessages={adminMessages}
            selectedMessage={selectedMessage}
            onSelect={setSelectedMessage}
            onBack={() => setSelectedMessage(null)}
          />
        ) : (
          <ContactMessages messages={messages} />
        )}
      </div>

      {!isAdmin && (
        <ContactInput
          inputValue={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onSend={handleSend}
          isSending={isSending}
          textareaRef={textareaRef}
        />
      )}

      {showAdminLogin && (
        <AdminLogin
          email={adminEmail}
          password={adminPassword}
          onEmailChange={(e) => setAdminEmail(e.target.value)}
          onPasswordChange={(e) => setAdminPassword(e.target.value)}
          onLogin={handleAdminLogin}
          onCancel={() => {
            setShowAdminLogin(false);
            setAdminError("");
          }}
          error={adminError}
        />
      )}
    </div>
  );
};

export default ContactApp;
