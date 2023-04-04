const formEl = document.querySelector(".form-container");
const newContactEl = document.querySelector(".new-contact");
const contactsEl = document.querySelector(".contacts-container");

document.addEventListener("click", function (event) {
	const target = event.target;
	const classes = Array.from(target.classList);

	if (classes.includes("new-contact")) {
		toggleForm();
		toggleNewContactTitle();
	}
});

function toggleForm() {
	contactsEl.classList.toggle("hidden");
	formEl.classList.toggle("hidden");
}

function toggleNewContactTitle() {
	formEl.classList.contains("hidden")
		? (newContactEl.innerHTML = "➕ Add Contact")
		: (newContactEl.innerHTML = "Close Form");
}
