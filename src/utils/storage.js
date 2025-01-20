import { encryptData, decryptData } from './security';

const STORAGE_KEYS = {
  ADMIN: 'medical_admin',
  MEDICATIONS: 'medical_medications',
  SETTINGS: 'medical_settings'
};

export const StorageService = {
  saveAdmin: async (adminData) => {
    const encryptedData = encryptData(adminData);
    localStorage.setItem(STORAGE_KEYS.ADMIN, encryptedData);
  },

  getAdmin: () => {
    const encryptedData = localStorage.getItem(STORAGE_KEYS.ADMIN);
    return encryptedData ? decryptData(encryptedData) : null;
  },

  getUsers: () => {
    const encryptedData = localStorage.getItem(STORAGE_KEYS.USERS);
    return encryptedData ? decryptData(encryptedData) : [];
  },

  saveUsers: (users) => {
    const encryptedData = encryptData(users);
    localStorage.setItem(STORAGE_KEYS.USERS, encryptedData);
  },

  saveMedications: (medications) => {
    const encryptedData = encryptData(medications);
    localStorage.setItem(STORAGE_KEYS.MEDICATIONS, encryptedData);
  },

  getMedications: () => {
    const encryptedData = localStorage.getItem(STORAGE_KEYS.MEDICATIONS);
    return encryptedData ? decryptData(encryptedData) : [];
  },

  clearAll: () => {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  },

  backup: () => {
    const backup = {};
    Object.entries(STORAGE_KEYS).forEach(([key, value]) => {
      backup[key] = localStorage.getItem(value);
    });
    return encryptData(backup);
  },

  restore: (backupData) => {
    try {
      const data = decryptData(backupData);
      Object.entries(data).forEach(([key, value]) => {
        localStorage.setItem(STORAGE_KEYS[key], value);
      });
      return true;
    } catch (error) {
      console.error('Restore failed:', error);
      return false;
    }
  }
};

// Add auto-backup functionality
setInterval(() => {
  const backup = StorageService.backup();
  localStorage.setItem('medical_backup_' + new Date().toISOString(), backup);
}, 1000 * 60 * 60); // Backup every hour
