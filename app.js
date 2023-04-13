const phonebook = {
	newEl: document.querySelector(".phonebook-new"),
	listEl: document.querySelector(".phonebook-list"),
	formEl: document.querySelector(".phonebook-form"),
	nameEl: document.querySelector(".phonebook-name"),
	photoEl: document.querySelector(".phonebook-photo"),
	searchEl: document.querySelector(".phonebook-search"),
	photoPreviewEl: document.querySelector(".phonebook-photo--preview"),
	orangeNumberEl: document.querySelector(".phonebook-number--orange"),
	lonestarNumberEl: document.querySelector(".phonebook-number--lonestar"),
	photoSrc: "",

	contacts: [
		{
			id: 1,
			name: "Prosper Bowman",
			photo: "",
			orangeNumber: "0775676778",
			lonestarNumber: "0886767780",
			email: "prosper@gmail.com",
			dob: "03/02/2003",
			details: "lorem ldsakfdsfdsafdsfkdsfdsaflkkafaf",
			address: "Barnersville",
		},
		{
			id: 2,
			name: "Sam Morris",
			photo: "",
			orangeNumber: "0775676998",
			lonestarNumber: "0886766880",
			email: "sam@gmail.com",
			dob: "03/02/2003",
			details: "lorem ldsakfdsfdsafdsfkdsfdsaflkkafaf",
			address: "Du-port road",
		},
	],

	remove: function (id) {
		const contacts = this.contacts;

		for (let i = 0; i < contacts.length; i++) {
			if (contacts[i].id === id) {
				contacts.splice(i, 1);

				this.render(contacts);
				return;
			}
		}
	},

	store: function () {
		const name = this.nameEl.value;
		const orange = this.orangeNumberEl.value;
		const lonestar = this.lonestarNumberEl.value;
		const photo = this.photoSrc;

		const invalid =
			name.length <= 0 || orange.length <= 0 || lonestar.length <= 0;

		if (invalid) return;

		this.contacts.push({
			id: this.contacts.length + 1,
			photo: photo,
			name: name,
			orangeNumber: orange,
			lonestarNumber: lonestar,
			address: "",
			dob: "",
			details: "",
			email: "",
		});

		this.render(this.contacts);

		this.toggleForm();

		this.clearForm();
	},

	render: function (contacts) {
		this.listEl.innerHTML = "";

		for (let i = 0; i < contacts.length; i++) {
			const contact = contacts[i];
			const imageSrc =
				contact.photo.length > 0 ? contact.photo : "./avatar2.png";

			this.listEl.insertAdjacentHTML(
				"beforeend",
				`
				<li class="list-item" data-id="${contact.id}">
					<span class="list-image">
						<img height="200" src="${imageSrc}" />
					</span>
					<span class="list-info">
						<p class="list-name">${contact.name}</p>
						<span class="list-numbers">${contact.orangeNumber}/${contact.lonestarNumber}</span>
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

		this.clearForm();
	},

	clearForm: function () {
		this.nameEl.value = "";
		this.orangeNumberEl.value = "";
		this.lonestarNumberEl.value = "";
		this.photoPreviewEl.innerHTML = "";
		this.photoEl.value = "";
	},

	toggleTitle: function () {
		this.formEl.classList.contains("hidden")
			? (this.newEl.innerHTML = "➕")
			: (this.newEl.innerHTML = "✖️");
	},

	handleClickEvent: function (event) {
		const target = event.target;
		const classes = Array.from(target.classList);

		if (classes.includes("phonebook-new")) {
			this.toggleForm();
			this.toggleTitle();
		}

		if (classes.includes("phonebook-save")) this.store();

		if (classes.includes("delete-item")) {
			const id = Number(target.closest(".list-item").dataset.id);
			this.remove(id);
		}
	},

	search() {
		const value = this.searchEl.value.toLowerCase();
		const contacts = this.contacts.filter((contact) => {
			const found =
				contact.name.toLowerCase().includes(value) ||
				contact.email.toLowerCase().includes(value) ||
				contact.orangeNumber.includes(value) ||
				contact.lonestarNumber.includes(value) ||
				contact.email.toLowerCase().includes(value);

			if (found) return found;
		});

		this.render(contacts);
	},

	handleKeyUpEvent: function (event) {
		this.search();
	},

	handleChangeEvent: function () {
		const files = this.photoEl.files;
		if (files.length === 0) return;

		const photo = URL.createObjectURL(files[0]);

		this.photoSrc = photo;

		this.photoPreviewEl.innerHTML = `<img src="${photo}">`;
	},

	registerListeners: function () {
		document.addEventListener("click", this.handleClickEvent.bind(this));
		document.addEventListener("change", this.handleChangeEvent.bind(this));
		this.searchEl.addEventListener(
			"keyup",
			this.handleKeyUpEvent.bind(this)
		);
	},

	init: function () {
		const contacts = this.contacts;

		this.render(contacts);
		this.registerListeners();
	},
};

phonebook.init();
