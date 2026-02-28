import { For, createState } from "ags";
import { Astal, Gtk, Gdk } from "ags/gtk4";
import AstalApps from "gi://AstalApps";
import Graphene from "gi://Graphene";

const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor;

// Main func
export default function Applauncher() {
	let win: Astal.Window;
	let contentbox: Gtk.Box;

	return (
		<window
			$={(ref) => (win = ref)}
			name="launcher"
			anchor={TOP | BOTTOM | LEFT | RIGHT}
			exclusivity={Astal.Exclusivity.IGNORE}
			keymode={Astal.Keymode.EXCLUSIVE}
		>
			<box
				$={(ref) => (contentbox = ref)}
				name="launcher-content"
				valign={Gtk.Align.CENTER}
				halign={Gtk.Align.CENTER}
				orientation={Gtk.Orientation.VERTICAL}
			>
			</box>
		</window>
	);
}
