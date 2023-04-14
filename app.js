const phonebook = {
	newEl: document.querySelector(".phonebook-new"),
	listEl: document.querySelector(".phonebook-list"),
	formEl: document.querySelector(".phonebook-form"),
	nameEl: document.querySelector(".phonebook-name"),
	photoEl: document.querySelector(".phonebook-photo"),
	searchEl: document.querySelector(".phonebook-search"),
	phonebookBackEl: document.querySelector(".phonebook-back"),
	phonebookInfoEl: document.querySelector(".phonebook-info"),
	phonebookHeaderEl: document.querySelector(".phonebook-header"),
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
			details:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit.Est nobis cumque inventore accusantium iste ab optio, obcaecati delectus doloremque totam non, illum assumenda esse voluptates facilis eius perferendis eligendi omnis.",
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
			details:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Est nobis cumque inventore accusantium iste ab optio, obcaecati delectus doloremque totam non, illum assumenda esse voluptates facilis eius perferendis eligendi omnis.",
			address: "Du-port road",
		},
	],

	remove: function (id) {
		const contacts = this.contacts;

		for (let i = 0; i < contacts.length; i++) {
			if (contacts[i].id === id) {
				contacts.splice(i, 1);

				this.renderAll(contacts);
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

		this.renderAll(this.contacts);

		this.toggleForm();

		this.clearForm();
	},

	get: function (id) {
		return this.contacts.find((contact) => contact.id === id);
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

		this.renderAll(contacts);
	},

	renderAll: function (contacts) {
		this.listEl.innerHTML = "";

		for (let i = 0; i < contacts.length; i++) {
			const contact = contacts[i];

			this.listEl.insertAdjacentHTML(
				"beforeend",
				`
				<li class="list-item" data-id="${contact.id}">
					<span class="list-image">
						<img height="200" src="${this.getImageSrc(contact.photo)}" />
					</span>
					<span class="list-info">
						<p class="list-name">${contact.name}</p>
						<span class="list-numbers">${contact.orangeNumber}/${
					contact.lonestarNumber
				}</span>
					</span>
					<span class="list-actions">
						<span class="delete-item">❌</span>
					</span>
				</li>
			`
			);
		}
	},

	renderOne: function (id) {
		this.toggleList();
		this.toggleInfo();
		this.toggleHeader();
		this.toggleBackBtn();

		const contact = this.get(id);

		if (contact) {
			this.phonebookInfoEl.innerHTML = `
				<div class="info-row row-bio">
					<img class="info-img" height="200" src="${this.getImageSrc(contact.photo)}" />
					<p class="info-name">${contact.name}</p>
					<p class="info-email">${contact.email}</p>
				</div>

				<div class="info-row row-orange">
					<p>Orange Number</p>
					<span>${contact.orangeNumber}</span>
				</div>
				<div class="info-row row-lonestar">
					<p>Lonestar Number</p>
					<span>${contact.lonestarNumber}</span>
				</div>
				<div class="info-row row-dob">
					<p>Date of Birth</p>
					<span
						> ${contact.dob}
					</span>
				</div>
				<div class="info-row row-address">
					<p>Address</p>
					<span
						> ${contact.address}
					</span>
				</div>

				<div class="info-row row-details">
					<p>Details</p>
					<span>
						${contact.details}
					</span>
				</div>
				<div class="info-row row-address">
					<button class="phonebook-btn--large">Edit</button>
				</div>
			`;
		}
	},

	getImageSrc: function (src) {
		return src.length > 0 ? src : "./avatar2.png";
	},

	goBack: function () {},

	toggleList: function () {
		this.listEl.classList.add("hidden");
	},
	toggleBackBtn: function () {
		this.phonebookBackEl.classList.toggle("hidden");
	},

	toggleInfo: function () {
		this.phonebookInfoEl.classList.toggle("hidden");
	},

	toggleHeader: function () {
		this.phonebookHeaderEl.classList.toggle("hidden");
	},

	toggleForm: function () {
		this.toggleList();
		this.toggleBackBtn();
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
		const classList = Array.from(target.classList);

		if (classList.includes("phonebook-new")) {
			this.toggleForm();
			this.toggleTitle();
		}

		if (classList.includes("phonebook-save")) this.store();

		if (
			!classList.includes("delete-item") &&
			target.closest(".list-item")
		) {
			const id = Number(target.closest(".list-item").dataset.id);
			this.renderOne(id);
		}

		if (classList.includes("delete-item")) {
			const id = Number(target.closest(".list-item").dataset.id);
			this.remove(id);
		}

		if (classList.includes("phonebook-back")) this.goBack();
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

		this.renderAll(contacts);
		this.registerListeners();
	},
};

phonebook.init();
