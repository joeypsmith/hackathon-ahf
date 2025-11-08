import { openDB } from 'idb';

// Database name and object store name constants
const DB_NAME = 'application-db'; // Name of the database
const STORE_NAME = 'application-store'; // Name of the object store
const FIXED_KEY = 'application'; // Fixed key for storing a single application

// Initialize the IndexedDB database
export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      // Create the object store if it doesn't already exist
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME); // No keyPath or autoIncrement needed
      }
    },
  });
};

// Add or replace the single application
export const setApplication = async (data: {
  demographics?: { name: string; age: number; gender: string };
  medical?: { allergies: string; bloodType: string };
  spouse?: { name: string; age: number };
}) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite'); // Start a readwrite transaction
  await tx.store.put(data, FIXED_KEY); // Use the fixed key to store the application
  await tx.done; // Complete the transaction
};

// Retrieve the single application
export const getApplication = async () => {
  const db = await initDB();
  return db.transaction(STORE_NAME).store.get(FIXED_KEY); // Retrieve the application using the fixed key
};

// Delete the single application
export const deleteApplication = async () => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite'); // Start a readwrite transaction
  await tx.store.delete(FIXED_KEY); // Delete the application using the fixed key
  await tx.done; // Complete the transaction
};

// Update a specific subcategory of the application
export const updateApplicationSubcategory = async (
  subcategory: 'demographics' | 'medical' | 'spouse', // The subcategory to update
  data: any // The new data for the subcategory
) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite'); // Start a readwrite transaction
  const application = await tx.store.get(FIXED_KEY); // Retrieve the existing application

  if (application) {
    application[subcategory] = data; // Update the specific subcategory
    await tx.store.put(application, FIXED_KEY); // Save the updated application back to the store
  } else {
    console.error('No application found to update.'); // Log an error if no application exists
  }

  await tx.done; // Complete the transaction
};

// Example local version for testing
(async () => {
  // Example data
  const exampleData = {
    demographics: { name: 'John Doe', age: 30, gender: 'Male' },
    medical: { allergies: 'Peanuts', bloodType: 'O+' },
    spouse: { name: 'Jane Doe', age: 28 },
  };

  // Save example data to the database
  await setApplication(exampleData);

  // Retrieve and log the application data
  const application = await getApplication();
  console.log('Loaded Application:', application);

  // Update a subcategory
  await updateApplicationSubcategory('medical', { allergies: 'None', bloodType: 'A-' });

  // Retrieve and log the updated application data
  const updatedApplication = await getApplication();
  console.log('Updated Application:', updatedApplication);

  // Delete the application
  await deleteApplication();

  // Verify deletion
  const deletedApplication = await getApplication();
  console.log('Deleted Application:', deletedApplication);
})();