//  ✅ There should be a way to store contacts
const contacts = [
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
	{
		id: 3,
		name: "Flomo Morris",
		photo: "",
		orangeNumber: "0775676998",
		lonestarNumber: "0886766880",
		email: "sam@gmail.com",
		dob: "03/02/2003",
		details: "lorem ldsakfdsfdsafdsfkdsfdsaflkkafaf",
		address: "Du-port road",
	},
	{
		id: 4,
		name: "Sam Kollie",
		photo: "",
		orangeNumber: "0775676998",
		lonestarNumber: "0886766880",
		email: "sam@gmail.com",
		dob: "03/02/2003",
		details: "lorem ldsakfdsfdsafdsfkdsfdsaflkkafaf",
		address: "Du-port road",
	},
];

// ✅ There should be a way to get all contacts
function all() {
	return contacts;
}

// ✅ There shoudld be a way get a contact

function get(id) {
	for (let i = 0; i < contacts.length; i++) {
		if (contacts[i].id === id) return contacts[i];
	}
}

// ✅ There should be a way to add contacts

function add(
	nameP,
	photoP,
	orangeNumberP,
	lonestarNumberP,
	emailP,
	dobP,
	detailsP,
	addressP
) {
	const contact = {
		id: contacts.length + 1,
		name: nameP,
		photo: photoP,
		orangeNumber: orangeNumberP,
		lonestarNumber: lonestarNumberP,
		email: emailP,
		dob: dobP,
		details: detailsP,
		address: addressP,
	};

	contacts.push(contact);
}

// add(
// 	"Peter",
// 	"",
// 	"0778909089",
// 	"0886545321",
// 	"john@example.com",
// 	"02/01/34",
// 	"hello",
// 	"Elwa"
// );

// ✅ There should be a way to delete a contact

function remove(id) {
	for (let i = 0; i < contacts.length; i++) {
		if (contacts[i].id === id) contacts.splice(i, 1);
	}
}

//✅ There should be a way to search for contacts
function search(value) {
	const foundContacts = [];
	value = value.toLowerCase();

	for (let i = 0; i < contacts.length; i++) {
		const name = contacts[i].name.toLowerCase();
		const orangeNumber = contacts[i].orangeNumber;

		if (name.includes(value) || orangeNumber.includes(value)) {
			foundContacts.push(contacts[i]);
		}
	}

	return foundContacts;
}

console.log(search("bowman"));

function render() {
	for (let i = 0; i < contacts.length; i++) {
		const list = document.querySelector(".contact-list");

		list.insertAdjacentHTML(
			"beforeend",
			`
            <li class="list-item">
                <span class="list-image">
                    <img height="200" src="./avatar2.png" />
                </span>
                <span class="list-info">
                    <p class="list-name">${contacts[i].name}</p>
                    <span class="list-numbers"
                        >${contacts[i].orangeNumber} / ${contacts[i].lonestarNumber}</span
                    >
                </span>
                <span class="list-actions">
                    <span class="edit-item">✏️</span>
                    <span class="delete-item">❌</span>
                </span>
            </li>
        `
		);
	}
}

render();

//TODO: There should be a way to edit contacts

//TODO: There should be a way to upload images when creating contacts

//TODO: There should be a way to paginate contacts

//TODO: There should be a way to persist contacts to localStorage

//TODO: There should be a way to retrieve contacts from localStorage
