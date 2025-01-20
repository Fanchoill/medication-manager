// src/components/AdminPanel/AdminPanel.jsx
import React, { useState } from 'react';
import { StorageService } from '../../utils/storage';
import { hashPassword, validatePassword } from '../../utils/security';

const AdminPanel = () => {
  const [backupData, setBackupData] = useState('');
  const [resetPassword, setResetPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [users, setUsers] = useState(StorageService.getUsers() || []);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Backup functionality
  const handleBackup = () => {
    try {
      const backup = StorageService.backup();
      setBackupData(backup);
      setMessage({ text: 'Backup created successfully', type: 'success' });
      
      // Create downloadable file
      const blob = new Blob([backup], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `medical-system-backup-${new Date().toISOString()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setMessage({ text: 'Backup failed: ' + error.message, type: 'error' });
    }
  };

  // Restore functionality
  const handleRestore = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const success = await StorageService.restore(e.target.result);
          if (success) {
            setMessage({ text: 'System restored successfully', type: 'success' });
            // Reload users after restore
            setUsers(StorageService.getUsers() || []);
          } else {
            setMessage({ text: 'Restore failed: Invalid backup data', type: 'error' });
          }
        };
        reader.readAsText(file);
      } catch (error) {
        setMessage({ text: 'Restore failed: ' + error.message, type: 'error' });
      }
    }
  };

  // Password reset functionality
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    
    if (!validatePassword(resetPassword.newPassword)) {
      setMessage({ 
        text: 'New password must meet security requirements: 8+ characters, uppercase, lowercase, number, special character', 
        type: 'error' 
      });
      return;
    }

    if (resetPassword.newPassword !== resetPassword.confirmPassword) {
      setMessage({ text: 'New passwords do not match', type: 'error' });
      return;
    }

    try {
      const admin = StorageService.getAdmin();
      const hashedCurrentPassword = await hashPassword(resetPassword.currentPassword);
      
      if (hashedCurrentPassword === admin.password) {
        const hashedNewPassword = await hashPassword(resetPassword.newPassword);
        await StorageService.saveAdmin({
          ...admin,
          password: hashedNewPassword
        });
        setMessage({ text: 'Password updated successfully', type: 'success' });
        setResetPassword({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setMessage({ text: 'Current password is incorrect', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Password reset failed: ' + error.message, type: 'error' });
    }
  };

  // User management functionality
  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const updatedUsers = users.filter(user => user.id !== userId);
        await StorageService.saveUsers(updatedUsers);
        setUsers(updatedUsers);
        setMessage({ text: 'User deleted successfully', type: 'success' });
      } catch (error) {
        setMessage({ text: 'Failed to delete user: ' + error.message, type: 'error' });
      }
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Control Panel</h2>
      
      {/* Message Display */}
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      {/* Backup & Restore Section */}
      <section className="backup-restore">
        <h3>Backup & Restore</h3>
        <button onClick={handleBackup}>Create Backup</button>
        <div className="restore-section">
          <label htmlFor="restore-file">Restore from backup:</label>
          <input
            type="file"
            id="restore-file"
            accept=".txt"
            onChange={handleRestore}
          />
        </div>
      </section>

      {/* Password Reset Section */}
      <section className="password-reset">
        <h3>Reset Admin Password</h3>
        <form onSubmit={handlePasswordReset}>
          <input
            type="password"
            placeholder="Current Password"
            value={resetPassword.currentPassword}
            onChange={(e) => setResetPassword({
              ...resetPassword,
              currentPassword: e.target.value
            })}
          />
          <input
            type="password"
            placeholder="New Password"
            value={resetPassword.newPassword}
            onChange={(e) => setResetPassword({
              ...resetPassword,
              newPassword: e.target.value
            })}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={resetPassword.confirmPassword}
            onChange={(e) => setResetPassword({
              ...resetPassword,
              confirmPassword: e.target.value
            })}
          />
          <button type="submit">Reset Password</button>
        </form>
      </section>

      {/* User Management Section */}
      <section className="user-management">
        <h3>User Management</h3>
        <div className="users-list">
          {users.map(user => (
            <div key={user.id} className="user-item">
              <span>{user.username}</span>
              <span>{user.email}</span>
              <button 
                onClick={() => handleDeleteUser(user.id)}
                className="delete-button"
              >
                Delete User
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminPanel;
