const toggleHamburger = () => {
  document.getElementById("nav-items").classList.toggle("hide");
};
const toggleUser = () => {
  if (document.getElementById("user-info").classList.contains("hide")) {
    console.log("REMOVING");
    document.getElementById("user-info").classList.remove("hide");
  } else {
    console.log("ADDING");
    document.getElementById("user-info").classList.add("hide");
  }
};

const login = () => {
  window.location.href = "home.html";
};

const classic = () => {
  window.location.href = "acdc.html";
};

const grunge = () => {
  window.location.href = "Nirvana.html";
};

if (document.getElementById("loginButton")) {
  document.getElementById("loginButton").onclick = login;
}
if (document.getElementById("grunge-btn")) {
  document.getElementById("grunge-btn").onclick = grunge;
}
if (document.getElementById("classic-btn")) {
  document.getElementById("classic-btn").onclick = classic;
}
if (document.getElementById("hamburger")) {
  document.getElementById("hamburger").onclick = toggleHamburger;
}
if (document.getElementById("user-div")) {
  document.getElementById("user-div").onclick = toggleUser;
}

// Get the contact button element
const contactBtn = document.getElementById("contact-btn");
// Get the modal dialog element
const modal = document.getElementById("dialog");

window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Function to close the modal when clicking the close button (×)
document
  .querySelector(".w3-display-topright")
  .addEventListener("click", function () {
    modal.style.display = "none";
  });

const getAlbums = async () => {
  try {
    return (await fetch("api/music/")).json();
  } catch (error) {
    console.log(error);
  }
};

const showAlbums = async () => {
  const albums = await getAlbums();
  const albumList = document.getElementById("album-list");
  albumList.innerHTML = "";

  const numAlbums = albums.length;
  const numColumns = 4;
  let numPerColumn;
  if (numAlbums % numColumns != 0) {
    numPerColumn = Math.ceil(numAlbums / numColumns);
  } else {
    numPerColumn = Math.ceil(numAlbums / numColumns);
  }
  console.log(numAlbums % numColumns);
  console.log(numPerColumn);

  for (let i = 0; i < numColumns; i++) {
    const albumImagesContainer = document.createElement("div");
    albumImagesContainer.classList.add("columns");

    for (
      let j = i * numPerColumn;
      j < Math.min((i + 1) * numPerColumn, numAlbums);
      j++
    ) {
      const album = albums[j];
      console.log("Album: " + album);
      const imgSect = document.createElement("section");
      imgSect.classList.add("album-image");
      imgSect.classList.add("column");
      albumImagesContainer.append(imgSect);

      // Making the whole section clickable
      const a = document.createElement("a");
      a.href = "#";
      imgSect.append(a);

      const img = document.createElement("img");
      img.classList.add("columns-image");
      img.classList.add("album-image");
      img.src = "images/" + album.img;
      console.log("IMAGE FILE:   " + album.img);
      img.style.width = "90%";
      img.style.height = "auto";
      a.append(img);

      a.onclick = (e) => {
        e.preventDefault();
        displayDetails(album);
      };
    }
    console.log(albumImagesContainer);
    albumList.append(albumImagesContainer);
  }
};

