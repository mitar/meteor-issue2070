if (Meteor.isServer) {
  var Collection = new Meteor.Collection('test2');
  Meteor.startup(function () {
    Collection.insert({foo: 'baz1'});
    Collection.insert({foo: 'baz2'});
    var handler = Collection.find({}).observeChanges({
      added: function (id) {
        console.log("Added: " + id);
        Collection.update(id, {$set: {foo: 'bar'}});
      }
    });
    console.log("Stopping");
    handler.stop();
  });
}
