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
	views: {
		current: "list-contacts",
		list: "list-contacts",
		create: "create-contact",
		info: "view-contact",
		edit: "edit-contact",
	},

	photoSrc: "",

	contacts: [],

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
		const contact = {
			id: this.generateId(),
			name: this.nameEl.value,
			orange: this.orangeNumberEl.value,
			lonestar: this.lonestarNumberEl.value,
			photo: this.photoSrc,
			address: "",
			dob: "",
			details: "",
			email: "",
		};

		if (this.valid(contact)) {
			this.contacts.push(contact);

			this.renderAll(this.contacts);

			this.toggleForm();

			this.clearForm();
		}
	},

	get: function (id) {
		return this.contacts.find((contact) => contact.id === id);
	},

	generateId: function () {
		return Date.now();
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
						<span class="list-numbers">${contact.orange}/${contact.lonestar}</span>
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
					<p>Orange</p>
					<span>${contact.orangeNumber}</span>
				</div>
				<div class="info-row row-lonestar">
					<p>Lonestar</p>
					<span>${contact.lonestarNumber}</span>
				</div>
				<div class="info-row row-dob">
					<p>Dob</p>
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

	setView: function (view) {
		this.views.current = view;
	},

	valid: function (contact) {
		const numbersValid =
			contact.orange.length > 0 || contact.lonestar.length > 0;
		const nameValid = contact.name.length > 0;

		return numbersValid && nameValid;
	},

	getImageSrc: function (src) {
		return src.length > 0 ? src : "./avatar2.png";
	},

	goBack: function () {
		switch (this.views.current) {
			case this.views.info:
				this.toggleInfo();
				this.toggleBackBtn();
				this.toggleList();
				this.toggleHeader();
				this.setView(this.views.list);
				break;
			case this.views.create:
				this.toggleForm();
				this.setView(this.views.list);
				break;
		}
	},

	toggleList: function () {
		this.listEl.classList.toggle("hidden");
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
		this.toggleHeader();

		this.formEl.classList.toggle("hidden");

		this.clearForm();
	},

	clearForm: function () {
		this.nameEl.value = "";
		this.orangeNumberEl.value = "";
		this.lonestarNumberEl.value = "";
		this.photoPreviewEl.innerHTML = "";
		this.photoEl.value = "";
	},

	handleClickEvent: function (event) {
		const target = event.target;
		const classList = Array.from(target.classList);

		if (classList.includes("phonebook-new")) {
			this.toggleForm();
			this.setView(this.views.create);
		}

		if (classList.includes("phonebook-save")) this.store();

		if (
			!classList.includes("delete-item") &&
			target.closest(".list-item")
		) {
			const id = Number(target.closest(".list-item").dataset.id);
			this.renderOne(id);
			this.setView(this.views.info);
		}

		if (classList.includes("delete-item")) {
			const id = Number(target.closest(".list-item").dataset.id);
			this.remove(id);
		}

		if (classList.includes("phonebook-back")) this.goBack();
	},

	handleKeyUpEvent: function () {
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
		const id = this.generateId();
		const contacts = [
			{
				id: id,
				name: "Blama Doe",
				photo: "",
				orange: "0775002002",
				lonestar: "0886767780",
				email: "blama@example.com",
				dob: "01/02/1993",
				details:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit.Est nobis cumque inventore accusantium iste ab optio, obcaecati delectus doloremque totam non, illum assumenda esse voluptates facilis eius perferendis eligendi omnis.",
				address: "Barnersville",
			},
		];

		this.renderAll(contacts);
		this.registerListeners();
	},
};

phonebook.init();
