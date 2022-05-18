//https://api.lyrics.ovh/suggest/nirvana

//get our elements
const inputSearch = document.querySelector(".input-search");
const btnSearch = document.querySelector(".btn-search");
const results = document.querySelector(".results");

//add an event when i click the btnSearch
btnSearch.addEventListener("click", function () {
  results.innerHTML = "";
  fetchAPI();
});

//i will create a function that is asynchronious that will call API(url that i want to get data from)
//i will display it in the log

async function fetchAPI() {
  try {
    const req = await fetch(
      `https://api.lyrics.ovh/suggest/${inputSearch.value}`
    );
    const res = await req.json();
    displayResult(res.data);
  } catch (err) {
    console.log(err.message);
  }
}

//function that after fetching the data display on the result div

function displayResult(songs) {
  console.log(songs);
  const ul = document.createElement("ul");
  //i need to iterate my songs and append those songs to my list of results
  //i need to append that list of results to my results section
  songs.forEach((song) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    const btnLyrics = document.createElement("button");
    a.innerHTML = `<strong>${song.artist.name}</strong> - ${song.title}`;
    btnLyrics.classList.add("btn-lyrics");
    btnLyrics.innerText = `Get Lyrics`;

    btnLyrics.addEventListener("click", function () {
      getLyrics(song.artist.name, song.title);
    });
    li.appendChild(a);
    li.appendChild(btnLyrics);
    ul.appendChild(li);
  });
  results.appendChild(ul);
}

// function that will get lyrics

async function getLyrics(artist, songTitle) {
  const req = await fetch(`https://api.lyrics.ovh/v1/${artist}/${songTitle}`);
  const res = await req.json();
  console.log(res);
  res.lyrics;

  if (res.error) {
    results.innerHTML = res.error;
  } else {
    results.innerHTML = "";
    results.innerHTML = res.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");
  }
}
