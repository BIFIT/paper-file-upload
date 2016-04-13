'use strict';
new Polymer({
  is: 'paper-file-upload',

  properties: {

    multiple: {
      type: Boolean,
      value: false,
      reflectToAttribute: true
    },

    raised: {
      type: Boolean,
      value: false,
      reflectToAttribute: true
    },

    noink: {
      type: Boolean,
      value: false,
      reflectToAttribute: true
    },

    files: {
      type: Array,
      value: []
    }

  },

  /**
   * Clear
   */
    clear() {
    this.set('files', []);
  },

  /**
   * Event button click
   */
    onButtonClick() {
    const evt = document.createEvent('MouseEvents');
    evt.initEvent('click', true, false);
    this.$.fileInput.dispatchEvent(evt);
  },

  /**
   * Event file change
   */
    onFileChange(e) {

    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      file.progress = 0;
      file.error = false;
      file.complete = false;
      this.push('files', file);
      this._readFile(file);
    }

  },

  /**
   * Read file
   * @param file
   */
    _readFile(file) {

    if (!file) {
      this.fire('error', {error: 'file not found'});

      return;
    }

    const reader = new FileReader();

    reader.readAsText(file);
    reader.onload = e => {
      if (e.target.readyState === FileReader.DONE) {
        try {
          this.fire('success', {result: e.target.result});
        } catch (error) {
          this.fire('error', {error});
        }
      }
    };

    reader.onerror = e => {
      this.fire('error', {error: e});
    };

  }

});
