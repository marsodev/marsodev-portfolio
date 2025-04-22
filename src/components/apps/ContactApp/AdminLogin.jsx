import React from "react";

const AdminLogin = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onLogin,
  onCancel,
  error,
}) => {
  return (
    <div className="admin-login-modal">
      <input
        type="email"
        placeholder="Login admin"
        value={email}
        onChange={onEmailChange}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={onPasswordChange}
      />
      {error && <p className="admin-error">{error}</p>}
      <button onClick={onLogin}>Se connecter</button>
      <button onClick={onCancel}>Annuler</button>
    </div>
  );
};

export default AdminLogin;
