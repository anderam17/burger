
$(function () {

  $(".change-devoured").on("click", function(event) {
    var id = $(this).data("id");
    var newDevoured = !($(this).data("newdevoured"));
    console.log(newDevoured);

    var newDevouredState = {devoured: newDevoured};

    //Send the put request
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevouredState
    }).then(
      function() {
        console.log("changed devoured to", newDevoured);
        //reload page to get updated list
        location.reload();
      }
    );
  });

  //submit button functionality
  $(".create-form").on("submit", function(event) {
    event.preventDefault();

    var newBurger = {
      name: $("#bu").val().trim(),
      devoured: 0
    };
    
    //send the POST request
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("created new burger");
        //reload the page to get the updated list
        location.reload();
      }
    );
  });

  //delete button functionality
  $(".delete-burger").on("click", function(event) {
    var id = $(this).data("id");

    //Send the DELETE request
    $.ajax("/api/burgers/" + id, {type: "DELETE"})
    .then(
      function() {
        console.log("deleted burger", id);
        //reload the page to get the updated list
        location.reload();
      }
    );
  });

});