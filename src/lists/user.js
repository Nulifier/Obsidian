export default function loadUserList(obsidian) {
	const fields = obsidian.fields;

	const User = new obsidian.List("User");

	User.add({
		name: {type: fields.Name, required: true},
		email: {type: fields.Text, required: true}
	});

	User.uiElements = [
		"firstName",
		"lastName",
		"email"
	];

	User.register();
}