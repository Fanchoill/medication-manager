import React, { useState, useEffect } from 'react';

// Utility function for secure local storage
const SecureStorage = {
  // Encrypt data before storing (basic implementation - should be enhanced)
  setItem: (key, value) => {
    const encryptedValue = btoa(JSON.stringify(value)); // Basic encoding
    localStorage.setItem(key, encryptedValue);
  },

  // Decrypt data when retrieving
  getItem: (key) => {
    const item = localStorage.getItem(key);
    if (!item) return null;
    try {
      return JSON.parse(atob(item)); // Basic decoding
    } catch (e) {
      console.error('Error decoding data:', e);
      return null;
    }
  }
};

// Medication Entry Form Component
const MedicationEntryForm = ({ onSave }) => {
  const [medication, setMedication] = useState({
    id: '',
    name: '',
    dosage: '',
    quantity: '',
    expirationDate: '',
    manufacturer: '',
    prescriptionRequired: false,
    notes: '',
    location: '',
    minimumStock: '',
    category: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMed = {
      ...medication,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString()
    };
    onSave(newMed);
    // Reset form
    setMedication({
      id: '',
      name: '',
      dosage: '',
      quantity: '',
      expirationDate: '',
      manufacturer: '',
      prescriptionRequired: false,
      notes: '',
      location: '',
      minimumStock: '',
      category: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Medication Name *
        </label>
        <input
          type="text"
          id="name"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={medication.name}
          onChange={(e) => setMedication({...medication, name: e.target.value})}
        />
      </div>
      
      <div>
        <label htmlFor="dosage" className="block text-sm font-medium text-gray-700">
          Dosage *
        </label>
        <input
          type="text"
          id="dosage"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={medication.dosage}
          onChange={(e) => setMedication({...medication, dosage: e.target.value})}
        />
      </div>

      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
          Quantity *
        </label>
        <input
          type="number"
          id="quantity"
          required
          min="0"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={medication.quantity}
          onChange={(e) => setMedication({...medication, quantity: e.target.value})}
        />
      </div>

      <div>
        <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">
          Expiration Date
        </label>
        <input
          type="date"
          id="expirationDate"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={medication.expirationDate}
          onChange={(e) => setMedication({...medication, expirationDate: e.target.value})}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Save Medication
      </button>
    </form>
  );
};

// Medication List Component
const MedicationList = ({ medications, onDelete, onEdit }) => {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-4">Current Inventory</h2>
      <div className="space-y-4">
        {medications.map(med => (
          <div key={med.id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{med.name}</h3>
                <p className="text-sm text-gray-600">Dosage: {med.dosage}</p>
                <p className="text-sm text-gray-600">Quantity: {med.quantity}</p>
                {med.expirationDate && (
                  <p className="text-sm text-gray-600">
                    Expires: {new Date(med.expirationDate).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => onEdit(med)}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(med.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Database Management Component
const MedicationDatabase = () => {
  const [medications, setMedications] = useState([]);
  const [backupStatus, setBackupStatus] = useState('');

  useEffect(() => {
    // Load medications from secure storage on component mount
    const storedMeds = SecureStorage.getItem('medications');
    if (storedMeds) {
      setMedications(storedMeds);
    }
  }, []);

  const handleSave = (newMedication) => {
    const updatedMeds = [...medications, newMedication];
    setMedications(updatedMeds);
    SecureStorage.setItem('medications', updatedMeds);
  };

  const handleDelete = (id) => {
    const updatedMeds = medications.filter(med => med.id !== id);
    setMedications(updatedMeds);
    SecureStorage.setItem('medications', updatedMeds);
  };

  const handleEdit = (medication) => {
    // Implementation for editing medication
    console.log('Editing medication:', medication);
  };

  const handleBackup = () => {
    try {
      const data = JSON.stringify(medications);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `medication-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setBackupStatus('Backup created successfully!');
    } catch (error) {
      setBackupStatus('Error creating backup: ' + error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Medication Database</h1>
        <button
          onClick={handleBackup}
          className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
        >
          Create Backup
        </button>
        {backupStatus && (
          <p className="mt-2 text-sm text-gray-600">{backupStatus}</p>
        )}
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Add New Medication</h2>
          <MedicationEntryForm onSave={handleSave} />
        </div>
        <div>
          <MedicationList
            medications={medications}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default MedicationDatabase;
