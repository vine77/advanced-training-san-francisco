export default function () {
  return function (key, value) {
    if (arguments.length > 1) this.$data[key] = value;
    return this.$data[key];
  }.property();
}
