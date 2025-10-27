import { SoundsManager as CyxapikiSoundsManager } from 'cyxapiki_engine/sounds';
import { LocalStorageManager } from 'cyxapiki_engine/storage';

import { SOUNDS } from '../../constants';
import { Slider } from '../../controls';
import { getContainerOrThrow } from '../../helpers';

export class SoundsManager {
	private readonly _storage: LocalStorageManager<{ volume: number }>;

	private readonly _backSoundsManager: CyxapikiSoundsManager<typeof SOUNDS.BACK>;
	private readonly _loseSoundsManager: CyxapikiSoundsManager<typeof SOUNDS.LOSE>;

	public constructor() {
		this._storage = new LocalStorageManager({
			volume: {
				value: 50,
				parse: (value) => (typeof value === 'number' ? { isOk: true, value } : { isOk: false })
			}
		});

		this._backSoundsManager = new CyxapikiSoundsManager(SOUNDS.BACK, { volume: this._storage.getItem('volume'), isRepeat: true });
		this._loseSoundsManager = new CyxapikiSoundsManager(SOUNDS.LOSE, { volume: this._storage.getItem('volume') });

		this._setupVolumeSlider();
	}

	public play() {
		this._loseSoundsManager.stop();
		this._backSoundsManager.play();
	}

	public finish() {
		this._backSoundsManager.pause();
		this._loseSoundsManager.play();
	}

	private _updateVolume(volume: number) {
		this._backSoundsManager.volume = volume;
		this._loseSoundsManager.volume = volume;

		this._storage.setItem('volume', volume);
	}

	private _setupVolumeSlider() {
		const slider = new Slider(
			{ min: 0, max: 100, value: this._storage.getItem('volume') },
			getContainerOrThrow('.volume-slider'),
			getContainerOrThrow('.volume-thumb')
		);

		slider.addEventListener('change', (value) => this._updateVolume(value));
	}
}
