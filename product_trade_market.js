Products = new Meteor.Collection("products");

if (Meteor.isClient) {
  Accounts.ui.config({passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'});
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
      var productNameElement = parentElement.find('.product-name')
      var productName = productNameElement.html();
      var valueElement = parentElement.find('.value')
      var value = parseFloat(valueElement.val());

      var product = Products.findOne({name: productName})
      Products.update({_id: product._id}, {name: productName, price: (price + value), winner: name})

      nameElement.val('');
      valueElement.val('0');
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
//    Products.remove()
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
