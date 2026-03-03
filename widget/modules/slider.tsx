import { Astal, Gtk, Gdk } from "ags/gtk4";
import { createState } from "ags";

interface VolumeSliderProps {
  id?: number
  initialValue?: number
  onChange?: (value: number) => void
  label?: string
}

export default function VolumeSlider(props: ReadOnly<VolumeSliderProps>) {
  const [volume, setVolume] = createState<number>(props.initialValue ?? 0)

	let valueLabel: Gtk.Label

  function onSliderChanged(slider: Gtk.Scale) {
		const newValue = Math.round(slider.get_value())
    setVolume(newValue)

		if (props.onChange) {
			props.onChange(newValue)
		}

		if (valueLabel) {
			valueLabel.label = `${props.label}`
		}
  }

return (
		<box
			orientation={Gtk.Orientation.VERTICAL}
			spacing={10}
			halign={Gtk.Align.CENTER}
			heightRequest={250}
			widthRequest={120}
			>
			<label
				$={(ref) => {valueLabel = ref}}
				label={`${props.label}`}
				halign={Gtk.Align.CENTER}
				widthRequest={100}
			/>
			<Gtk.Scale
				$={(ref) => {
					ref.set_range(0, 100);
					ref.inverted = true;
					ref.set_value(volume)
				}}
				orientation={Gtk.Orientation.VERTICAL}
				halign={Gtk.Align.CENTER}
				drawValue={false}
				onChangeValue={onSliderChanged}
				heightRequest={200}
				widthRequest={100}
			/>
		</box>
	);
}