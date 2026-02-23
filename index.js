let isModalOpen = false;
let contrastToggle = false;
const scaleFactor = 1 / 20;

function moveBackground(event) {
  const shapes = document.querySelectorAll(".shape");
  const x = event.clientX * scaleFactor;
  const y = event.clientY * scaleFactor;

  for (let i = 0; i < shapes.length; ++i) {
    const isOdd = i % 2 !== 0;
    const boolInt = isOdd ? -1 : 1;
    shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px)`;
  }
}

function toggleContrast() {
  contrastToggle = !contrastToggle;
  if (contrastToggle) {
    document.body.classList += "dark-theme";
  } else {
    document.body.classList.remove("dark-theme");
  }
}

function contact(event) {
  event.preventDefault();
  const loading = document.querySelector(".modal__overlay--loading");
  const success = document.querySelector(".modal__overlay--success");
  loading.classList += " modal__overlay--visable";

  emailjs
    .sendForm(
      "service_tslm6uj",
      "template_qxbe627",
      event.target,
      "E892NPs1JL09A2C8y"
    )
    .then(() => {
      loading.classList.remove("modal__overlay--visable");
      success.classList += " modal__overlay--visable";
    })
    .catch(() => {
      loading.classList.remove("modal__overlay--visable");
      alert(
        "The email service is temporarly unavailable. Please contact me directly directly on Cmatthew2402@gmail.com"
      );
    });
}

function toggleModal() {
  if (isModalOpen) {
    isModalOpen = false;
    return document.body.classList.remove("modal--open");
  } else isModalOpen = true;
  document.body.classList += " modal--open";
}

// mobile "hover" support: tap card to toggle hover effect
const projectCards = document.querySelectorAll(".project__wrapper");

function closeAllCards(except = null) {
  projectCards.forEach(card => {
    if (card !== except) card.classList.remove("is-active");
  });
}

projectCards.forEach(card => {
  // tap anywhere on card toggles the effect
  card.addEventListener("click", (e) => {
    // if user clicked an actual link/icon, let it behave normally
    if (e.target.closest("a")) return;

    const isActive = card.classList.contains("is-active");
    closeAllCards();
    if (!isActive) card.classList.add("is-active");
  });

  // make it feel instant on touch devices
  card.addEventListener("touchstart", () => {
    closeAllCards(card);
    card.classList.add("is-active");
  }, { passive: true });
});

// tap outside closes
document.addEventListener("click", (e) => {
  if (!e.target.closest(".project__wrapper")) closeAllCards();
});