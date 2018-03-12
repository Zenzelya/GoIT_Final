var elem = document.querySelector('.masonry__grid');
var msnry = new Masonry( elem, {
    // options
    itemSelector: '.grid__item',
    columnWidth: '.grid__item'
});

function sendRequest(key){
    var request;
    var url = "https://pixabay.com/api/?key=3595589-a093bae71058df520413dfd4f&image_type=photo&pretty=true&per_page=7&orientation=horizontal&q=" + key;

    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    } else {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    request.onreadystatechange = function(data) {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);
            addImage(data);
        }
    };
    request.open("GET", url, true);
    request.send();
}

function addImage(data){
    var items = document.getElementsByClassName("grid__item");

    for(var i = 0; i < data.hits.length; i++){
        items[i].style.background = "url('"+ data.hits[i].webformatURL +"') no-repeat center center"; 
        items[i].style.backgroundSize = "cover";
        items[i].innerHTML = "<p class='grid__paragraph'>"+data.hits[i].tags+"</p>";
    }
}

var firstKey = ["nature", "autumn", "forest", "lake", "village", "city", "ship", "travel", "winter"];
var index = Math.floor(Math.random() * 9);
sendRequest(firstKey[index]);

document.getElementById("search__img").addEventListener("click", function(){
    var key = document.getElementById("masonry__input").value;
    sendRequest(key);
    document.getElementById("masonry__input").value = "";
});






