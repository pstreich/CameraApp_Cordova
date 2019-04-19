/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
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
        document.getElementById("cameraTakePicture").addEventListener
        ("click", cameraTakePicture);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        //this.createDir();
        // document.getElementById("cameraTakePicture").addEventListener
        // ("click", cameraTakePicture);
    },

    createDir2: function(){
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, dir, onDirectoryFail);

        function onDirectoryFail() {
            console.log('Failed because: ');
        }

        function dir(fileSystem){
            var directoryEntry = fileSystem.root;
            var folderName = "AAAABBBBB";

            directoryEntry.getDirectory(folderName, { create: true, exclusive: false }, onDirectorySuccess, onDirectoryFail);

            function onDirectorySuccess() {
                 console.log('success');
                 console.log(directoryEntry.toURL() + "/" + folderName);
              }

            function onDirectoryFail() {
                 console.log('Failed because: ');
              }
        }
    },

    createDir: function(){
        var me=this;
        window.requestFileSystem(window.PERSISTENT, 0, function (fs) {

            console.log('file system open: ' + fs.name);
            me.createDirectory(fs.root);

        }, me.onErrorLoadFs);
    },

    createDirectory: function(rootDirEntry) {
        var me=this;
        album_folder=prompt("Please enter the the name for the Album in which your pictures are stored");
        rootDirEntry.getDirectory('psApp', { create: true }, function (dirEntry) {
            dirEntry.getDirectory(album_folder, { create: true }, function (subDirEntry) {

                //me.createFile(subDirEntry, "mytest.txt");
                console.log("dir created")
                console.log(subDirEntry.fullPath);
                subDirEntry.getImageData()

            }, me.onErrorGetDir);
        }, me.onErrorGetDir);
    },

    createFile: function(dirEntry, fileName, isAppend) {
        me=this;
        // Creates a new file or returns the file if it already exists.
        dirEntry.getFile(fileName, {create: true, exclusive: false}, function(fileEntry) {

            me.writeFile(fileEntry, null, isAppend);

        },me.onErrorGetDir);

    },

    writeFile: function(fileEntry, dataObj) {
        me=this;
        // Create a FileWriter object for our FileEntry (log.txt).
        fileEntry.createWriter(function (fileWriter) {

            fileWriter.onwriteend = function() {
                console.log("Successful file write...");
                me.readFile(fileEntry);
            };

            fileWriter.onerror = function (e) {
                console.log("Failed file write: " + e.toString());
            };

            // If data object is not passed in,
            // create a new Blob instead.
            if (!dataObj) {
                dataObj = new Blob(['some file data'], { type: 'text/plain' });
            }

            fileWriter.write(dataObj);
        });
    },

    readFile: function(fileEntry) {
        me=this
        fileEntry.file(function (file) {
            var reader = new FileReader();

            reader.onloadend = function() {
                console.log("Successful file read: " + this.result);
                console.log(fileEntry.fullPath + ": " + this.result);
                //console.log(fs.root.toURL());
            };

            reader.readAsText(file);

        }, me.onErrorGetDir);
    },

    onErrorLoadFs: function(){
        console.log("...Fehler")
    },

    onErrorGetDir: function(){
                console.log("...Fehler")
    },

    onErrorGetDir: function(){
                console.log("...Fehler")
    }
};

app.initialize();

storage=localStorage;
storage.setItem('albumPicturesCount', "0");


document.getElementById('createAlbumFolder').addEventListener("click", createDir)
function createDir(){
    console.log(storage['album_folder']);
    if(storage['album_folder']){}{
        //var me=this;
        window.requestFileSystem(window.TEMPORARY, 5*1024*1024, function (fs) {

            console.log('file system open: ' + fs.name);
            createDirectory(fs.root);

        }, onErrorLoadFs);
    }
};

function onErrorLoadFs() {
    alert("failed with error code: " + error.code);

};

function createDirectory(rootDirEntry) {
    var me=this;
    album_folder = prompt("Please enter the the name for the Album in which your pictures are stored");
    storage.setItem('album_folder',album_folder);
    rootDirEntry.getDirectory('psApp', { create: true }, function (dirEntry) {
        dirEntry.getDirectory(album_folder, { create: true }, function (subDirEntry) {

            //me.createFile(subDirEntry, "mytest.txt");
            console.log("dir created")
            console.log(subDirEntry.fullPath);

        }, me.onErrorLoadFs);
    }, me.onErrorLoadFs);
};

function onErrorLoadFs() {
    alert("failed with error code: ");

};


function getImageURI(imageURI) {
    console.log(imageURI)
    //fileEntry.getFile(imageURI);
    //moveto(imageData);

    var image = document.getElementById('myImage');
    image.src = "data:image/jpeg;base64," + imageURI;
    //storage.setItem('albumPicturesCount');
    //storage.setItem('albumPictures',pictureName)
    var gotFileEntry = function (fileEntry) {
        var gotFileSystem = function (fileSystem) {
            fileSystem.root.getDirectory('psApp/'+storage['album_folder'], {
                create: false
            }, function (dataDir) {
                storage['albumPicturesCount']=(parseInt(storage['albumPicturesCount'])+1).toString();
                i=storage['albumPicturesCount'];
                fileName = "myImage_"+i+".jpg";
                fileEntry.moveTo(dataDir, fileName, success, fsFail);
            }, dirFail);

        };
        // get file system to copy or move image file to
        window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, gotFileSystem, fsFail);
    };
    // resolve file system for image
    window.resolveLocalFileSystemURL(imageURI, gotFileEntry, fsFail);

    // file system fail
    var fsFail = function (error) {
        alert("failed with error code: " + error.code);
    };

    var dirFail = function (error) {
        alert("Directory error code: " + error.code);

    };

    var success = function () {
        console.log("success");
        console.log()

    };
}




document.getElementById("cameraTakePicture").addEventListener("click", cameraTakePicture);
function cameraTakePicture() {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        saveToPhotoAlbum: true,
    });

        function onSuccess(imageData) {
            console.log(imageData)
            //fileEntry.getFile(imageData);
            //moveto(imageData);
            // var elephant = document.getElementById("myImage");
            //       // var imgCanvas = document.createElement("canvas"),
            //       //     imgContext = imgCanvas.getContext("2d");
            //       //
            //       // imgCanvas.width = elephant.width;
            //       // imgCanvas.height = elephant.height;
            //       //
            //       // imgContext.drawImage(elephant, 0, 0, elephant.width, elephant.height);
            //       // var imgAsDataURL = imgCanvas.toDataURL("image/png");
            //       // try {
            //       //     storage.setItem("elephant", imgAsDataURL);
            //       // }
            //       // catch (e) {
            //       //     console.log("Storage failed: " + e);
            //       // }
            var image = document.getElementById('myImage');
            //var imgAsDataURL = imageData.toDataURL("image/png");
            storage.setItem("myImage",imageData);
            image.src = "data:image/jpeg;base64," + imageData;
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
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

document.getElementById('europ').addEventListener('click', europLoad);
function europLoad(){
    var europeana = require ('europeana') ('KekzT3abT');

// Search
    var params = {
        query: 'et in arcadia ego',
        rows: 5
    };

    europeana ('search', params, console.log);

}