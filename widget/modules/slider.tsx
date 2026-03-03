// slider.tsx
import { Gtk } from "ags/gtk4";
import { createState } from "ags";
import GLib from "gi://GLib";

interface VolumeSliderProps {
  wpctlId: number
  onChange?: (value: number) => void
  label?: string
  icon?: string
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
	
export default function VolumeSlider({ wpctlId, label, icon, onChange }: ReadOnly<VolumeSliderProps>) {
  const initialVol = getCurrentVolume(wpctlId)
  const [volume, setVolume] = createState<number>(initialVol)

  function onSliderChanged(slider: Gtk.Scale) {
    const value = Math.round(slider.get_value())
    setVolume(value)
    GLib.spawn_command_line_async(`wpctl set-volume ${wpctlId} ${(value / 100).toFixed(2)}`)
    onChange?.(value)
  }

  return (
    <box
      name="slider-card"
      orientation={Gtk.Orientation.VERTICAL}
      spacing={8}
      halign={Gtk.Align.CENTER}
      valign={Gtk.Align.FILL}
      widthRequest={90}
    >
      <box orientation={Gtk.Orientation.HORIZONTAL} spacing={6} halign={Gtk.Align.CENTER}>
        <label name="slider-icon" label={icon ?? ""} />
        <label name="slider-label" label={label ?? ""} />
      </box>
      <Gtk.Scale
        $={(ref) => {
          ref.set_range(0, 100)
          ref.inverted = true
          ref.set_value(initialVol)
        }}
        orientation={Gtk.Orientation.VERTICAL}
        halign={Gtk.Align.CENTER}
        vexpand={true}
        drawValue={false}
        onChangeValue={onSliderChanged}
        widthRequest={40}
      />
      <label
        name="slider-percent"
        label={volume.as(v => `${v}%`)}
        halign={Gtk.Align.CENTER}
      />
    </box>
  )
}