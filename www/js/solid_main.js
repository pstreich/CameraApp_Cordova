
const popupUri = 'popup.html';

$('#login button').click(() => solid.auth.popupLogin({ popupUri}));
$('#logout button').click(() => solid.auth.logout());

solid.auth.trackSession(session => {
    const loggedIn = !!session;
    $('#login').toggle(!loggedIn);
    $('#logout').toggle(loggedIn);
    if(session){
        $('#user').text(session && session.webId);
        if(!$('#profile').val()){
            $('#profile').val(session.webId);
        }
    }
});

const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');
const ldp = $rdf.Namespace('http://www.w3.org/ns/ldp#');
const rss = $rdf.Namespace('http://purl.org/rss/1.0/');
const purl = $rdf.Namespace('http://purl.org/dc/elements/1.1/');
const schema = $rdf.Namespace('http://schema.org/');
const st = $rdf.Namespace('http://www.w3.org/ns/posix/stat#');

$('#view').click(async function loadProfile() {
    //Set up a local data store and associated data fetcher
    const store = $rdf.graph();
    const fetcher = new $rdf.Fetcher(store);

    // Load the person's data into the store
    const person = $('#profile').val();
    const public = 'https://pstreich.solid.community/public/'
    console.log(person);
    await fetcher.load(person);
    await fetcher.load(public);

    console.log(store);
    // Display their details
    const fullName = store.any($rdf.sym(person),FOAF('name'));
    console.log(fullName);
    $('#fullName').text(fullName && fullName.value);

    const public_folders = store.each($rdf.sym(public), ldp('contains'));
    console.log(public_folders);
    $('#folders').empty();
    public_folders.forEach(async (folder) => {
        await fetcher.load(folder);
        $('#folders').append(($('<li>').text(folder.value)));
    });

    // Load/Display friends
    const friends = store.each($rdf.sym(person), FOAF('knows'));
    console.log(friends);
    $('#friends').empty();
    friends.forEach(async (friend) => {
        await fetcher.load(friend);
        const fullName = store.any(friend, FOAF('name'));
        $('#friends').append($('<li>').text(fullName && fullName.value || friend.value));
    });
});

$('#showFile').click(async function showFile(){
    const store = $rdf.graph();
    const fetcher = new $rdf.Fetcher(store);



    const image_folder = 'https://pstreich.solid.community/public/images/'
    const image2 = 'https://pstreich.solid.community/public/images/File2.ttl'
    await fetcher.load(image_folder);
    await fetcher.load(image2);
    console.log(image_folder);
    console.log(image2);
    const link_image2 = store.any($rdf.sym(image2),rss('link'));
    //await fetcher.load(link_image2);
    console.log(link_image2);

    const images = store.each($rdf.sym(image_folder), ldp('contains'));
    console.log(images);
    $('#images').empty;
    images.forEach(async (image) => {
        await fetcher.load(image);
        console.log(image);
        const uri = image.value;
        var body = '<a> <b> <c> .'
        var mimeType= 'text/turtle'
        try{
            $rdf.parse(body,store,uri,mimeType);
            console.log(store);
        } catch(err){
            console.log(err);
        }
        const size = store.each($rdf.sym(image),st('size'));
        console.log(size);
        const link = store.any($rdf.sym(image),rss('link'));
        const friend = store.any($rdf.sym(image), FOAF('knows'))
        //const link2 = store.any(image,schema('thumbnail'));
        // await fetcher.load(link);
        //await fetcher.load(link2);
        console.log(link);
        console.log(friend);
        if(link){
            $('#images').append($('<img src ="'+link.value+'">'));
        }
    })
})

$("form").submit(function(evt){
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    console.log(formData);
    // solid.auth.trackSession(session => {
    //     if(session){
    //         $.ajax({
    //             url: 'https://pstreich.solid.community/public/images/',
    //             type: 'POST',
    //             data: formData,
    //             async: false,
    //             cache: false,
    //             contentType: false,
    //             enctype: 'multipart/form-data',
    //             processData: false,
    //             success: function (response) {
    //                 alert(response);
    //             }
    //         });
    //         return false;
    //     }
    //     else {
    //         console.log('Not logged in');
    //     }
    // });
    solid.auth.fetch('https://pstreich.solid.community/public/images/', {
        method:'POST',
        headers: {
            "Content-Type": "image/jpeg",
            "Content-Length": formData.length,
            "Slug": ".jpg",
        },
        body: formData
    }).then(resp => {
        console.log(resp);
    })
})