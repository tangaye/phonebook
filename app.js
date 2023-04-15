const phonebook = {
	newEl: document.querySelector(".phonebook-new"),
	listEl: document.querySelector(".phonebook-list"),
	formEl: document.querySelector(".phonebook-form"),
	photoEl: document.querySelector(".phonebook-photo"),
	searchEl: document.querySelector(".phonebook-search"),
	phonebookBackEl: document.querySelector(".phonebook-back"),
	phonebookInfoEl: document.querySelector(".phonebook-info"),
	phonebookSaveEl: document.querySelector(".phonebook-save"),
	phonebookUpdateEl: document.querySelector(".phonebook-update"),
	phonebookHeaderEl: document.querySelector(".phonebook-header"),
	photoPreviewEl: document.querySelector(".phonebook-photo--preview"),
	views: {
		current: "list-contacts",
		list: "list-contacts",
		create: "create-contact",
		info: "view-contact",
		edit: "edit-contact",
	},

	formData: {
		name: document.querySelector(".phonebook-name"),
		orange: document.querySelector(".phonebook-number--orange"),
		lonestar: document.querySelector(".phonebook-number--lonestar"),
		email: document.querySelector(".phonebook-email"),
		address: document.querySelector(".phonebook-address"),
		dob: document.querySelector(".phonebook-dob"),
		details: document.querySelector(".phonebook-details"),
		photoSrc: "",
	},

	contacts: [],

	remove(id) {
		const index = this.contacts.findIndex((contact) => contact.id === id);

		if (index >= 0) {
			this.contacts.splice(index, 1);
			this.renderAll(this.contacts);
		}
	},

	store() {
		const contact = this.getFormData();
		contact.id = this.generateId();

		if (this.valid(contact)) {
			this.contacts.push(contact);

			this.clearForm();
			this.toggleForm();
			this.renderList();
			this.renderAll(this.contacts);
		}
	},

	update(id, data) {
		const contact = this.contacts.find((contact) => contact.id === id);

		if (contact) {
			contact.name = data.name;
			contact.address = data.address;
			contact.orange = data.orange;
			contact.lonestar = data.lonestar;
			contact.details = data.details;
			contact.dob = data.dob;
			contact.email = data.email;
			contact.photo = data.photo;

			this.toggleForm();
			this.renderInfo();
			this.toggleSaveBtn();
			this.toggleUpdateBtn();
			this.renderOne(id);
		}
	},

	get(id) {
		return this.contacts.find((contact) => contact.id === id);
	},

	search() {
		const value = this.searchEl.value.toLowerCase();
		const contacts = this.contacts.filter((contact) => {
			const found =
				contact.name.toLowerCase().includes(value) ||
				contact.email.toLowerCase().includes(value) ||
				contact.orange.includes(value) ||
				contact.lonestar.includes(value) ||
				contact.email.toLowerCase().includes(value);

			if (found) return found;
		});

		this.renderAll(contacts);
	},

	generateId() {
		return Date.now();
	},

	renderAll(contacts) {
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

	renderOne(id) {
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
					<span>${contact.orange}</span>
				</div>
				<div class="info-row row-lonestar">
					<p>Lonestar</p>
					<span>${contact.lonestar}</span>
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
					<button data-id="${
						contact.id
					}" class="phonebook-edit phonebook-btn--large">Edit</button>
				</div>
			`;
		}
	},

	renderEdit(id) {
		const contact = this.get(id);
		this.populateForm(contact);
		this.toggleForm();
		this.toggleSaveBtn();
		this.toggleUpdateBtn();
		this.toggleInfo();
		this.setView(this.views.edit);
	},
	renderCreate() {
		this.clearForm();
		this.toggleForm();
		this.toggleList();
		this.toggleBackBtn();
		this.toggleHeader();
		this.setView(this.views.create);
	},
	renderInfo() {
		this.toggleInfo();
		this.setView(this.views.info);
	},

	renderList() {
		this.toggleBackBtn();
		this.toggleList();
		this.toggleHeader();
		this.renderAll(this.contacts);
		this.setView(this.views.list);
	},

	setView(view) {
		this.views.current = view;
	},

	valid(contact) {
		const numbersValid =
			contact.orange.length > 0 || contact.lonestar.length > 0;
		const nameValid = contact.name.length > 0;

		return numbersValid && nameValid;
	},

	getImageSrc(src) {
		return src.length > 0 ? src : "./avatar2.png";
	},

	goBack() {
		switch (this.views.current) {
			case this.views.info:
				this.toggleInfo();
				this.renderList();
				break;
			case this.views.create:
				this.toggleForm();
				this.renderList();
				break;
			case this.views.edit:
				this.toggleForm();
				this.toggleSaveBtn();
				this.toggleUpdateBtn();
				this.renderInfo();
				break;
		}
	},

	toggleList() {
		this.listEl.classList.toggle("hidden");
	},
	toggleBackBtn() {
		this.phonebookBackEl.classList.toggle("hidden");
	},

	toggleSaveBtn() {
		this.phonebookSaveEl.classList.toggle("hidden");
	},

	toggleUpdateBtn() {
		this.phonebookUpdateEl.classList.toggle("hidden");
	},

	toggleInfo() {
		this.phonebookInfoEl.classList.toggle("hidden");
	},

	toggleHeader() {
		this.phonebookHeaderEl.classList.toggle("hidden");
	},

	toggleForm() {
		this.formEl.classList.toggle("hidden");
	},

	clearForm() {
		this.formData.name.value = "";
		this.formData.address.value = "";
		this.formData.email.value = "";
		this.formData.lonestar.value = "";
		this.formData.orange.value = "";
		this.formData.details.value = "";
		this.formData.dob.value = "";
		this.photoPreviewEl.innerHTML = "";
		this.photoEl.value = "";
	},

	populateForm(contact) {
		this.formData.name.value = contact.name;
		this.formData.address.value = contact.address;
		this.formData.email.value = contact.email;
		this.formData.lonestar.value = contact.lonestar;
		this.formData.orange.value = contact.orange;
		this.formData.details.value = contact.details;
		this.formData.dob.valueAsDate = new Date(contact.dob);
		this.phonebookUpdateEl.dataset.id = contact.id;
		if (contact.photo) this.previewPhoto(contact.photo);
	},

	getFormData() {
		return {
			name: this.formData.name.value,
			address: this.formData.address.value,
			email: this.formData.email.value,
			orange: this.formData.orange.value,
			lonestar: this.formData.lonestar.value,
			details: this.formData.details.value,
			dob: new Date(this.formData.dob.value).toDateString(),
			photo: this.formData.photoSrc,
		};
	},

	previewPhoto(src) {
		this.photoPreviewEl.innerHTML = `<img src="${src}">`;
	},

	handleClickEvent(event) {
		const target = event.target;
		const classList = Array.from(target.classList);

		if (classList.includes("phonebook-new")) this.renderCreate();

		if (classList.includes("phonebook-edit")) {
			const id = Number(target.dataset.id);
			this.renderEdit(id);
		}

		if (classList.includes("phonebook-update")) {
			const id = Number(target.dataset.id);
			const data = this.getFormData();
			this.update(id, data);
		}

		if (classList.includes("phonebook-save")) this.store();

		if (
			!classList.includes("delete-item") &&
			target.closest(".list-item")
		) {
			const id = Number(target.closest(".list-item").dataset.id);
			this.toggleList();
			this.toggleHeader();
			this.toggleBackBtn();
			this.renderInfo();
			this.renderOne(id);
		}

		if (classList.includes("delete-item")) {
			const id = Number(target.closest(".list-item").dataset.id);
			this.remove(id);
		}

		if (classList.includes("phonebook-back")) this.goBack();
	},

	handleKeyUpEvent() {
		this.search();
	},

	handleChangeEvent() {
		const files = this.photoEl.files;
		if (files.length === 0) return;

		const photo = URL.createObjectURL(files[0]);

		this.formData.photoSrc = photo;

		this.previewPhoto(photo);
	},

	registerListeners() {
		document.addEventListener("click", this.handleClickEvent.bind(this));
		document.addEventListener("change", this.handleChangeEvent.bind(this));
		this.searchEl.addEventListener(
			"keyup",
			this.handleKeyUpEvent.bind(this)
		);
	},

	init() {
		const id = this.generateId();

		const contacts = [
			{
				id: id,
				name: "Blama Doe",
				photo: "./avatar2.png",
				orange: "0775002002",
				lonestar: "0886767780",
				email: "blama@example.com",
				dob: new Date("01/02/1993").toDateString(),
				details:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit.Est nobis cumque inventore accusantium iste ab optio, obcaecati delectus doloremque totam non, illum assumenda esse voluptates facilis eius perferendis eligendi omnis.",
				address: "Barnersville",
			},
		];

		this.contacts = contacts;

		this.renderAll(contacts);
		this.registerListeners();
	},
};

phonebook.init();
