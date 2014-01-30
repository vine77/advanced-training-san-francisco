export default Em.Object.extend({
  init: function () {
    this.set('identityMap', {});
  },
  getById: function (type, id) {
    id = id.toString(); // Coerce id to string
    var records = this.identityMap[type];
    if (records && records[id]) return records[id];
  },
  push: function (type, payload) {
    if (!payload['id']) throw new Error('Cannot push a record to the store without an id.');
    var id = payload['id'].toString(); // Coerce id to string
    var records = this.identityMap[type] || {};
    var record;
    if (!records[id]) {
      // Create new model record since it doesn't exist yet
      var factory = this.container.lookupFactory('model:' + type);
      record = factory.create({
        //id: id,
        $data: payload
      });
      records[id] = record;
    } else {
      // Update the original record if push is called again: need an identity map
      record = records[id];
      record.$data = payload;
    }
    this.identityMap[type] = records;
    return record;  // Return record
  }
});
