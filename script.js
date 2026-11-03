
// ===== GET HTML ELEMENTS =====
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const categoryButtons = document.querySelectorAll(".category");
const destinationCards = document.querySelectorAll(".destination-card");
const noResults = document.getElementById("noResults");

const tripForm = document.getElementById("tripForm");
const tripDestination = document.getElementById("tripDestination");
const tripDate = document.getElementById("tripDate");
const travellers = document.getElementById("travellers");
const formMessage = document.getElementById("formMessage");

let selectedCategory = "All";

// ===== SEARCH AND CATEGORY FILTER =====
function filterDestinations() {
    const searchText = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    destinationCards.forEach(function (card) {
        const name = card.dataset.name.toLowerCase();
        const category = card.dataset.category.toLowerCase();

        const matchesSearch =
            name.includes(searchText) ||
            category.includes(searchText);

        const matchesCategory =
            selectedCategory === "All" ||
            card.dataset.category === selectedCategory;

        if (matchesSearch && matchesCategory) {
            card.hidden = false;
            visibleCount++;
        } else {
            card.hidden = true;
        }
    });

    noResults.hidden = visibleCount !== 0;
}

// Search as the user types
searchInput.addEventListener("input", filterDestinations);

// Search button
searchButton.addEventListener("click", filterDestinations);

// Press Enter to search
searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        filterDestinations();
    }
});

// ===== CATEGORY BUTTONS =====
categoryButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        selectedCategory = button.dataset.category;

        categoryButtons.forEach(function (item) {
            item.classList.remove("active");
        });

        button.classList.add("active");

        filterDestinations();
    });
});

// ===== EXPLORE DESTINATION BUTTONS =====
document.querySelectorAll(".details-button").forEach(function (button) {
    button.addEventListener("click", function () {
        const place = button.dataset.place;

        tripDestination.value = place;

        formMessage.textContent =
            place + " selected! Choose your date to plan your trip.";

        formMessage.className = "form-message success";

        document.getElementById("plan").scrollIntoView({
            behavior: "smooth"
        });
    });
});

// ===== SET MINIMUM TRAVEL DATE TO TODAY =====
function getLocalDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return year + "-" + month + "-" + day;
}

tripDate.min = getLocalDate();

// ===== TRIP PLANNING FORM =====
tripForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const destination = tripDestination.value;
    const date = tripDate.value;
    const numberOfTravellers = travellers.value;

    if (!destination || !date || !numberOfTravellers) {
        formMessage.textContent =
            "Please complete all the fields.";

        formMessage.className = "form-message error";
        return;
    }

    if (date < getLocalDate()) {
        formMessage.textContent =
            "Please select today or a future travel date.";

        formMessage.className = "form-message error";
        return;
    }

    const formattedDate = new Date(
        date + "T12:00:00"
    ).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    formMessage.textContent =
        "🎉 Your demo trip to " + destination +
        " is planned for " + formattedDate +
        " for " + numberOfTravellers +
        (numberOfTravellers === "1" ? " traveller!" : " travellers!") +
        " No real booking has been made.";

    formMessage.className = "form-message success";
});

// ===== WELCOME MESSAGE IN CONSOLE =====
console.log("Welcome to Safarika!");
console.log("Explore places. Discover experiences.");
