var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        this.load_library();
    },

    // requestAuthorization: function () {
    //
    //     var self = this;
    //
    //     cordova.plugins.photoLibrary.requestAuthorization(
    //       function () {
    //         // Retry
    //         self.loadPhotos();
    //       },
    //       function (err) {
    //         console.log('Error in requestAuthorization: ' + err);
    //
    //         // TODO: explain to user why you need the permission, and continue when he agrees
    //
    //         // Ask user again
    //         self.requestAuthorization();
    //
    //       }, {
    //         read: true,
    //         write: false
    //       }
    //     );
    //
    //   },
    //
    // load_library: function(){
    //   console.log("loading library")
    //   cordova.plugins.photoLibrary.getAlbums(
    //       function (albums) {
    //           albums.forEach(function(album) {
    //             console.log(album.id);
    //             console.log(album.title);
    //           });
    //
    //       },
    //       function (err) {
    //         if (err.startsWith('Permission')) {
    //
    //                   console.log('Please provide the permission');
    //
    //                   // TODO: explain to user why you need the permission, and continue when he agrees
    //
    //                   self.requestAuthorization();
    //         } else { // Real error
    //                             console.log('Error in getLibrary: ' + err);
    //         }
    //       },
    //       { // optional options
    //         thumbnailWidth: 512,
    //         thumbnailHeight: 384,
    //         quality: 0.8,
    //         includeAlbumData: false // default
    //       }
    //   );
    // }

};
app.initialize();

storage=localStorage;
if(!storage['albumPicturesCount']) {
    storage.setItem('albumPicturesCount', "1");
}
console.log(storage['albumPicturesCount']);
storage['albumPicturesCount']=(parseInt(storage['albumPicturesCount'])+3).toString();
console.log(storage['albumPicturesCount']);

// document.addEventListener("deviceready", loadAlbum)
// function loadAlbum(){
//     window.requestFileSystem(window.PERSISTENT, 0, function (fs) {
//         console.log('file system open: ' + fs.name);
//         //me.createDirectory(fs.root);
//         rootDirEntry.getDirectory('psApp', { create: false }, function (dirEntry) {
//             dirEntry.getDirectory(storage['album_folder'], { create: false }, function (subDirEntry) {
//
//                 //me.createFile(subDirEntry, "mytest.txt");
//                 // console.log("dir created")
//                 // console.log(subDirEntry.fullPath);
//                 subDirEntry.fullPath;
//
//             }, me.onErrorGetDir);
//         }, me.onErrorGetDir);
//
//     }, me.onErrorLoadFs);
//
//     function onSuccess(imageURL) {
//         var image = document.getElementById('myImage');
//         image.src = imageURL;
//     }
//     function onFail(message) {
//         alert('Failed because: ' + message);
//     }
//
// }


// document.getElementById("getPic").addEventListener("click", loadGallery)
// function loadGallery(imageURL) {
//     console.log("loading gallery")
// //    var image = document.getElementById('myImage');
// //    image.src = "content://com.android.providers.media.documents/document/"image%3A40703;
//     navigator.camera.getPicture(onSuccess, onFail, {
//          quality: 50,
//          destinationType: Camera.DestinationType.FILE_URI,
//          sourceType: Camera.PictureSourceType.PHOTOLIBRARY
//       });
//     function onSuccess(imageURL) {
//          var image = document.getElementById('myImage');
//          image.src = imageURL;
//        }
//     function onFail(message) {
//           alert('Failed because: ' + message);
//        }
// }
// document.getElementById("ajax").addEventListener('click',loadDoc);
// function loadDoc() {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             document.getElementById("demo").innerHTML = this.responseText;
//         }
//     };
//     xhttp.open("GET", "ajax_info.txt", true);
//     xhttp.send();
// }
$(document).ready(function(){
    $("#ax").click(function(){
        $.ajax({url: "http://192.168.178.65/ajax_info.txt", success: function(result){
                $("#demo").html(result);
                console.log("SUCCESS")
            }});
    });
});


document.getElementById("loadGallery").addEventListener('click',loadGallery)
function loadGallery(){

    var image=document.getElementById("myImage");
    image.src="data:image/jpeg;base64," + storage['myImage'];



    // i=parseInt((storage['albumPicturesCount']).toString());
    // console.log(i);
    // var j;
    // window.requestFileSystem(window.TEMPORARY, 0, function (fs) {
    //     console.log("win created");
    //     fs.root.getDirectory('psApp', { create: false }, function (dirEntry) {
    //         console.log("dir1 created");
    //         dirEntry.getDirectory(storage['album_folder'], { create: false }, function (subDirEntry) {
    //             console.log("dir2 created");
    //             //me.createFile(subDirEntry, "mytest.txt");
    //             // for(j=0;j<i;j++){
    //             //     console.log(j);
    //             //     var para = document.createElement("img");
    //             //     para.setAttribute("id","myImage_"+j);
    //             //     para.setAttribute("src",subDirEntry.fullPath+"/myImage_"+j+".jpg");
    //             //     //var node = document.createTextNode("This is new.");
    //             //     //para.appendChild(node);
    //             //     var element = document.getElementById("appGallery");
    //             //     element.appendChild(para);
    //             // }
    //             var para = document.createElement("img");
    //             para.setAttribute("id","myImage_"+j);
    //             para.setAttribute("src","data:image/jpeg;base64,"+subDirEntry.fullPath+"/myImage_"+j+".jpg");
    //             //var node = document.createTextNode("This is new.");
    //             //para.appendChild(node);
    //             var element = document.getElementById("appGallery");
    //             element.appendChild(para);
    //             console.log("dir created")
    //             console.log(subDirEntry.fullPath);
    //
    //         }, onErrorLoadFs);
    //     }, onErrorLoadFs);
    // }, onErrorLoadFs);
    //
    // function onErrorLoadFs() {
    //     alert("failed with error code: ");
    //
    // };
    // // for(j=0;j<i;j++){
    // //     console.log(j);
    // //     var para = document.createElement("img");
    // //     para.setAttribute("id","myImage_"+j);
    // //     para.setAttribute("src","/data/datapsApp/"+storage['album_folder']+"/myImage_"+j);
    // //     //var node = document.createTextNode("This is new.");
    // //     //para.appendChild(node);
    // //     var element = document.getElementById("appGallery");
    // //     element.appendChild(para);
    // //}
    // console.log("SSSUCCESS_GALLERY");
}


document.getElementById("open_navbar").addEventListener('click',openNav);
function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

document.getElementById("close_navbar").addEventListener('click',closeNav);
/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}