AddNewSongBySubmit();

function AddNewSongBySubmit(){
    let form = document.getElementById("newSongForm");
    form.addEventListener('submit', async function(e){
        e.preventDefault();

        let url = `http://localhost:5134/api/Songs`;

        let newSong = {
            title: e.target.elements.songTitle.value,
            artist: e.target.elements.songArtist.value
        }
        
        fetch(url).then(function(response){
            return response.json();
        }).then(async function(data){
                try
                {
                    const foundSong = data.find(
                        (data) => data.title.toLowerCase() === newSong.title.toLowerCase() &&
                        data.artist.toLowerCase() === newSong.artist.toLowerCase()
                    )

                    let foundID = foundSong.id;


                    if(foundSong.deleted === true){
                        foundSong.deleted = false;
                        foundSong.favorited = false;

                        await fetch(`${url}/${foundID}`, {
                            // Adding method type
                        method: "PUT",
                        
                        // Adding body or contents to send
                        body: JSON.stringify(foundSong),
                    
                        // Adding headers to the request
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        }
                        })
                        foundSong.deleted = true;

                    }
                    if(foundSong.deleted === false)
                    {
                        alert("Song has already been added");
                    }
                }catch{
                    await fetch("http://localhost:5134/api/Songs", {
                        // Adding method type
                        method: "POST",
                        
                        // Adding body or contents to send
                        body: JSON.stringify({
                            title: newSong.title,
                            artist: newSong.artist,
                        }),
                    
                        // Adding headers to the request
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    })
                }
                location.reload();
            });
        });
}

function CreateNewCard(song){
    document.getElementById("songCards")
    .insertAdjacentHTML("afterbegin",
    `<div class="col-md-4">
        <div class="card mb-4 shadow-sm">
            <div class="card-body">
                <p class="card-text" onClick = "SongEditPopup()">
                <div class = "container p-0">
                    <div class="d-inline">Title:</div>
                    <div class="d-inline" id="text${song.title}">${song.title}</div>
                </div>
                <div class = "container p-0">
                    <div class="d-inline">Artist:</div>
                    <div class="d-inline" id="text${song.artist}">${song.artist}</div>
                </div>
                    <p class="m-0 p-0">Date Added: ${song.dateTimeAdded.toLocaleString().slice(0,10)}</p>
                    <p class="m-0 p-0">Favorited: ${song.favorited}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group" id = "${song.id}">
                            <button type="button" value = "submit" class="btn btn-sm btn-outline-secondary" onClick = "FavoriteASong()" id="favorite">Favorite</button>
                            <button type="button" value = "submit" class="btn btn-sm btn-outline-secondary" onClick = "DeleteASong()" id="delete">Delete</button>
                            <button type="button" value = "submit" class="btn btn-sm btn-outline-secondary" onClick = "EditClick()" id="edit">Edit</button>
                        </div>
                    </div>
                </p>
            </div>
        </div>
    </div>`
    );
}

async function FavoriteASong(){
    let ID = event.target.parentNode.id;
    event.preventDefault();
    const url = `http://localhost:5134/api/Songs/${ID}`;
    await fetch(url).then(function(response){
        return response.json();
    }).then(async function(data){
        data.favorited = !data.favorited;

        await fetch(url, {
                // Adding method type
                method: "PUT",
                
                // Adding body or contents to send
                body: JSON.stringify(data),
            
                // Adding headers to the request
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
        })
        location.reload();
    })
}

async function EditClick(){
    const ID = event.target.parentNode.id;
    const children = event.target.parentNode.parentNode.parentNode.childNodes;
    children[2].childNodes[3].setAttribute("contenteditable","true");
    children[4].childNodes[3].setAttribute("contenteditable","true");

    document.getElementById(`${ID}`)
    .innerHTML = 
    `
        <button type="button" value = "submit" id="submitSongButton" class="btn btn-sm btn-outline-secondary" onClick = "SaveClick()">Save</button>
    `
    
}

async function SaveClick(){
    const ID = event.target.parentNode.id;

    let children = event.target.parentNode.parentNode.parentNode.childNodes;
    const newTitle = children[2].childNodes[3].innerText;
    const newArtist = children[4].childNodes[3].innerText;

    children[2].childNodes[3].setAttribute("contenteditable","false");
    children[4].childNodes[3].setAttribute("contenteditable","false");

    try{
        const url = "http://localhost:5134/api/Songs";
        await fetch(url).then(function(response){
            return response.json();
        }).then(function(data){
            const foundSong = data.find(
                (data) => data.title.toLowerCase() === newTitle.toLowerCase() &&
                data.artist.toLowerCase() === newArtist.toLowerCase()
            )
            
            if(foundSong.deleted != undefined)
            {
                alert("Song already exists or is deleted.\nTry adding it back by submit if you do not see it.")
                children[2].childNodes[3].innerHTML = children[2].childNodes[3].id.slice(4);
                children[4].childNodes[3].innerText = children[4].childNodes[3].id.slice(4);
            }
        })
    }
    catch{
        alert("Works")
        const url = `http://localhost:5134/api/Songs/${ID}`;
        await fetch(url).then(function(response){
            return response.json();
        }).then(function(data){
            data.title = newTitle;
            data.artist = newArtist;

            fetch(url, {
                    // Adding method type
                    method: "PUT",
                    
                    // Adding body or contents to send
                    body: JSON.stringify(data),
                
                    // Adding headers to the request
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
            })
        })
    }
    
    
    
    
    
    document.getElementById(`${ID}`)
    .innerHTML = 
    `
        <button type="button" value = "submit" class="btn btn-sm btn-outline-secondary" onClick = "FavoriteASong()" >Favorite</button>
        <button type="button" value = "submit" class="btn btn-sm btn-outline-secondary" onClick = "DeleteASong()" id="delete">Delete</button>
        <button type="button" value = "submit" class="btn btn-sm btn-outline-secondary" onClick = "EditClick()">Edit</button>
    `
}

async function DeleteASong(){
    let ID = event.target.parentNode.id;
    event.preventDefault();
    const url = `http://localhost:5134/api/Songs/${ID}`;
    await fetch(url).then(function(response){
        return response.json();
    }).then(async function(data){
        data.deleted = !data.deleted;

        await fetch(url, {
                // Adding method type
                method: "PUT",
                
                // Adding body or contents to send
                body: JSON.stringify(data),
            
                // Adding headers to the request
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
        })
        location.reload();
    })
    
}

function WriteAllSongs(){
    const url = 'http://localhost:5134/api/Songs';

    fetch(url).then(function(response){
        return response.json();
    }).then(function(data){

        if(data.length < 1){
            alert("You have no songs yet!")
        }else{
            data.forEach(song => {
                if(song.deleted === false){
                    CreateNewCard(song);
                }
            });
        }
    });
}