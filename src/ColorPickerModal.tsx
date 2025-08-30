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
	onColorNameChange: (s: string) => void;
	onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const ColorPickerInput = ({ colorName, onColorNameChange, onKeyDown }: ColorInputProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputRef?.current?.focus();
	})

	return <input
		placeholder="Highlight color"
		value={colorName}
		ref={inputRef}
		onChange={e => {
			onColorNameChange(e.currentTarget.value);
		}}
		onKeyDown={onKeyDown}
		id="search-color" />;
}

type ColorItemProps = {
	colorName: ColorName;
	colorCode: string;
	isActive?: boolean;
};

const ColorItem = ({ colorName, colorCode, isActive }: ColorItemProps) => {
	let circleSize = 15;

	return (
		<li>
			<span style={{
				display: 'inline-block',
				width: `${circleSize}px`,
				margin: '0em 1em',
				height: `${circleSize}px`,
				borderRadius: '50%',
				backgroundColor: colorCode,
			}}></span>
			<span
				style={{
					display: 'inline-block',
					backgroundColor: isActive ? 'var(--background-modifier-hover)' : 'transparent',
					padding: '0.2em 0.5em',
				}}
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

	const onInputType = (e: React.KeyboardEvent<HTMLInputElement>) => {
		console.log("Event key pressed:", e);
		if (e.key === 'Enter') {
			e.preventDefault();
			onConfirm(e);
		} else {
			setColorName(e.currentTarget.value);
		}
	}

	const filteredColorNames = useMemo(() => {
		return Object
			.entries(colorMap)
			.filter((color) => color[0].toLowerCase().startsWith(colorName.toLowerCase()));
	}, [colorMap, colorName]);

	const firstMatch = useMemo(() => {
		return filteredColorNames.length > 0 ? filteredColorNames[0][0] as ColorName : null;
	}, [filteredColorNames])


	const onConfirm = (e: React.KeyboardEvent<HTMLInputElement>) => {
		e.preventDefault();
		console.log("Confirming selection...");
		if (firstMatch) {
			console.log("Selected color:", firstMatch, colorMap[firstMatch]);
			// Here you can handle the selected color (firstMatch)
			// For example, you might want to pass it to a callback or update some state
		}
	}

	return (
		<div style={{
			padding: '1em',
			backgroundColor: 'var(--background-primary)',
			border: '1px solid var(--background-modifier-border)',
			borderRadius: 'var(--radius-s)',
			opacity: '1.0'
		}}>
			<ColorPickerTitle />
			<ColorPickerInput colorName={colorName} onColorNameChange={setColorName} onKeyDown={onInputType} />
			<ul style={{ maxHeight: '400px', overflowY: 'auto' }}>
				{filteredColorNames
					.map(([colorName, colorCode]) => {
						if (colorName == firstMatch) {
							return <ColorItem colorName={colorName} colorCode={colorCode} isActive />
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
