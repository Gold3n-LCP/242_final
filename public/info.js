const getJson = async () => {
  const url = "songs.json";
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

const showInfo = async () => {
  let info = await getJson();
  let infoSection = document.getElementById("info-section");

  let index = infoSection.getAttribute("index-id");
  let album = info[index];

  infoSection.append(getHead(album));
  infoSection.append(getInfo(album));
  infoSection.append(getDescription(album));
};

const getHead = (album) => {
  let head = document.createElement("section");
  let h1 = document.createElement("h1");
  h1.innerText = album.album_name;
  let h2 = document.createElement("h2");
  h2.innerText = "By:  " + album.band_name;

  head.append(h1);
  head.append(h2);
  return head;
};

const getDescription = (album) => {
  let description = document.createElement("section");

  let h3 = document.createElement("h3");
  h3.innerText = album.description;

  description.append(h3);
  return description;
};

const getInfo = (album) => {
  let superSection = document.createElement("section");
  superSection.setAttribute("class", "columns");

  let section = document.createElement("div");
  //section.setAttribute("class", "columns");
  section.classList.add("album");
  section.classList.add("column");

  let img = document.createElement("img");
  img.src = "images/" + album.img_name;
  section.append(img);

  let iframe = document.createElement("iframe");
  iframe.src = album.link;
  console.log(iframe);
  iframe.width = "60%";
  iframe.height = "80px";
  iframe.title = "Dynamic Iframe";
  section.append(iframe);
  section.append(document.createElement("br"));
  const attribution = document.createElement("img");
  attribution.setAttribute("id", "spotify");
  attribution.src = "images/spotify.svg";
  section.append(attribution);

  superSection.append(section);
  ////////////////////////////////
  let section2 = document.createElement("div");
  section2.setAttribute("class", "columns");
  section2.classList.add("column");

  let h3 = document.createElement("h3");
  h3.innerText = "Band Members:\n";
  for (let [role, name] of Object.entries(album.band_members)) {
    h3.append(`${role}:  ${name}`);
    h3.appendChild(document.createElement("br"));
  }
  section2.append(h3);
  let songsSection = document.createElement("section");

  let songs = Object.values(album.song_list);
  let list = document.createElement("h3");
  list.innerText = "Song List:\n";
  songs.forEach((song) => {
    // Create a new div for each floorPlan
    //songsSection.classList.add("level-section");

    list.append(song);
    list.appendChild(document.createElement("br"));
  });
  songsSection.append(list);
  section2.append(songsSection);

  superSection.append(section2);

  return superSection;
};

showInfo();
