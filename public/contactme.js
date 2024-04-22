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

if (document.getElementById("loginButton")) {
  document.getElementById("loginButton").onclick = login;
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

contactBtn.onclick = function () {
  modal.style.display = "block";
};

// Function to close the modal when clicking the close button (×)
document
  .querySelector(".w3-display-topright")
  .addEventListener("click", function () {
    modal.style.display = "none";
  });

const showEmailResult = async (e) => {
  e.preventDefault();

  const result = document.getElementById("result");
  let response = await getEmailResult();

  if (response.status == 200) {
    result.innerHTML = "Email successfully sent";
  } else {
    result.innerHTML = "Sorry, your email was not sent";
  }
};

const getEmailResult = async () => {
  const form = document.getElementById("contact-form");
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  const result = document.getElementById("result");
  result.innerHTML = "Please wait....";

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    });
    return response;
  } catch (error) {
    console.log(error);
    result.innerHTML = "Sorry, your email could not be sent";
  }
};

document.getElementById("contact-form").onsubmit = showEmailResult;
