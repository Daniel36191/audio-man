import app from "ags/gtk4/app";
import { Astal, Gtk, Gdk } from "ags/gtk4";
import VolumeSlider from './modules/slider';

const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor

export default function Applauncher() {
  let win: Astal.Window

  function close() {
    app.quit()
  }

  function onKey(_e: Gtk.EventControllerKey, keyval: number) {
    if (keyval === Gdk.KEY_Escape) {
      close()
      return true
    }
    return false
  }

  return (
    <window
      $={(ref) => { win = ref }}
      name="launcher"
      anchor={TOP | BOTTOM | LEFT | RIGHT}
      exclusivity={Astal.Exclusivity.IGNORE}
      keymode={Astal.Keymode.EXCLUSIVE}
      canFocus={true}
    >
      <Gtk.EventControllerKey onKeyPressed={onKey} />
      <overlay>
        {/* Transparent click-off layer */}
        <button
          name="launcher-dismiss"
          vexpand={true}
          hexpand={true}
          onClicked={close}
        />
        {/* Actual content */}
				<box
					name="launcher-content"
					valign={Gtk.Align.CENTER}
					halign={Gtk.Align.CENTER}
					orientation={Gtk.Orientation.VERTICAL}
					spacing={8}
				>
					<button name="launcher-close" halign={Gtk.Align.END} onClicked={close}>
						<label label="" />
					</button>
					<box
						orientation={Gtk.Orientation.HORIZONTAL}
						spacing={8}
						heightRequest={320}
					>
						<VolumeSlider wpctlId={37} label="Spotify" icon="󰓇" />
						<VolumeSlider wpctlId={39} label="Comms"   icon="" />
						<VolumeSlider wpctlId={35} label="Mic"     icon="" />
						<VolumeSlider wpctlId={34} label="General" icon="󰕾" />
					</box>
				</box>
      </overlay>
    </window>
  )
}