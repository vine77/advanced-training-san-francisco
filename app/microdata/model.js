import attr from 'appkit/microdata/attr'

export default Em.Object.extend({
  id: attr(),
  $mergeChanges: function () {
    return Ember.$.extend(this.$data, this.$changes);
  }
});
