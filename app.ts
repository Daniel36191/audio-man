#!/usr/bin/env -S ags run
import app from "ags/gtk4/app";
import style from "./style.scss";
import Applauncher from "./widget/Applauncher";
import Gtk from "gi://Gtk?version=4.0";

let applauncher: Gtk.Window;

app.start({
	css: style,
	gtkTheme: "Adwaita",
	requestHandler(request, res) {
		applauncher.visible = !applauncher.visible;
	},
	main() {
		applauncher = Applauncher() as Gtk.Window;
		app.add_window(applauncher);
		applauncher.present();
	},
});
