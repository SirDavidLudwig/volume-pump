const { ipcRenderer } = require("electron");
const $ = require("jquery");

window.$ = window.jQuery = $;

require("jquery-ui-dist/jquery-ui");

let setLevel = function (level) {
	level = 100 - Math.min(Math.max(level, 0), 100);
	let height = $(".volume-level").height();
	$(".volume-window").height(level / 100.0 * height);
}

let currentVolume = 0.0;
let setVolume = function (volume) {
	currentVolume = Math.min(Math.max(volume, 0), 100);
	ipcRenderer.send("set-volume", Math.round(currentVolume));
	setLevel(currentVolume);
}

$(".pump").draggable({
	handle: ".handle",
	axis: "y",
	containment: [0, 10, 52, 62],
	drag: function (elem, ui) {
		let oldOffset = $(this).offset().top;
		let newOffset = ui.offset.top.toString();
		let delta = newOffset - oldOffset;
		if (delta > 0) {
			setVolume(currentVolume + delta * 0.20);
		}
	}
});

setInterval(() => setVolume(currentVolume - 0.1), 50);
