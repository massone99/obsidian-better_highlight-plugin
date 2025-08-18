import { Modal, App } from 'obsidian';
import colors from './aesthetic/colors';
import { getColor, ColorName } from './aesthetic/colors';
import { createRoot, Root } from "react-dom/client";

const ColorPickerTitle = () => {
	return (
		<h2>Title</h2>
	);
}


const ColorPickerInput = () => {
	return <input placeholder="Highlight color" id="search-color" />;
}

type ColorItemProps = {
	colorName: ColorName;
	colorCode: string;
};

const ColorItem = ({ colorName, colorCode }: ColorItemProps) => {
	console.log("colorCode: " + colorCode)
	return (
		<li>
			<span
				style={{ backgroundColor: colorCode, display: 'inline-block' }}
			>
				{colorName}
			</span>
		</li>
	);
}

type ColorMapProps = {
	colorMap: Record<string, string>
}

const ReactColorPickerModal: React.FC<ColorMapProps> = ({ colorMap }) => {

	return (
		<>
			<ColorPickerTitle />
			<ul>
				{Object.entries(colorMap).map(([colorName, colorCode]) => (
					<ColorItem colorName="aliceblue" colorCode={getColor('saddlebrown')} />
				))}
			</ul>
			<ColorPickerInput />
		</>
	)
}

export default ReactColorPickerModal;




export class ColorPickerModal extends Modal {
	private reactRoot: Root | null = null;

	constructor(app: App) {
		super(app);
	}


	onOpen() {






		// contentEl.innerHTML = `
		// 	<label for="color">Highlight color:</label>
		// 	<input type="text" id="color_picker" name="color_picker">
		// 	<div class="scrollable-list">
		// 		<ul>
		// 			<li>Item 1</li>
		// 			<li>Item 2</li>
		// 			<li>Item 3</li>
		// 			<li>Item 4</li>
		// 			<li>Item 5</li>
		// 			<li>Item 6</li>
		// 			<li>Item 7</li>
		// 			<li>Item 8</li>
		// 			<li>Item 9</li>
		// 			<li>Item 10</li>
		// 		</ul>
		// 	</div>
		// `
		this.containerEl.empty();

		const container = this.containerEl.createDiv({ cls: 'color-picker-modal' });

		this.reactRoot = createRoot(container);
		this.reactRoot.render(
			<ReactColorPickerModal colorMap={colors} />
		);
	}

	onClose() {
		// const { contentEl } = this;
		// contentEl.empty();

		if (this.reactRoot) {
			this.reactRoot.unmount();
			this.reactRoot = null;
		}

		this.contentEl.empty();
	}
}
