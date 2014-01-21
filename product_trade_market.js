Products = new Meteor.Collection("products");

if (Meteor.isClient) {
  Template.products.products = function () {
    return Products.find().fetch();
  };

  Template.products.events({
    'click .up' : function (event) {
      var parentElement = $(event.target).closest('tr');
      var priceElement = parentElement.find('.price');
      var price = parseFloat(priceElement.html());
      var nameElement = parentElement.find('.name')
      var name = nameElement.val();
      nameElement.val('');
      var valueElement = parentElement.find('.value')
      var value = parseFloat(valueElement.val());
      valueElement.val('0');
      priceElement.html(price + value)
      var winnerElement = parentElement.find('.winner')
      winnerElement.html(name)
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {

    if (Products.find().count() === 0) {
      var product_values = [
        ["Gold Chandlier", 37],
        ["Silver Spoon", 9],
        ["Mahogony Table", 993],
        ["Wooden Frame", 18]
      ];
      for (var j = 0; j < product_values.length; j++) {
        Products.insert({name: product_values[j][0], price: product_values[j][1]})
      }
    }
  });
}
