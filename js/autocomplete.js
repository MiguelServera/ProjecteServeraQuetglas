$(function () {
    $.ajax({
        type: "GET",
        url: "http://stm.projectebaleart.com/public/api/users",
        dataType: "json",
        success: function (response) {
            let availableFollowers = [];
            console.log(response);
            response.forEach(element => {
                availableFollowers.push(element['username']);
            });
            $("#searcher").autocomplete({
                open: function () {
                    $(".ui-autocomplete:visible").css({
                        top: "+=2",
                        left: "-=2"
                    });
                },
                source: availableFollowers
            });

            jQuery.ui.autocomplete.prototype._resizeMenu = function () {
                var ul = this.menu.element;
                ul.outerWidth(this.element.outerWidth());
            }
        }
    });
});