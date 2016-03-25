/* jshint node:true */
/* jshint browser:true */

class UIDStore {
  constructor() {
    this.baseUID = 0;
    this.store = [];
  }

  getUID() {
    if (this.store.length === 0) {
      this.baseUID = this.baseUID + 1;
      return this.baseUID;
    }
    return this.store.pop();
  }

  returnUID(uid) {
    this.store.push(uid);
  }
}

export default UIDStore;
