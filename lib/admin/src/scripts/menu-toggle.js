export function loadMenuToggle(window, document) {
	let layout = document.getElementById("layout");
	let menu = document.getElementById("menu");
	let menuLink = document.getElementById("menuLink");

	function toggleClass(element, className) {
		let classes = element.className.split(/\s+/);
		let length = classes.length;
		let i = 0;

		for (; i < length; ++i) {
			if (classes[i] === className) {
				classes.splice(i, 1);
				break;
			}
		}

		if (length === classes.length) {
			classes.push(className);
		}

		element.className = classes.join(" ");
	}

	menuLink.onclick = function(e) {
		var active = "active";

		e.preventDefault();
		toggleClass(layout, active);
		toggleClass(menu, active);
		toggleClass(menuLink, active);
	};
}
