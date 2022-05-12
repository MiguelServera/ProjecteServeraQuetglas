$(function () {
    getFollowersMessages();

    let availableFollowers = [

    ];

    $( "#searchFollower" ).autocomplete({
      open : function(){
          $(".ui-autocomplete:visible").css({top:"+=5",left:"-=6"});
      },
      source: availableFollowers
    });

    jQuery.ui.autocomplete.prototype._resizeMenu = function () {
      var ul = this.menu.element;
      ul.outerWidth(this.element.outerWidth());
    }
});

function insertMessage(){
    $.ajax({
        type: "POST",
        url: "url"+"",
        data: {
            "message":$("#textMessage").val(),
            "user":$("#user").val()
        },
        dataType: "json",
        success: function (response) {
            
        }
    });
}