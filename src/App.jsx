import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './styles/App.module.css';
import { StorageService } from './utils/storage';
import { validatePassword, hashPassword } from './utils/security';

// Components for different sections
const AdminSetup = () => {
  const [adminData, setAdminData] = useState({
    username: '',
    password: '',
    email: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add admin creation logic here
    console.log('Creating admin account:', adminData);
  };

  return (
    <div className="admin-setup">
      <h2>Create Administrator Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={adminData.username}
          onChange={(e) => setAdminData({...adminData, username: e.target.value})}
        />
        <input
          type="password"
          placeholder="Password"
          value={adminData.password}
          onChange={(e) => setAdminData({...adminData, password: e.target.value})}
        />
        <input
          type="email"
          placeholder="Email"
          value={adminData.email}
          onChange={(e) => setAdminData({...adminData, email: e.target.value})}
        />
        <button type="submit">Create Admin Account</button>
      </form>
    </div>
  );
};

const MedicationManagement = () => {
  const [medications, setMedications] = useState([]);
  const [newMed, setNewMed] = useState({
    name: '',
    dosage: '',
    frequency: '',
    inventory: 0
  });

  const handleAddMedication = (e) => {
    e.preventDefault();
    setMedications([...medications, newMed]);
    setNewMed({ name: '', dosage: '', frequency: '', inventory: 0 });
  };

  return (
    <div className="medication-management">
      <h2>Medication Management</h2>
      <form onSubmit={handleAddMedication}>
        <input
          type="text"
          placeholder="Medication Name"
          value={newMed.name}
          onChange={(e) => setNewMed({...newMed, name: e.target.value})}
        />
        <input
          type="text"
          placeholder="Dosage"
          value={newMed.dosage}
          onChange={(e) => setNewMed({...newMed, dosage: e.target.value})}
        />
        <input
          type="text"
          placeholder="Frequency"
          value={newMed.frequency}
          onChange={(e) => setNewMed({...newMed, frequency: e.target.value})}
        />
        <input
          type="number"
          placeholder="Initial Inventory"
          value={newMed.inventory}
          onChange={(e) => setNewMed({...newMed, inventory: parseInt(e.target.value)})}
        />
        <button type="submit">Add Medication</button>
      </form>

      <div className="medication-list">
        <h3>Current Medications</h3>
        <ul>
          {medications.map((med, index) => (
            <li key={index}>
              {med.name} - {med.dosage} - {med.frequency} (Stock: {med.inventory})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasAdmin, setHasAdmin] = useState(false);

  useEffect(() => {
    // Check if system is initialized and has admin
    // This would typically check localStorage or a backend
    setIsInitialized(true);
    setHasAdmin(false); // Set to true if admin exists
  }, []);

function App() {
  return (
    <HashRouter>
      <div className="app">
        <Routes>
          <Route 
            path="/" 
            element={
              !isInitialized ? (
                <InitialSetup onComplete={() => setIsInitialized(true)} />
              ) : !hasAdmin ? (
                <AdminSetup onComplete={() => setHasAdmin(true)} />
              ) : (
                <Navigate to="/medications" />
              )
            } 
          />
          <Route path="/medications" element={<MedicationManagement />} />
	  <Route path="/admin/panel" element={<ProtectedRoute isAdmin>
		  <Admin Panel />
	  </ProtectedRoute>
	  } />
        </Routes>
      </div>
    </HashRouter>
  );
}
}

