import { Gtk } from "ags/gtk4";
import GLib from "gi://GLib";

interface VolumeSliderProps {
  wpctlId: number
  onChange?: (value: number) => void
  label?: string
}

function getCurrentVolume(wpctlId: number): number {
  try {
    const [ok, stdout] = GLib.spawn_command_line_sync(`wpctl get-volume ${wpctlId}`)
    if (!ok || !stdout) return 50
    const match = new TextDecoder().decode(stdout).match(/Volume:\s*([\d.]+)/)
    return match ? Math.round(parseFloat(match[1]) * 100) : 50
  } catch {
    return 50
  }
}

export default function VolumeSlider({ wpctlId, label, onChange }: ReadOnly<VolumeSliderProps>) {
  const initialVol = getCurrentVolume(wpctlId)

  function onSliderChanged(slider: Gtk.Scale) {
    const value = Math.round(slider.get_value())
    GLib.spawn_command_line_async(`wpctl set-volume ${wpctlId} ${(value / 100).toFixed(2)}`)
    onChange?.(value)
  }

  return (
    <box
      orientation={Gtk.Orientation.VERTICAL}
      spacing={10}
      halign={Gtk.Align.CENTER}
      heightRequest={250}
      widthRequest={120}
    >
      <label label={label} halign={Gtk.Align.CENTER} widthRequest={100} />
      <Gtk.Scale
        $={(ref) => {
          ref.set_range(0, 100)
          ref.inverted = true
          ref.set_value(initialVol)
        }}
        orientation={Gtk.Orientation.VERTICAL}
        halign={Gtk.Align.CENTER}
        drawValue={false}
        onChangeValue={onSliderChanged}
        heightRequest={200}
        widthRequest={100}
      />
    </box>
  )
}