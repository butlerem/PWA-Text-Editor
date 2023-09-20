import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Method to add content to the database
export const putDb = async (content) => {
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readwrite');
  tx.store.add({ content });
  await tx.done;
  console.log('Content added to jate database');
};

// Method to get all content from the database
export const getDb = async () => {
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readonly');
  const allContent = await tx.store.getAll();
  await tx.done;
  console.log('Fetched all content from jate database');
  return allContent;
};

initdb();