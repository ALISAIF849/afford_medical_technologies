import { useState } from 'react';

// Define the three notification types we work with
type NotificationType = 'Placement' | 'Result' | 'Event';

// Each notification has an ID, type, message, timestamp, and a viewed flag
type NotificationItem = {
  ID: string;
  Type: NotificationType;
  Message: string;
  Timestamp: string;
  viewed: boolean;
};

// Filter values: show all, filter by type, or show only unread
type FilterValue = 'All' | NotificationType | 'unread';

// Demo notifications serve as fallback content if the API is unavailable
// This ensures the app always shows something useful to the user
const demoNotifications: NotificationItem[] = [
  {
    ID: 'demo-placement-001',
    Type: 'Placement',
    Message: 'Placement drive registration opens for final year students.',
    Timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    viewed: false,
  },
  {
    ID: 'demo-result-001',
    Type: 'Result',
    Message: 'Semester examination results have been published.',
    Timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    viewed: false,
  },
  {
    ID: 'demo-event-001',
    Type: 'Event',
    Message: 'Workshop on career readiness starts tomorrow at 10 AM.',
    Timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
    viewed: false,
  },
  {
    ID: 'demo-placement-002',
    Type: 'Placement',
    Message: 'Company shortlist for aptitude test is now available.',
    Timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    viewed: false,
  },
  {
    ID: 'demo-result-002',
    Type: 'Result',
    Message: 'Internal assessment results are live in the portal.',
    Timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    viewed: false,
  },
  {
    ID: 'demo-event-002',
    Type: 'Event',
    Message: 'Guest lecture on resume building is scheduled this Friday.',
    Timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    viewed: false,
  },
];

// Color scheme for notification types — helps users quickly identify what matters
const typeColors: Record<NotificationType, string> = {
  Placement: '#16a34a', // Green for placements (hiring, internships)
  Result: '#2563eb',    // Blue for results (grades, assessments)
  Event: '#f59e0b',     // Orange for events (workshops, announcements)
};

// Priority scoring algorithm: type matters 30%, recency matters 70%
// This keeps fresh notifications and important types (Placements) at the top
function calculatePriorityScore(notification: NotificationItem) {
  // Type weights: Placements are most important, Results medium, Events lower
  const typeWeight = notification.Type === 'Placement' ? 100 : notification.Type === 'Result' ? 66 : 33;
  // Convert timestamp to minutes old, then scale to 24-hour window
  const ageInMinutes = (Date.now() - new Date(notification.Timestamp).getTime()) / 60000;
  // Newer notifications get higher recency scores (max 70 points)
  const recencyScore = Math.max(0, 70 - (ageInMinutes / (24 * 60)) * 70);
  // Combine: 30% of type weight + 70% of recency score
  return (typeWeight / 100) * 30 + recencyScore;
}

