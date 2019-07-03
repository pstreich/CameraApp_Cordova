var userSelection;
storage=localStorage


document.getElementById('subEuropeana').addEventListener('click',showEuropeana)
function showEuropeana(){

    europCall($('#queryEuropeana').val()).done(function(results){
        //results=results.responseJSON;
        console.log(results);

        var $table = $("#example3-container");
        $table.html("");

        // create a row for each art object found
        $.each(results.items, function(index, object) {
            console.log(object);

            var $row = $('<tr class="child"><td class="thumbnail">'
                +'</td><td>'
                + object.title
                +'</td></tr>').appendTo($table);

            $row.find(".thumbnail").append(thumbnail(object));
            userSelection = document.getElementsByClassName('thumb');

            for (var i = 0; i < userSelection.length; i++){
                storage.setItem("url(\"" + object.edmPreview[0].replace("s0", "s128") +"\")",JSON.stringify(object));
                (function(index){
                    userSelection[index].addEventListener('click',createModalView);
                })(i);
            }

            // make each row clickable, navigating to the relevant page on the Rijksmuseum website
        //     $row.on("click", function() {
        //         document.location = object.edmIsShownAt[0];
        //     });
        })
    });
}

function europCall(query){
    return $.getJSON("https://api.europeana.eu/api/v2/search.json?&query=Q&&rows=10&start=1&thumbnail=true&wskey=KekzT3abT".replace('Q',query));
}

function thumbnail(object) {
    return $("<div>")
        .addClass("thumb")
        .css("background-image", "url(" + object.edmPreview[0].replace("s0", "s128") +")");
}




// Get the image and insert it inside the modal - use its "alt" text as a caption
//var img = document.getElementsByClassName("thumb");
function createModalView(){
    var item = JSON.parse(storage.getItem(this.style.backgroundImage));
    console.log(item);
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    modal.style.display = "block";
    modalImg.style.backgroundImage=this.style.backgroundImage;
    modalImg.style.backgroundRepeat="no-repeat";
    modalImg.style.backgroundPosition="center top";
    captionText.innerHTML = item.title;


// Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
}