const displayDetails = (album) => {
  document.getElementById("dialog").style.display = "none";

  openDialog("album-details");
  const albumDetails = document.getElementById("album-details");

  albumDetails.innerHTML = "";

  albumDetails.append(document.createElement("br"));

  const image = document.createElement("img");
  console.log("DETAILS:  " + album.img);
  image.src = "images/" + album.img;
  image.style.maxWidth = "50%";
  image.style.height = "auto";
  albumDetails.append(image);

  const h3 = document.createElement("h3");
  h3.innerHTML = album.name + " By: " + album.band;
  albumDetails.append(h3);

  const genre = document.createElement("h3");
  genre.innerHTML = "Genre: " + album.genre;
  albumDetails.append(genre);

  const dLink = document.createElement("a");
  dLink.innerHTML = "&#10008;";
  dLink.style.fontSize = "30px";
  dLink.style.margin = "5px";
  dLink.addEventListener("mouseover", function () {
    dLink.style.cursor = "pointer";
  });

  dLink.addEventListener("mouseout", function () {
    dLink.style.cursor = "default";
  });
  albumDetails.append(dLink);
  dLink.id = "delete-link";

  const eLink = document.createElement("a");
  eLink.innerHTML = "&#9998;";
  eLink.style.fontSize = "30px";
  eLink.style.margin = "5px";
  eLink.addEventListener("mouseover", function () {
    eLink.style.cursor = "pointer";
  });

  eLink.addEventListener("mouseout", function () {
    eLink.style.cursor = "default";
  });
  albumDetails.append(eLink);
  eLink.id = "edit-link";

  albumDetails.append(document.createElement("br"));
  albumDetails.append(document.createElement("br"));
  albumDetails.append(document.createElement("hr"));
  albumDetails.append(document.createElement("br"));

  const date = new Date(album.date);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  albumDetails.append("Release Date: " + formattedDate);

  albumDetails.append(document.createElement("br"));
  albumDetails.append(document.createElement("br"));

  let iframe = document.createElement("iframe");
  console.log(album.link);
  iframe.src = album.link;
  console.log(iframe);
  iframe.width = "60%";
  iframe.height = "80px";
  iframe.title = "Dynamic Iframe";
  albumDetails.append(iframe);
  albumDetails.append(document.createElement("br"));
  const attribution = document.createElement("img");
  attribution.setAttribute("id", "spotify");
  attribution.src = "images/spotify.svg";
  albumDetails.append(attribution);

  albumDetails.append(document.createElement("hr"));

  const songs = document.createElement("h3");
  songs.innerHTML = "Songs on Album: ";
  albumDetails.append(songs);
  const ul = document.createElement("ul");
  albumDetails.append(ul);
  album.songs.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = item;
    ul.append(li);
  });

  albumDetails.append(document.createElement("hr"));

  const members = document.createElement("h3");
  members.innerHTML = "Band Members: ";
  albumDetails.append(members);
  const l = document.createElement("ul");
  albumDetails.append(l);
  album.members.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = item;
    l.append(li);
  });

  albumDetails.append(document.createElement("hr"));

  const description = document.createElement("h3");
  description.innerHTML = "Album Description: ";
  albumDetails.append(description);
  const p = document.createElement("p");
  p.innerHTML = album.description;
  albumDetails.append(p);

  eLink.onclick = showAlbumForm;
  dLink.onclick = deleteAlbum.bind(this, album);

  populateEditForm(album);
};

const populateEditForm = (album) => {
  const form = document.getElementById("album-form");
  form._id.value = album._id;
  form.name.value = album.name;
  form.band.value = album.band;
  form.genre.value = album.genre;
  form.description.value = album.description;
  form.link.value = album.link;
  form.date.value = formatDate(album.date);

  const imgPreview = document.getElementById("img-prev");
  document.getElementById("img-prev").src = "images/" + album.img;
  console.log("ALBUM IMAGE: " + album.img);
  imgPreview.style.display = "block";

  form.originalDate = album.date;

  populateSongs(album.songs);
  populateMembers(album.members);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const populateSongs = (songs) => {
  const section = document.getElementById("songs-boxes");
  songs.forEach((song) => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = song;
    section.append(input);
  });
};
const populateMembers = (members) => {
  const section = document.getElementById("members-boxes");
  members.forEach((member) => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = member;
    section.append(input);
  });
};

const validateAlbum = (formData) => {
  const name = formData.get("name");
  const band = formData.get("band");
  const genre = formData.get("genre");
  const description = formData.get("description");
  const image = formData.get("img"); // Assuming 'img' is the name of the image field

  if (1 === 2) {
    resetForm();
    document.getElementById("dialog").style.display = "none";
    showAlbums();
    return "Name must be at least 3 characters long.";
  }
  if (1 == 2) {
    resetForm();
    document.getElementById("dialog").style.display = "none";
    showAlbums();
    return "Description must be at least 3 characters long.";
  }
  if (1 == 2) {
    return "An image must be selected.";
  }
  return null; // Return null if validation passes
};

