import { Link } from "react-router-dom";
import { useNotesContext } from "../../hooks/useNotesContext.js";
import "./sync-status-card.css";

const formatLastSynced = (date) => {
  if (!date) return "Never";
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 5) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

const SyncStatusCard = () => {
  const { notes, pendingCount, lastSyncedAt } = useNotesContext();
  const syncing = pendingCount > 0;

  return (
    <div className="sync-status">
      <div className="sync-status_header">
        <Link to="/" className="sync-status_brand">
          Fleetr
        </Link>
        <span className="sync-status_version">v0.1.0</span>
      </div>

      <div className="sync-status_row">
        <span className="sync-status_row-label">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h.79a4.5 4.5 0 1 1 0 9Z" />
          </svg>
          Backend
        </span>
        <span className="settings-pill settings-pill-good">
          <span className="settings-pill-dot"></span>
          Operational
        </span>
      </div>
      <div className="sync-status_row">
        <span className="sync-status_row-label">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="23 4 23 10 17 10" />
            <polyline points="1 20 1 14 7 14" />
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
          </svg>
          Sync
        </span>
        <span
          className={
            syncing
              ? "settings-pill settings-pill-idle"
              : "settings-pill settings-pill-good"
          }
        >
          <span className="settings-pill-dot"></span>
          {syncing ? "Syncing" : "Synced"}
        </span>
      </div>

      <div className="sync-status_tiles">
        <div className="settings-stats_tile settings-stats_tile-blue">
          <span className="settings-stats_tile-value">{notes.length}</span>
          <span className="settings-stats_tile-label">Total notes</span>
        </div>
        <div className="settings-stats_tile settings-stats_tile-green">
          <span className="settings-stats_tile-value">{pendingCount}</span>
          <span className="settings-stats_tile-label">Pending sync</span>
        </div>
        <div className="settings-stats_tile settings-stats_tile-gray">
          <span className="settings-stats_tile-value">
            {formatLastSynced(lastSyncedAt)}
          </span>
          <span className="settings-stats_tile-label">Last synced</span>
        </div>
      </div>
    </div>
  );
};

export default SyncStatusCard;
