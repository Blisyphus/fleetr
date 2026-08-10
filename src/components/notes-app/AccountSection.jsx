import { useState } from "react";
import { useAuth } from "../../hooks/useAuth.js";
import { useNotesContext } from "../../hooks/useNotesContext.js";
import { supabase } from "../../lib/supabaseClient.js";

const AccountSection = () => {
  const { user, signIn, signUp, signOut } = useAuth();
  const { refresh } = useNotesContext();

  const [mode, setMode] = useState("register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [syncing, setSyncing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const validate = () => {
    const nextErrors = {};
    if (!email.trim()) nextErrors.email = "Email is required";
    if (!password) nextErrors.password = "Password is required";
    if (mode === "register") {
      if (!confirmPassword) {
        nextErrors.confirmPassword = "Confirm password is required";
      } else if (password && confirmPassword !== password) {
        nextErrors.confirmPassword = "Passwords do not match";
      }
    }
    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setFieldErrors({});
    setFormError(null);
    setMessage(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError(null);
    setMessage(null);

    if (!validate()) return;

    setLoading(true);
    const { data, error } =
      mode === "register"
        ? await signUp(email, password)
        : await signIn(email, password);
    setLoading(false);

    if (error) {
      setFormError(error.message);
      return;
    }

    if (mode === "register" && !data.session) {
      setMessage("Check your email to confirm your account, then sign in.");
    }
  };

  const handleForceSync = async () => {
    setSyncing(true);
    await refresh();
    setSyncing(false);
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    setFormError(null);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;

      const response = await fetch("/api/delete-account", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || "Couldn't delete your account.");
      }

      await signOut();
    } catch (error) {
      setFormError(error.message);
    } finally {
      setDeleting(false);
      setDeleteConfirm(false);
    }
  };

  if (user) {
    return (
      <div className="account-section">
        <div className="account-row">
          <div className="account-row_text">
            <span className="account-row_label">Email</span>
            <span className="account-row_desc">{user.email}</span>
          </div>
          <button
            type="button"
            className="account-row_action"
            onClick={signOut}
          >
            Log out
          </button>
        </div>

        <div className="account-row">
          <div className="account-row_text">
            <span className="account-row_label">Force Sync</span>
            <span className="account-row_desc">
              Sync notes from the cloud to the device
            </span>
          </div>
          <button
            type="button"
            className="account-row_action"
            onClick={handleForceSync}
            disabled={syncing}
          >
            {syncing ? "Syncing..." : "Force sync"}
          </button>
        </div>

        <div className="account-row">
          <div className="account-row_text">
            <span className="account-row_label">Delete Account</span>
            <span className="account-row_desc">
              Delete your account and all your notes
            </span>
          </div>
          {deleteConfirm ? (
            <div className="account-row_confirm">
              <button
                type="button"
                className="account-row_action account-row_action-danger"
                onClick={handleDeleteAccount}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Confirm"}
              </button>
              <button
                type="button"
                className="account-row_action"
                onClick={() => setDeleteConfirm(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="account-row_action account-row_action-danger"
              onClick={() => setDeleteConfirm(true)}
            >
              Delete
            </button>
          )}
        </div>

        {formError && <p className="account-error">{formError}</p>}
      </div>
    );
  }

  return (
    <form className="account-form" onSubmit={handleSubmit}>
      <p className="account-switch">
        {mode === "register" ? (
          <>
            Already have an account?{" "}
            <button
              type="button"
              className="account-switch_link"
              onClick={() => switchMode("signin")}
            >
              Sign in
            </button>
          </>
        ) : (
          <>
            Don't have an account?{" "}
            <button
              type="button"
              className="account-switch_link"
              onClick={() => switchMode("register")}
            >
              Register
            </button>
          </>
        )}
      </p>

      {formError && <p className="account-error">{formError}</p>}
      {message && <p className="account-message">{message}</p>}

      <label className="account-field">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        {fieldErrors.email && (
          <span className="account-field_error">{fieldErrors.email}</span>
        )}
      </label>

      <label className="account-field">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {fieldErrors.password && (
          <span className="account-field_error">{fieldErrors.password}</span>
        )}
      </label>

      {mode === "register" && (
        <label className="account-field">
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          {fieldErrors.confirmPassword && (
            <span className="account-field_error">
              {fieldErrors.confirmPassword}
            </span>
          )}
        </label>
      )}

      <button type="submit" className="account-submit" disabled={loading}>
        {loading
          ? mode === "register"
            ? "Registering..."
            : "Signing in..."
          : mode === "register"
            ? "Register"
            : "Sign in"}
      </button>
    </form>
  );
};

export default AccountSection;
