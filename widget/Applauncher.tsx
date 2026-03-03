import { Astal, Gtk, Gdk } from "ags/gtk4";
import VolumeSlider from './modules/slider';

const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor

export default function Applauncher() {
  let win: Astal.Window

  function onKey(_e: Gtk.EventControllerKey, keyval: number) {
    if (keyval === Gdk.KEY_Escape) {
      win.visible = false
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
      <box
        name="launcher-content"
        valign={Gtk.Align.CENTER}
        halign={Gtk.Align.CENTER}
        orientation={Gtk.Orientation.HORIZONTAL}
        spacing={20}
        widthRequest={400}
        heightRequest={300}
      >
        <VolumeSlider wpctlId={37} label="Spotify" />
        <VolumeSlider wpctlId={39} label="Comms" />
        <VolumeSlider wpctlId={35} label="Mic" />
        <VolumeSlider wpctlId={34} label="General" />
      </box>
    </window>
  )
}