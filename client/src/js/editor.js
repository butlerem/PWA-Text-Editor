// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from './database';
import { header } from './header';

export default class {
  constructor() {
    const localData = localStorage.getItem('content');

    // check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // Populate the editor with data from IndexedDB if available, else from localStorage
    getDb().then((data) => {
      if (data && data.length > 0) {
        console.info('Loaded data from IndexedDB, injecting into editor');
        this.editor.setValue(data[data.length - 1].content || localData || header);
      } else {
        this.editor.setValue(localData || header);
      }
    }).catch(err => console.error("Error fetching from IndexedDB: ", err));

    // Save to localStorage on each change
    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    // Save to IndexedDB when the editor loses focus
    this.editor.on('blur', async () => {
      console.log('The editor has lost focus');
      await putDb(this.editor.getValue());
    });
  }
}
