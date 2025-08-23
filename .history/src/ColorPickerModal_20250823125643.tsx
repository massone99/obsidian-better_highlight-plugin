import { Modal, App } from 'obsidian';
import colors from './aesthetic/colors';
import { ColorName } from './aesthetic/colors';
import { createRoot, Root } from "react-dom/client";
import { useEffect, useMemo, useRef, useState } from "react";

const ColorPickerTitle = () => {
	return (
		<h2>Choose a color to highlight</h2>
	);
}


type ColorInputProps = {
	colorName: string;
	onColorNameChange: (name: string) => void;
};

const ColorPickerInput = ({ colorName, onColorNameChange }: ColorInputProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputRef?.current?.focus();
	})

	return <input
		placeholder="Highlight color"
		value={colorName}
		ref={inputRef}
		onChange={(e) => {
			onColorNameChange(e.target.value)
		}}
		id="search-color" />;
}

type ColorItemProps = {
	colorName: ColorName;
	colorCode: string;
	isActive?: boolean;
};

const ColorItem = ({ colorName, colorCode, isActive}: ColorItemProps) => {
	let circleSize = 15;

	return (
		<li>
			<span style={{
				display: 'inline-block',
				width: `${circleSize}px`,
				margin: '0em 1em',
				height: `${circleSize}px`,
				borderRadius: '50%',
				backgroundColor: if (isActive) 
			}}></span>
			<span
				style={{ display: 'inline-block' }}
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
	const [colorName, setColorName] = useState("");

	const filteredColorNames = useMemo(() => {
		return Object
			.entries(colorMap)
			.filter((color) => color[0].toLowerCase().includes(colorName.toLowerCase()));
	}, [colorMap, colorName]);

	const firstMatch = useMemo(() => {
		return filteredColorNames.length > 0 ? filteredColorNames[0][0] as ColorName : null;
	}, [filteredColorNames])

	return (
		<div style={{
			padding: '1em',
			backgroundColor: 'var(--background-primary)',
			border: '1px solid var(--background-modifier-border)',
			borderRadius: 'var(--radius-s)',
			opacity: '1.0'
		}}>
			<ColorPickerTitle />
			<ColorPickerInput colorName={colorName} onColorNameChange={setColorName} />
			<ul style={{ maxHeight: '400px', overflowY: 'auto' }}>
				{filteredColorNames
					.map(([colorName, colorCode]) => {
						if (colorName == firstMatch) {
							return <ColorItem colorName={colorName} colorCode={colorCode} />
						} else {
							return <ColorItem colorName={colorName} colorCode={colorCode} />
						}
					})}
			</ul>
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
