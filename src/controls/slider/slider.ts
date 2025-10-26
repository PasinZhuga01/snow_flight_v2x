import { EventTarget, IEventTarget } from 'cyxapiki_engine/events';
import { ConfigManager, checkInRange } from 'cyxapiki_engine/utils';

import { SliderConfig, SliderEventMap } from './slider.types';

export class Slider implements IEventTarget<SliderEventMap>, SliderConfig {
	private readonly _eventTarget: EventTarget<SliderEventMap>;
	private readonly _configManager: ConfigManager<SliderConfig>;

	private readonly _containers: Record<'slider' | 'thumb', HTMLElement>;

	private _isMouseDownInputing: boolean;

	public constructor(config: SliderConfig, slider: HTMLElement, thumb: HTMLElement) {
		const { max, min } = config;

		this._eventTarget = new EventTarget();
		this._configManager = new ConfigManager(
			{
				properties: {
					value: {
						value: 50,
						validate: (value) => checkInRange(value, min, max) && Number.isInteger(value),
						onChange: () => this._onValueChange()
					},
					min: { value: 0, validate: (value) => value < max },
					max: { value: 100, validate: (value) => value > min }
				}
			},
			config
		);

		this._containers = { slider, thumb };

		this._isMouseDownInputing = false;

		this._setupContainers();
		this._setupPeripheralInput();

		this._updateThumb();
	}

	public get value(): number {
		return this._configManager.get('value');
	}

	public set value(value: number) {
		this._configManager.set('value', Math.floor(value));
	}

	public get min(): number {
		return this._configManager.get('min');
	}

	public get max(): number {
		return this._configManager.get('max');
	}

	public addEventListener<TType extends keyof SliderEventMap>(type: TType, listener: SliderEventMap[TType]) {
		this._eventTarget.addEventListener(type, listener);
	}

	public removeEventListener<TType extends keyof SliderEventMap>(type: TType, listener: SliderEventMap[TType]) {
		this._eventTarget.removeEventListener(type, listener);
	}

	private _onValueChange() {
		this._updateThumb();
		this._eventTarget.dispatchEvent('change', this.value);
	}

	private _startMouseDownInput(event: MouseEvent) {
		this._isMouseDownInputing = true;
		this._mouseDownInput(event);
	}

	private _stopMouseDownInpunt() {
		this._isMouseDownInputing = false;
	}

	private _mouseDownInput(event: MouseEvent) {
		if (this._isMouseDownInputing) {
			const { slider, thumb } = this._containers;

			const sliderClientRect = slider.getBoundingClientRect();
			const difference = sliderClientRect.top + sliderClientRect.height - event.y - thumb.offsetHeight / 2;

			this.value = difference / (slider.offsetHeight / this.max);

			event.preventDefault();
			thumb.focus();
		}
	}

	private _keyDownInput(event: KeyboardEvent) {
		if (document.activeElement === this._containers.thumb) {
			if (event.code === 'ArrowDown') {
				this.value--;
			} else if (event.code === 'ArrowUp') {
				this.value++;
			}
		}
	}

	private _updateThumb() {
		const { thumb } = this._containers;

		thumb.style.bottom = `${this.value}%`;
		thumb.style.top = '';

		if (thumb.offsetTop < 0) {
			thumb.style.bottom = '';
			thumb.style.top = '0';
		}
	}

	private _setupContainers() {
		const { slider, thumb } = this._containers;

		thumb.tabIndex = 0;
		thumb.style.position = 'absolute';

		slider.addEventListener('mousedown', (event) => this._startMouseDownInput(event));
	}

	private _setupPeripheralInput() {
		document.addEventListener('mousemove', (event) => this._mouseDownInput(event));
		document.addEventListener('mouseup', () => this._stopMouseDownInpunt());
		document.addEventListener('keydown', (event) => this._keyDownInput(event));
	}
}
