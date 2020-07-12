//Check if a token is selected. Warn user if not.
if (token === undefined) {
	ui.notifications.info("Please select a token first!");
	return false;
}

//Checks if Token Mold is installed - if not, it will skip that step later. Otherwise will enable the sticky tokens flags to ensure the aura follows the token!
let tokenMold = false;
if (game.modules.get("token-mold")) {
	tokenMold = true;
}

//Set owner to first owner of the token, if one doesn't exist, set to current user. Finally get the default colour of this user.
let owner = (Object.keys(token.actor.data.permission)[1]);
if (owner === undefined) {
	owner = game.user._id;
}
let defaultColour = game.users.get(owner).data.color;

console.log();
//Return grid size, this is used later to determine the center of a token.
let gridSize = (scene.data.grid);

//Provide a switch to allow users to backout during the dialog process.
let proceed = false;

//Create new dialog which provides a means to colour the token and set radius.
let d = new Dialog({
	title: "Aura Radius",
	content: `
		<p>Set radius and colour of the aura. Note this only applies to one token!</p>
		<form>
			<input type="text" name="dist" data-dtype="Number" value="10" />
			<input style="width: 100%" type="color" name="colour" value="` + defaultColour + `" data-dtype="String">
		</form>
    `,
	buttons: {
		submit: {
			icon: '<i class="fas fa-check"></i>',
			label: "Submit",
			callback: () => proceed = true
		},
		cancel: {
			icon: '<i class="fas fa-times"></i>',
			label: "Cancel",
			callback: () => proceed = false
		}
	},
	default: "Cancel",
	close: html => {
		if (proceed) {
			let dist = parseInt(html.find('[name=dist]')[0].value);
			let colour = html.find('[name=colour]')[0].value;
			createTemplate(dist, colour);
		}
	}
});
d.render(true);

//Shade a HEX colour - thanks to Pablo/David Sherret from Stack Overflow for this code.
function shadeColor(color, percent) {
	var R = parseInt(color.substring(1, 3), 16);
	var G = parseInt(color.substring(3, 5), 16);
	var B = parseInt(color.substring(5, 7), 16);
	R = parseInt(R * (100 + percent) / 100);
	G = parseInt(G * (100 + percent) / 100);
	B = parseInt(B * (100 + percent) / 100);
	R = (R < 255) ? R : 255;
	G = (G < 255) ? G : 255;
	B = (B < 255) ? B : 255;
	var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
	var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
	var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));
	return "#" + RR + GG + BB;
}

//Create a Measured Template, to do so we require the radius distance (dist) and the colour (colour) set in the dialog. Here we multiply the grid size by the token size and finally half that value, we finally add the x and y coordinates to this so we ensure we are placing the aura directly in the middle of the token. We also use the shadeColor function to make the border 20% darker.
async function createTemplate(dist, colour) {
	let response = await MeasuredTemplate.create({
		t: "circle",
		user: owner,
		x: token.data.x + 0.5 * (token.data.width * gridSize),
		y: token.data.y + 0.5 * (token.data.height * gridSize),
		direction: 0,
		angle: 360,
		distance: dist,
		borderColor: shadeColor(colour, -20),
		fillColor: colour
	});
	addFlags(response);
}

//Finally we need to set the Token Mold flags to ensure this is stickied. This can be removed if Token Mold is not installed.
async function addFlags(response) {
	if (tokenMold) {
		var templateObject = {
			rotate: false,
			tokenId: token.data._id
		};
		if (token.getFlag("token-mold", "sticky-templates") != undefined) {
			var tokenArray = token.getFlag("token-mold", "sticky-templates").templateIds;
		} else {
			var tokenArray = [];
		}
		await response.setFlag("token-mold", "sticky-templates", templateObject);
		tokenArray.push(response.data._id);
		var templateObject = {
			templateIds: tokenArray
		};
		token.unsetFlag("token-mold", "sticky-templates");
		token.setFlag("token-mold", "sticky-templates", templateObject);
	}
}
