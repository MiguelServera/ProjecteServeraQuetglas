$(function () {
    $.ajax({
        type: "GET",        
        headers: { Authorization: 'Bearer ' + userLogged.token },

        url: "http://stm.projectebaleart.com/public/api/users",
        dataType: "json",
        success: function (response) {
            let availableFollowers = [];
            response.forEach(element => {
                availableFollowers.push({
                    value: element['username'],
                    label: element['username'],
                    desc: element['id_user'],
                    icon: element['picture']
                });
            });
            $("#searcher").autocomplete({
                open: function () {
                    $(".ui-autocomplete:visible").css({
                        top: "+=2",
                        left: "-=5",
                        padding: "-=2",
                    });
                },
                minLength: 0,
                source: availableFollowers,
                create: function() {
                    $(this).data('ui-autocomplete')._renderItem = function(ul, item) {
                      return $('<li>')
                        .append('<div role="button" id="'+item.desc+'" class="searchedUser"><img class="icon" src="' + item.icon + '" /><span class="searchedUser m-2">' + item.value +'</span></div>')
                        .appendTo(ul);
                    };
                  },
                  select: function(event, ui) {   
                    $("#contenedor").attr('src', 'profile.html?user='+ui.item.desc);
                }
              });
            jQuery.ui.autocomplete.prototype._resizeMenu = function () {
                var ul = this.menu.element;
                ul.outerWidth(this.element.outerWidth());
            }

        }
    });
});