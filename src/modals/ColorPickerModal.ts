import { Modal, App } from 'obsidian';
import colors from '../aesthetics/colors';
import { getColor, ColorName } from '../aesthetics/colors';

export class ColorPickerModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const { contentEl } = this;

		// Clear previous content if needed
		contentEl.empty();

		contentEl.createEl('h2', { text: 'Color Picker', attr: { id: 'header-color-picker' } });
		contentEl.createEl('input', { placeholder: 'Highlight color', attr: { id: 'search-color' } });
		const list = contentEl.createEl('ul');

		const colorKeys = Object.keys(colors);
		// retrieve computed style properties
		for (let i = 0; i < colorKeys.length; i++) {
			let li = contentEl.createEl('li'); // <--- crea <li> vuoto

			// Crea il pallino colorato
			const colorDot = li.createSpan();
			colorDot.style.display = 'inline-block';
			colorDot.style.width = '1em';
			colorDot.style.height = '1em';
			colorDot.style.borderRadius = '50%';
			colorDot.style.marginRight = '0.5em';
			colorDot.style.verticalAlign = 'middle';
			colorDot.style.backgroundColor = colorKeys[i]; // <-- non dimenticare il colore!
		
			// Aggiungi il testo dopo il pallino
			li.appendText(colorKeys[i].toString());
		}

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
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}
