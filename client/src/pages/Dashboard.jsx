import React from 'react';
import './dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        
          <li className="active">📦 Dashboard</li>
          
        <div className="user-info">
          <div className="avatar"></div>
          
        </div>
      </aside>

      <main className="dashboard-main">
        <h1>Dashboard</h1>
        <p className="subtitle">Track your progress and upcoming reviews</p>

        <div className="learning-section">
          <div className="progress-card">
            <h2>Learning Progress</h2>
            <p>Track your learning activity and XP over time</p>
            <div className="tabs">
              <button className="active">Daily</button>
              <button>Weekly</button>
              <button>Monthly</button>
            </div>
            <div className="charts">
              <div className="chart-box">
                <h3>Cards Reviewed</h3>
                <div className="bar-chart"></div>
              </div>
              <div className="chart-box">
                <h3>XP Earned</h3>
                <div className="line-chart"></div>
              </div>
            </div>
          </div>

          <div className="daily-challenge-card">
            <div className="top-row">
              <h2>Daily Challenge</h2>
              <span className="xp-badge">🏅 50 XP</span>
            </div>
            <p>Complete today’s challenge to earn XP and maintain your streak</p>
            <div className="challenge-icon">✨</div>
            <h3>Memory Masters Quiz</h3>
            <p className="challenge-desc">Test your knowledge on famous historical figures and their achievements</p>
            <button className="start-btn">Start Challenge</button>
          </div>
        </div>
      </main>
    </div>
  );
}
