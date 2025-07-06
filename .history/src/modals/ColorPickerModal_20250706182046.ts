import { Modal, App } from 'obsidian';

export class ColorPickerModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const { contentEl } = this;

		// Clear previous content if needed
		contentEl.empty();

		contentEl.innerHTML = `
			<div class="dropdown">
  <button class="dropdown-btn">Menu ▼</button>
  <div class="dropdown-content">
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Contact</a>
  </div>
</div>

		`
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}