// Format timestamps in a human-readable way (e.g., "May 2, 3:45 PM")
function formatTime(timestamp: string) {
  return new Date(timestamp).toLocaleString([], {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function App() {
  // State: list of all notifications and the current filter
  const [notifications, setNotifications] = useState<NotificationItem[]>(demoNotifications);
  const [filter, setFilter] = useState<FilterValue>('All');

  // Calculate priority score for each notification and sort by score descending
  // This creates the ranked list used in the "Top ranked items" section
  const scored = notifications
    .map((notification) => ({ notification, score: calculatePriorityScore(notification) }))
    .sort((a, b) => b.score - a.score);

  // Count notifications by type and viewed status — used for stat cards
  const unreadCount = notifications.filter((notification) => !notification.viewed).length;
  const placementCount = notifications.filter((notification) => notification.Type === 'Placement').length;
  const resultCount = notifications.filter((notification) => notification.Type === 'Result').length;
  const eventCount = notifications.filter((notification) => notification.Type === 'Event').length;

  // Apply current filter to notifications for display
  const visibleNotifications = notifications.filter((notification) => {
    if (filter === 'unread') return !notification.viewed;
    if (filter === 'All') return true;
    return notification.Type === filter;
  });

  // Toggle the viewed/unread status of a single notification
  const toggleViewed = (id: string) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.ID === id ? { ...notification, viewed: !notification.viewed } : notification,
      ),
    );
  };

  // Reset demo: refresh the demo notifications and mark all as unread
  const refreshDemo = () => {
    setNotifications(demoNotifications.map((notification) => ({ ...notification, viewed: false })));
  };

  // Stat cards display: show counts for each category
  const statCards = [
    { label: 'Placements', value: placementCount, accent: '#16a34a' },
    { label: 'Results', value: resultCount, accent: '#2563eb' },
    { label: 'Events', value: eventCount, accent: '#f59e0b' },
    { label: 'Unread', value: unreadCount, accent: '#0f766e' },
  ];

  // Filter button options: users can filter by type or show unread only
  const filters: Array<{ label: string; value: FilterValue }> = [
    { label: 'All', value: 'All' },
    { label: 'Placements', value: 'Placement' },
    { label: 'Results', value: 'Result' },
    { label: 'Events', value: 'Event' },
    { label: 'Unread Only', value: 'unread' },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '28px',
        background:
          'radial-gradient(circle at top left, rgba(37,99,235,0.16), transparent 28%), radial-gradient(circle at top right, rgba(245,158,11,0.15), transparent 24%), linear-gradient(180deg, #f7fbff 0%, #eef4fb 100%)',
        color: '#0f172a',
      }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px',
            marginBottom: '20px',
          }}
        >
          <section
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '28px',
              padding: '34px',
              color: 'white',
              background:
                'linear-gradient(135deg, rgba(8,47,102,0.98) 0%, rgba(37,99,235,0.92) 52%, rgba(56,189,248,0.9) 100%)',
              boxShadow: '0 24px 60px rgba(15,23,42,0.22)',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                borderRadius: '999px',
                padding: '8px 14px',
                background: 'rgba(255,255,255,0.16)',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Campus Notifications Microservice
            </div>
            <h1 style={{ margin: '18px 0 10px', fontSize: 'clamp(2rem, 5vw, 3.6rem)', lineHeight: 1.02 }}>
              Priority inbox for placements, results, and events
            </h1>
            <p style={{ margin: 0, maxWidth: 680, fontSize: '1.02rem', lineHeight: 1.75, opacity: 0.95 }}>
              A polished, responsive dashboard that keeps the most important campus updates visible first, with quick filters and easy read status toggles.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(115px, 1fr))',
                gap: '12px',
                marginTop: '24px',
              }}
            >
              {statCards.map((card) => (
                <div
                  key={card.label}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '20px',
                    background: 'rgba(255,255,255,0.14)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div style={{ fontSize: '12px', opacity: 0.78 }}>{card.label}</div>
                  <div style={{ marginTop: '4px', fontSize: '2rem', fontWeight: 800 }}>{card.value}</div>
                  <div style={{ marginTop: '8px', height: '3px', borderRadius: 999, background: card.accent }} />
                </div>
              ))}
            </div>
          </section>

          <section
            style={{
              borderRadius: '28px',
              padding: '24px',
              background: 'rgba(255,255,255,0.82)',
              boxShadow: '0 18px 45px rgba(15,23,42,0.12)',
              border: '1px solid rgba(148,163,184,0.18)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.12em', color: '#2563eb', textTransform: 'uppercase' }}>
                  Priority preview
                </div>
                <h2 style={{ margin: '8px 0 0', fontSize: '1.5rem' }}>Top ranked items</h2>
              </div>
              <button
                type="button"
                onClick={refreshDemo}
                style={{
                  border: 'none',
                  borderRadius: '999px',
                  padding: '12px 16px',
                  background: '#0f172a',
                  color: 'white',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 10px 24px rgba(15,23,42,0.2)',
                }}
              >
                Reset demo
              </button>
            </div>

            <div style={{ display: 'grid', gap: '12px', marginTop: '18px' }}>
              {scored.slice(0, 4).map((item, index) => (
                <div
                  key={item.notification.ID}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '20px',
                    background: index % 2 === 0 ? '#f8fbff' : '#ffffff',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'center' }}>
                    <div style={{ fontWeight: 800, color: '#0f172a' }}>{item.notification.Type}</div>
                    <div style={{ color: '#2563eb', fontWeight: 900 }}>#{Math.round(item.score)}</div>
                  </div>
                  <div style={{ marginTop: '8px', color: '#475569', lineHeight: 1.6 }}>{item.notification.Message}</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section
          style={{
            borderRadius: '28px',
            background: 'rgba(255,255,255,0.9)',
            boxShadow: '0 18px 45px rgba(15,23,42,0.1)',
            border: '1px solid rgba(148,163,184,0.16)',
            padding: '24px',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '16px',
              flexWrap: 'wrap',
              marginBottom: '20px',
            }}
          >
            <div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#2563eb', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Notification board
              </div>
              <h2 style={{ margin: '8px 0 0', fontSize: '1.9rem' }}>Placement, result, and event updates</h2>
              <p style={{ margin: '8px 0 0', color: '#64748b' }}>
                Filter the feed and mark items as read. Priority is based on type and recency.
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap',
                background: '#f1f5f9',
                padding: '8px',
                borderRadius: '18px',
              }}
            >
              {filters.map((item) => {
                const active = filter === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setFilter(item.value)}
                    style={{
                      border: 'none',
                      borderRadius: '14px',
                      padding: '10px 14px',
                      cursor: 'pointer',
                      fontWeight: 800,
                      background: active ? '#2563eb' : 'transparent',
                      color: active ? 'white' : '#334155',
                      boxShadow: active ? '0 8px 18px rgba(37,99,235,0.28)' : 'none',
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {visibleNotifications.length > 0 ? (
            <div style={{ display: 'grid', gap: '14px' }}>
              {visibleNotifications.map((notification) => {
                const score = calculatePriorityScore(notification);
                return (
                  <article
                    key={notification.ID}
                    style={{
                      borderRadius: '22px',
                      borderLeft: `6px solid ${typeColors[notification.Type]}`,
                      padding: '18px',
                      background: notification.viewed ? '#f8fafc' : '#eef6ff',
                      boxShadow: '0 10px 25px rgba(15,23,42,0.05)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '7px 12px',
                              borderRadius: '999px',
                              background: `${typeColors[notification.Type]}15`,
                              color: typeColors[notification.Type],
                              fontSize: '12px',
                              fontWeight: 800,
                              textTransform: 'uppercase',
                              letterSpacing: '0.06em',
                            }}
                          >
                            {notification.Type}
                          </span>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '7px 12px',
                              borderRadius: '999px',
                              background: '#dbeafe',
                              color: '#1d4ed8',
                              fontSize: '12px',
                              fontWeight: 800,
                            }}
                          >
                            Priority #{Math.round(score)}
                          </span>
                          {!notification.viewed && (
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '7px 12px',
                                borderRadius: '999px',
                                background: '#fef3c7',
                                color: '#92400e',
                                fontSize: '12px',
                                fontWeight: 800,
                              }}
                            >
                              New
                            </span>
                          )}
                        </div>

                        <h3 style={{ margin: 0, fontSize: '1.08rem', lineHeight: 1.5, color: '#0f172a' }}>
                          {notification.Message}
                        </h3>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '12px', color: '#64748b', fontSize: '0.92rem' }}>
                          <span>📅 {formatTime(notification.Timestamp)}</span>
                          <span>🆔 {notification.ID}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleViewed(notification.ID)}
                        style={{
                          minWidth: '114px',
                          padding: '12px 14px',
                          borderRadius: '16px',
                          border: '1px solid #cbd5e1',
                          background: notification.viewed ? 'white' : '#0f172a',
                          color: notification.viewed ? '#0f172a' : 'white',
                          fontWeight: 800,
                          cursor: 'pointer',
                        }}
                      >
                        {notification.viewed ? 'Mark unread' : 'Mark read'}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div
              style={{
                padding: '28px',
                borderRadius: '22px',
                background: '#f8fafc',
                border: '1px dashed #cbd5e1',
                color: '#475569',
              }}
            >
              No notifications match the current filter.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;