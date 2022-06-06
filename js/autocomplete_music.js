$(function () {
    $.ajax({
        type: "GET",
        url: "http://stm.projectebaleart.com/public/api/songs",
        dataType: "json",
        success: function (response) {
            let availableSongs = [];
            response.forEach(element => {
                availableSongs.push({
                    value: element['name'],
                    label: element['name'],
                    desc: element['id_song'],
                    icon: element['song_picture']
                });
            });
            $("#songSearcher").autocomplete({
                open: function () {
                    $(".ui-autocomplete:visible").css({
                        top: "+=2",
                        left: "-=5",
                        padding: "-=2",
                    });
                },
                minLength: 0,
                source: availableSongs,
                create: function() {
                    $(this).data('ui-autocomplete')._renderItem = function(ul, item) {
                      return $('<li>')
                        .append('<div id="'+item.desc+'" class="searchedUser"><img class="icon" src="' + item.icon + '" /><span class="searchedUser m-2">' + item.value +'</span></div>')
                        .appendTo(ul);
                    };
                  },
                  select: function(event, ui) {
                      console.log(ui.item); 
                    //$("#contenedor").attr('src', 'profile.html?user='+ui.item.desc);
                }
              });
            jQuery.ui.autocomplete.prototype._resizeMenu = function () {
                var ul = this.menu.element;
                ul.outerWidth(this.element.outerWidth());
            }

        }
    });
});