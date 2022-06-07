$(function () {
    $.ajax({
        type: "GET",        
        headers: { Authorization: 'Bearer ' + userLogged.token },

        url: "http://stm.projectebaleart.com/public/api/songs",
        headers: { Authorization: 'Bearer ' + userLogged.token },
        dataType: "json",
        success: function (response) {
            let availableSongs = [];
            response.forEach(element => {
                availableSongs.push({
                    value: element['name'],
                    label: element['link'],
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
                minLength: 2,
                source: availableSongs,
                create: function() {
                    $(this).data('ui-autocomplete')._renderItem = function(ul, item) {
                      return $('<li>')
                        .append('<div role="button" id="'+item.desc+'" class="searchedUser"><img class="icon" src="' + item.icon + '" /><span class="searchedUser m-2">' + item.value +'</span></div>')
                        .appendTo(ul);
                    };
                  },
                  select: function(event, ui) {
                    console.log(ui.item); 
                    window.parent.document.getElementById('audio').src = ui.item.label;
                    window.parent.document.getElementById('audio').play();
                    window.parent.document.getElementById('navSongImage').src = ui.item.icon;
                    window.parent.document.getElementById('songPicture').value = ui.item.icon;
                    window.parent.document.getElementById('songName').value = ui.item.value;
                    console.log(window.parent.document.getElementById('songName').value);
                    window.parent.document.getElementById('buttonPlay').classList.remove("fa-play");
                    window.parent.document.getElementById('buttonPlay').classList.add("fa-pause");
                    window.parent.document.getElementById('music-container').classList.add('play');  
                    console.log("Cambios las cosas");
                    $(".buttonPlay").removeClass("fa-play");
                    $(".buttonPlay").addClass("fa-pause");
                    $("#songTitle").text(ui.item.value);
                    $(".songImage").attr('src', ui.item.icon);
                }
              });
            jQuery.ui.autocomplete.prototype._resizeMenu = function () {
                var ul = this.menu.element;
                ul.outerWidth(this.element.outerWidth());
            }

        }
    });
});