const phonebook = {
	newEl: document.querySelector(".phonebook-new"),
	listEl: document.querySelector(".phonebook-list"),
	formEl: document.querySelector(".phonebook-form"),
	data: {
		name: document.querySelector(".form-name"),
		email: document.querySelector(".form-email"),
	},

	contacts: [
		{ name: "Mary Doe", email: "blama@gmail.com" },
		{ name: "Konah Doe", email: "konah@gmail.com" },
	],

	store: function () {
		const name = this.data.name.value;
		const email = this.data.email.value;

		if (name.length <= 0 || email.length <= 0) return;

		this.contacts.push({ name: name, email: email });

		this.render();

		this.toggleForm();

		this.clearForm();
	},

	render: function () {
		this.listEl.innerHTML = "";

		for (let i = 0; i < this.contacts.length; i++) {
			this.listEl.insertAdjacentHTML(
				"beforeend",
				`
				<li class="list-item">
					<span class="list-image">
						<img height="200" src="./avatar2.png" />
					</span>
					<span class="list-info">
						<p class="list-name">${this.contacts[i].name}</p>
						<span class="list-email">${this.contacts[i].email}</span>
					</span>
					<span class="list-actions">
						<span class="edit-item">✏️</span>
						<span class="delete-item">❌</span>
					</span>
				</li>
			`
			);
		}
	},

	toggleForm: function () {
		this.listEl.classList.toggle("hidden");
		this.formEl.classList.toggle("hidden");

		this.toggleTitle();
	},

	clearForm: function () {
		this.data.name.value = "";
		this.data.email.value = "";
	},

	toggleTitle: function () {
		this.formEl.classList.contains("hidden")
			? (this.newEl.innerHTML = "➕ Add Contact")
			: (this.newEl.innerHTML = "✖️ Close Form");
	},

	handleClick: function (event) {
		const target = event.target;
		const classes = Array.from(target.classList);

		if (classes.includes("phonebook-new")) {
			this.toggleForm();
			this.toggleTitle();
		}

		if (classes.includes("form-save")) this.store();
	},

	registerHandlers: function () {
		document.addEventListener("click", this.handleClick.bind(this));
	},

	init: function () {
		this.render();
		this.registerHandlers();
	},
};

phonebook.init();
