import { Modal, App } from 'obsidian';

export class ColorPickerModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const { contentEl } = this;

		// Clear previous content if needed
		contentEl.empty();

		
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}
