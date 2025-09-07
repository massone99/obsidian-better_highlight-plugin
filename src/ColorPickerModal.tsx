import { Modal, App, MarkdownView } from 'obsidian';
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
	app: App,
	colorMap: Record<string, string>,
	onClose: () => void,
}

const ReactColorPickerModal: React.FC<ColorMapProps> = ({ app, colorMap, onClose }) => {
	const [colorName, setColorName] = useState("");
	const [firstMatchIdx, setFirstMatchIdx] = useState<number | null>(0);

	const filteredColorNames = useMemo(() => {
		return Object
			.entries(colorMap)
			.filter((color) => color[0].toLowerCase().startsWith(colorName.toLowerCase()));
	}, [colorMap, colorName]);

	const firstMatch = useMemo(() => {

		if (firstMatchIdx != null) {
			return filteredColorNames[firstMatchIdx][0];
		}
		return null;
	}, [firstMatchIdx, filteredColorNames]);


	const onInputType = (e: React.KeyboardEvent<HTMLInputElement>) => {
		console.log("Event key pressed:", e);
		if (e.key === 'Enter') {
			e.preventDefault();
			onConfirm(e);
		} else if (e.key === "ArrowUp") {
			if (firstMatchIdx != null) {
				setFirstMatchIdx(Math.max(0, firstMatchIdx - 1));
			}
		} else if (e.key === "ArrowDown") {
			if (firstMatchIdx != null) {
				setFirstMatchIdx(Math.min(filteredColorNames.length - 1, firstMatchIdx + 1));
			}
		} else {
			setColorName(e.currentTarget.value);
		}
	}

	const onConfirm = (e: React.KeyboardEvent<HTMLInputElement>) => {
		e.preventDefault();
		console.log("Confirming selection...");
		if (firstMatchIdx != null) {
			// Here you can handle the selected color (firstMatch)
			// For example, you might want to pass it to a callback or update some state
			const view = app.workspace.getActiveViewOfType(MarkdownView);
			if (view) {
				const editor = view.editor;
				const selection = editor.getSelection();

				editor.replaceSelection('<mark class="' + firstMatch + '">' + selection + '</mark>');
				onClose()
			}
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
		this.app = app;
	}


	onOpen() {
		this.containerEl.empty();

		const container = this.containerEl.createDiv({ cls: 'color-picker-modal' });

		this.reactRoot = createRoot(container);
		this.reactRoot.render(
			<ReactColorPickerModal app={this.app} colorMap={colors} onClose={() => this.close()} />
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
