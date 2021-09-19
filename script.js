document.getElementById('search-btn').addEventListener('click', function(){
    const searchInput = document.getElementById('search-input').value;
    getSearchResult(searchInput)
})

function getSearchResult(searchInput) {
    fetch(`https://api.lyrics.ovh/suggest/:${searchInput}`)
    .then(res => res.json())
    .then(data => {
        
        let resultArray = data.data;
        resultArray = resultArray.slice(0, 10);
        const resultField = document.getElementById('result-field');
        resultField.innerHTML ='';
        for (let i = 0; i < resultArray.length; i++) {
            const song = resultArray[i];
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="single-result row align-items-center my-3 p-3">
                <div class="col-md-9">
                    <h3 class="lyrics-name" id="lyrics-name">${song.title}</h3>
                    <p class="author lead">Album by <span id="author-details">${song.artist.name}</span></p>
                </div>
                <div class="col-md-3 text-md-right text-center">
                    <button class="btn btn-success" onclick="getLyrics('${song.artist.name}', '${song.title}')">Get Lyrics</button>
                </div>
            </div>
        `;
            resultField.appendChild(div);
        }

    });
}


function getLyrics(artistName, songName) {
    fetch(`https://api.lyrics.ovh/v1/${artistName}/${songName}`)
    .then(res => res.json())
    .then(data => {
        const lyricsCenter = document.getElementById('lyrics-center');
        lyricsCenter.innerText = '';
        lyricsCenter.innerText = data.lyrics;
        console.log(data.lyrics);
    });
}

// getLyrics('Calvin Harris', 'Summer');
