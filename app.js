const phonebook = {
	newEl: document.querySelector(".phonebook-new"),
	listEl: document.querySelector(".phonebook-list"),
	formEl: document.querySelector(".phonebook-form"),
	nameEl: document.querySelector(".phonebook-name"),
	photoEl: document.querySelector(".phonebook-photo"),
	photoPreviewEl: document.querySelector(".phonebook-photo--preview"),
	orangeNumberEl: document.querySelector(".phonebook-number--orange"),
	lonestarNumberEl: document.querySelector(".phonebook-number--lonestar"),
	photoSrc: "",

	contacts: [
		{
			photo: "",
			name: "Mary Doe",
			orangeNumber: "0778909090",
			lonestarNumber: "0886787990",
		},
		{
			photo: "",
			name: "Konah Doe",
			orangeNumber: "0778909090",
			lonestarNumber: "0886787990",
		},
	],

	store: function () {
		const name = this.nameEl.value;
		const orange = this.orangeNumberEl.value;
		const lonestar = this.lonestarNumberEl.value;
		const photo = this.photoSrc;

		const invalid =
			name.length <= 0 || orange.length <= 0 || lonestar.length <= 0;

		if (invalid) return;

		this.contacts.push({
			photo: photo,
			name: name,
			orangeNumber: orange,
			lonestarNumber: lonestar,
		});

		this.render();

		this.toggleForm();

		this.clearForm();
	},

	render: function () {
		this.listEl.innerHTML = "";

		for (let i = 0; i < this.contacts.length; i++) {
			const contact = this.contacts[i];
			const imageSrc =
				contact.photo.length > 0 ? contact.photo : "./avatar2.png";

			this.listEl.insertAdjacentHTML(
				"beforeend",
				`
				<li class="list-item">
					<span class="list-image">
						<img height="200" src="${imageSrc}" />
					</span>
					<span class="list-info">
						<p class="list-name">${contact.name}</p>
						<span class="list-numbers">${contact.orangeNumber} / ${contact.lonestarNumber}</span>
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
	},

	handleChangeEvent: function (event) {
		const files = this.photoEl.files;

		if (files.length === 0) return;

		const photo = URL.createObjectURL(files[0]);

		this.photoSrc = photo;

		this.photoPreviewEl.innerHTML = `<img src="${photo}">`;
	},

	registerHandlers: function () {
		document.addEventListener("click", this.handleClickEvent.bind(this));
		document.addEventListener("change", this.handleChangeEvent.bind(this));
	},

	init: function () {
		this.render();
		this.registerHandlers();
	},
};

phonebook.init();
