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
			let li = contentEl.createEl('li', { text: colorKeys[i].toString() }); 
			const colorDot = li.createSpan();
			colorDot.style.display = 'inline-block';      // Makes the span behave like an inline rectangle, so you can set width/height
			colorDot.style.width = '1em';                 // Sets the width of the circle (relative to current font size)
			colorDot.style.height = '1em';                // Sets the height of the circle (same as width for a perfect circle)
			colorDot.style.borderRadius = '50%';          // Makes the corners fully rounded, creating a circle shape
			colorDot.style.marginRight = '0.5em';         // Adds space to the right of the circle, so the text doesn’t touch it
			colorDot.style.verticalAlign = 'middle';      // Vertically aligns the circle with the middle of the text line
			
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
