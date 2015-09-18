$(function () {
    "use strict";
    
    var jsonToLoad = 'menu.json';

    function loadJson (writeJsonTo) {   

        var jsonObj = new XMLHttpRequest(),
            parsedJson;
        jsonObj.overrideMimeType("application/json");
        jsonObj.open('GET', jsonToLoad, true); 
        jsonObj.onreadystatechange = function () {
            if (jsonObj.readyState == 4 && jsonObj.status == "200") {
                showMenu(jsonObj.responseText);
            } else if (jsonObj.status != "200") {
                initError();
            }
        };
        jsonObj.send(null);  
     }

    function showMenu (objToLoop) {
        var writeTo = $("#secondary_navigation");
        var menuObject = JSON.parse(objToLoop);
        var fullMenuConstruct = '';
        var closeList = false;
        parseMenuList(menuObject.menu);

        function parseMenuList(menu) {
            for (var i=0, len = menu.length; i<len; i++) {
                var id = menu[i].id,
                    description = menu[i].description,
                    content = menu[i].content,
                    cssClass = menu[i].cssClass,
                    leaf = menu[i].leaf;

                fullMenuConstruct += '<li id="'+ id +'"><a href="'+ content +'" class="' + cssClass + '">'+ description +'</a></li>';
                if (closeList && menu.length === (i+1)) {
                    fullMenuConstruct += '</ul>';
                    closeList = false;
                }                
                if (!leaf) {
                    fullMenuConstruct += '<ul class="submenu '+ id +'">';
                    closeList = true;

                    parseMenuList(menu[i].menu);
                }                
            }
        }
        writeTo.append('<ul class="nav_container">' + fullMenuConstruct +'</ul>');
        $(".nav_container li").click(function() {
            var submenuToOpen = $(this).attr("id");
            console.log(submenuToOpen);
            $('.'+ submenuToOpen).slideToggle();
                        return false;
        });        
    }     

    function init () {
        loadJson();
    }

    function initError () {
        console.log('An error has occured while loading the menu!');
    }    

    return init();

});    

