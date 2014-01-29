// Get class with

export default Em.Object.extend({
  init: function () {
    this.set('records', {});
  },
  getById: function (type, id) {
    id = id.toString(); // Coerce id to string
    if (this.records[id]) return this.records[id];
  },
  push: function (type, payload) {
    if (!payload['id']) throw new Error('Cannot push a record to the store without an id.');
    var id = payload['id'].toString(); // Coerce id to string
    var record;
    if (!this.records[id]) {
      // Create new model record since it doesn't exist yet
      var factory = this.container.lookupFactory('model:' + type);
      record = factory.create();
      record.id = id;
      record.$data = payload;
      this.records[id] = record;
    } else {
      // Update the original record if push is called again: need an identity map
      record = this.records[id];
      record.$data = payload;
    }
    return record;  // Return record
  }
});
