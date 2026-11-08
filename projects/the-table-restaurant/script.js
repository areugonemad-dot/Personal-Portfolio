const menuData = [
  { id: 1, category: "starters", name: "Truffle Arancini", price: "₹450", desc: "Crispy arborio rice spheres with wild forest mushrooms and fontina cheese." },
  { id: 2, category: "starters", name: "Smoked Burrata", price: "₹520", desc: "Heirloom tomatoes, basil emulsion, pine nuts, and aged balsamic glaze." },
  { id: 3, category: "mains", name: "Pan-Seared Sea Bass", price: "₹890", desc: "Saffron risotto, crushed buttered peas, and lemon-caper reduction." },
  { id: 4, category: "mains", name: "Braised Lamb Shank", price: "₹950", desc: "Slow-roasted shank, creamy parsnip purée, red wine demi-glace." },
  { id: 5, category: "desserts", name: "Dark Chocolate Fondant", price: "₹380", desc: "Warm 70% dark Belgian cocoa center served with Madagascar vanilla gelato." },
  { id: 6, category: "desserts", name: "Cardamom Panna Cotta", price: "₹340", desc: "Spiced infused silk cream topped with roasted pistachio crumb and berries." }
];

const menuGrid = document.getElementById("menuGrid");
const filterBtns = document.querySelectorAll(".filter-btn");

function renderMenu(items) {
  menuGrid.innerHTML = items
    .map(
      (item) => `
    <article class="dish-card">
      <div class="dish-head">
        <h3>${item.name}</h3>
        <span class="price">${item.price}</span>
      </div>
      <p>${item.desc}</p>
    </article>
  `
    )
    .join("");
}

// Initial render
renderMenu(menuData);

// Filtering logic
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.dataset.category;
    if (category === "all") {
      renderMenu(menuData);
    } else {
      renderMenu(menuData.filter((item) => item.category === category));
    }
  });
});

// Form reservation handling
const bookingForm = document.getElementById("bookingForm");
const bookingConfirmation = document.getElementById("bookingConfirmation");

bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("guestName").value;
  const date = document.getElementById("bookingDate").value;
  const time = document.getElementById("bookingTime").value;
  const count = document.getElementById("guestCount").value;

  bookingConfirmation.textContent = `Reservation reserved for ${name} (${count} guests) on ${date} at ${time}. Confirmation email sent!`;
  bookingForm.reset();
});