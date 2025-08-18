import { Modal, App } from 'obsidian';
import colors from './aesthetic/colors';
import { getColor, ColorName } from './aesthetic/colors';
import { createRoot, Root } from "react-dom/client";

const ColorPickerTitle = () => {
	return (
		<h2>Choose a color to highlight</h2>
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
		</>
	);
}

type ColorMapProps = {
	colorMap: Record<string, string>
}

const ReactColorPickerModal: React.FC<ColorMapProps> = ({ colorMap }) => {

	return (
		<div style={{ maxHeight: '200px', overflowY: 'auto' }}>
			<ColorPickerTitle />
			<ul>
				{Object.entries(colorMap).map(([colorName, colorCode]) => (
					<ColorItem colorName={colorName} colorCode={colorCode} />
				))}
			</ul>
			<ColorPickerInput />
		</div>
	)
}

export default ReactColorPickerModal;




export class ColorPickerModal extends Modal {
	private reactRoot: Root | null = null;

	constructor(app: App) {
		super(app);
	}


	onOpen() {
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