const addEditAlbum = async (e) => {
  e.preventDefault();

  const form = document.getElementById("album-form");
  const formData = new FormData(form);
  console.log("FORM ALBUM: " + formData);
  formData.append("songs", getSongs());

  formData.append("members", getMembers());

  const validationError = validateAlbum(formData);

  if (validationError) {
    alert(validationError);
    return;
  }

  let response;

  if (form._id.value.trim() == "") {
    response = await fetch("/api/music", {
      method: "POST",
      body: formData,
    });

    if (response.status === 400) {
      alert(
        "Your addition was not added to the main page because it did not meet: \n1. the ALBUM NAME or DESCRIPTION minimum character requirement of 3\n 2. An image was not input"
      );
    }
  } else {
    const imageInput = document.getElementById("img");
    if (imageInput.files.length === 0) {
      const existingImage = document.getElementById("img-prev").src;
      formData.append("img", existingImage);
    }

    if (!formData.get("date")) {
      formData.append("date", form.originalDate);
    }

    response = await fetch("/api/music/" + form._id.value, {
      method: "PUT",
      body: formData,
    });
  }

  if (response.status != 200) {
    console.log("Add/Edit did not go through to server");
    return;
  }

  await response.json();

  resetForm();
  document.getElementById("dialog").style.display = "none";
  showAlbums();
};

const getSongs = () => {
  const inputs = document.querySelectorAll("#songs-boxes input");
  let songs = [];

  inputs.forEach((input) => {
    songs.push(input.value);
  });

  return songs;
};
const getMembers = () => {
  const inputs = document.querySelectorAll("#members-boxes input");
  let members = [];

  inputs.forEach((input) => {
    members.push(input.value);
  });

  return members;
};

const resetForm = () => {
  const form = document.getElementById("album-form");
  form.reset();
  form._id.value = "";
  document.getElementById("songs-boxes").innerHTML = "";
  document.getElementById("members-boxes").innerHTML = "";
  document.getElementById("img-prev").src = "";
};

const showAlbumForm = (e) => {
  openDialog("album-form");

  if (e.target.getAttribute("id") != "edit-link") {
    resetForm();
  }
};

const deleteAlbum = async (album) => {
  const confirmDelete = confirm("Are you sure you want to delete this album?");

  if (!confirmDelete) {
    return;
  }

  let response = await fetch(`api/music/${album._id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  if (response.status != 200) {
    console.log("DELETE not completed");
    return;
  }

  let result = await response.json();
  resetForm();
  showAlbums();
  document.getElementById("dialog").style.display = "none";
};

const addSong = (e) => {
  e.preventDefault();
  const section = document.getElementById("songs-boxes");
  const input = document.createElement("input");
  input.type = "text";
  section.append(input);
};
const addMember = (e) => {
  e.preventDefault();
  const section = document.getElementById("members-boxes");
  const input = document.createElement("input");
  input.type = "text";
  section.append(input);
};

const openDialog = (id) => {
  document.getElementById("dialog").style.display = "block";
  document.querySelectorAll("#dialog-details > *").forEach((item) => {
    item.classList.add("hidden");
  });
  console.log(document.getElementById(id));
  document.getElementById(id).classList.remove("hidden");
};

showAlbums();
document.getElementById("album-form").onsubmit = addEditAlbum;
document.getElementById("add-link").onclick = showAlbumForm;
document.getElementById("add-song").onclick = addSong;
document.getElementById("add-member").onclick = addMember;
document.getElementById("cancel").onclick = resetForm;

document.getElementById("img").onchange = (e) => {
  if (!e.target.files.length) {
    document.getElementById("img-prev").src = "";
    return;
  }
  document.getElementById("img-prev").src = URL.createObjectURL(
    e.target.files.item(0)
  );
};
