import { For, createState } from "ags";
import { Astal, Gtk, Gdk } from "ags/gtk4";
import AstalApps from "gi://AstalApps";
import { CellLayoutNamespace } from '../@girs/gtk-3.0';
import { exit } from "system";
import VolumeSlider from './modules/slider';

const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor;

// Main func
export default function Applauncher() {
	let win: Astal.Window;
	let contentbox: Gtk.Box

  function onKey(
    _e: Gtk.EventControllerKey,
    keyval: number,
    _: number,
    __: number,
  ) {
    if (keyval === Gdk.KEY_Escape) {
      win.visible = false
      return true
    }
		return false
  }

	function onSliderChanged(
		id: string,
		value: number
	) {
		print(value + id)
	}


	return (
		<window
			$={(ref) => {win = ref}}
			name="launcher"
			anchor={TOP | BOTTOM | LEFT | RIGHT}
			exclusivity={Astal.Exclusivity.IGNORE}
			keymode={Astal.Keymode.EXCLUSIVE}
			canFocus={true}
		>
			<Gtk.EventControllerKey onKeyPressed={onKey} />
			<box
				$={(ref) => {contentbox = ref}}
				name="launcher-content"
				valign={Gtk.Align.CENTER}
				halign={Gtk.Align.CENTER}
				orientation={Gtk.Orientation.HORIZONTAL}
				spacing={20}
				widthRequest={400}
				heightRequest={300}
				canFocus={true}
			>
				<VolumeSlider
					id = {12}
					label = {"Spotify"}
					onChange = {(value) => onSliderChanged("Spotify-Volume", value)}
					initialValue = {25}
					/>

				<VolumeSlider
					id = {12}
					label = {"Comms"}
					onChange = {(value) => onSliderChanged("Comms-Volume", value)}
					initialValue = {25}
					/>

				<VolumeSlider
					id = {12}
					label = {"Mic"}
					onChange = {(value) => onSliderChanged("Mic-Output", value)}
					initialValue = {25}
					/>

				<VolumeSlider
					id = {12}
					label = {"General"}
					onChange = {(value) => onSliderChanged("General-Volume", value)}
					initialValue = {25}
					/>
			</box>
		</window>
	)
}
