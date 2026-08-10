import { useState } from "react";

const AiSettingsSection = () => {
  const [provider, setProvider] = useState("google");
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("");
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="ai-settings">
      <p className="ai-settings_note">
        Fleetr currently uses a built-in AI key for Expand. Bringing your own
        key is coming soon — these fields aren't wired up yet.
      </p>

      <label className="ai-settings_row">
        <div className="ai-settings_row-text">
          <span className="account-row_label">AI Provider</span>
          <span className="account-row_desc">
            Provider used for AI-powered features
          </span>
        </div>
        <select
          className="ai-settings_select"
          value={provider}
          onChange={(event) => setProvider(event.target.value)}
          disabled
        >
          <option value="google">google</option>
          <option value="openai">openai</option>
          <option value="anthropic">anthropic</option>
        </select>
      </label>

      <label className="ai-settings_row">
        <div className="ai-settings_row-text">
          <span className="account-row_label">API Key</span>
          <span className="account-row_desc">
            Your API key for the selected provider
          </span>
        </div>
        <div className="ai-settings_key">
          <input
            type={showKey ? "text" : "password"}
            className="ai-settings_input"
            placeholder="Paste your API key"
            value={apiKey}
            onChange={(event) => setApiKey(event.target.value)}
            disabled
          />
          <button
            type="button"
            className="ai-settings_key-toggle"
            onClick={() => setShowKey((show) => !show)}
            aria-label={showKey ? "Hide API key" : "Show API key"}
          >
            {showKey ? "Hide" : "Show"}
          </button>
        </div>
      </label>

      <label className="ai-settings_row">
        <div className="ai-settings_row-text">
          <span className="account-row_label">Model</span>
          <span className="account-row_desc">
            Model name to use (e.g. gemini-flash-latest)
          </span>
        </div>
        <input
          type="text"
          className="ai-settings_input"
          placeholder="Model name"
          value={model}
          onChange={(event) => setModel(event.target.value)}
          disabled
        />
      </label>
    </div>
  );
};

export default AiSettingsSection;
