import attr from 'appkit/microdata/attr'

export default Em.Object.extend({
  id: attr(),
  $mergeChanges: function () {
    var mergedChanges = Ember.$.extend(this.$data, this.$changes);
    this.$changes = null;
    return mergedChanges;
  }
});
