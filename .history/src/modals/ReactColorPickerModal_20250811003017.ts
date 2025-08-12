import { ColorPickerModal } from "./ColorPickerModal";

const ColorPickerTitle = () => {
    return <h2>Color Picker</h2>;
}

const ColorPickerInput = () => {
    return <input placeholder="Highlight color" id="search-color" />;
}

const ColorItem = ({ colorName, colorCode }) => {
    return (
        <li>
            <span style={{ backgroundColor = colorCode }}>
            </span>
        </li>
    )
}


const ReactColorPickerModal() {
    return (
        <ColorPickerTitle />
        <ColorPickerInput />

    )
}