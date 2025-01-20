// src/components/InitialSetup/InitialSetup.jsx
import React from 'react';

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333'
  },
  subtitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#444'
  },
  list: {
    listStyle: 'none',
    padding: 0
  },
  listItem: {
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center'
  },
  checkmark: {
    marginRight: '10px',
    color: '#4CAF50'
  }
};

const InitialSetup = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Medical Management System</h1>
      <div>
        <h2 style={styles.subtitle}>System Status</h2>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            <span style={styles.checkmark}>✓</span>
            Environment Check
          </li>
	  <li style={styles.listItem}>
            <span style={styles.checkmark}>✓</span>
            Configuration Loaded
          </li>
          <li style={styles.listItem}>
            <span style={styles.checkmark}>✓</span>
            Database Connection
          </li>
          <li style={styles.listItem}>
            <span style={styles.checkmark}>✓</span>
            Authentication System
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InitialSetup;
