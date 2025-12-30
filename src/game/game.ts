import { PhysicsManager } from 'cyxapiki_engine/physics';
import { Scene } from 'cyxapiki_engine/render';
import { Camera } from 'cyxapiki_engine/camera';
import { Vector } from 'cyxapiki_engine/geometry';

import { GameStatus } from './game.types';

import { Engine } from '../engine/engine';
import { ACHIEVEMENTS, PLAYGROUND_SIZE } from '../constants';
import { StageManager, ScoreManager, SoundsManager, MenuManager, AchievementsManager } from '../managers';

export class Game {
	private readonly _scene: Scene;
	private readonly _physics: PhysicsManager;

	private readonly _stageManager: StageManager;
	private readonly _scoreManager: ScoreManager;
	private readonly _soundsManager: SoundsManager;
	private readonly _menuManager: MenuManager;
	private readonly _achievementsManager: AchievementsManager;

	private readonly _engine: Engine;

	private _status: GameStatus;

	public constructor() {
		this._physics = new PhysicsManager(undefined, new Camera(new Vector(PLAYGROUND_SIZE).map(2, (a, b) => a * b)));
		this._scene = this._createScene(new Camera(PLAYGROUND_SIZE));

		this._stageManager = this._createStageManager();
		this._soundsManager = new SoundsManager();
		this._scoreManager = new ScoreManager();
		this._menuManager = new MenuManager({ play: () => this._play(), openachievements: () => this._switchShowMenuOrAchievements(true) });
		this._achievementsManager = this._createAchievementsManager();

		this._engine = new Engine(this._scene, this._physics, this._stageManager);

		this._status = 'menu';

		this._setupKeyDownInput({
			Escape: () => this._togglePause(),
			' ': () => {
				if (this._engine.isStarted) {
					this._stageManager.playerJump();
				}
			}
		});
	}

	private _play() {
		if (this._status === 'menu') {
			this._stageManager.reset();
			this._scoreManager.reset();
		}

		this._status = 'play';

		this._engine.start();
		this._soundsManager.play();
		this._achievementsManager.setVisibility(false);
		this._menuManager.setVisibility(false);
	}

	private _pause() {
		this._status = 'pause';

		this._engine.pause();
		this._menuManager.setVisibility(true);
	}

	private _togglePause() {
		if (this._status === 'play') {
			this._pause();
		} else if (this._status === 'pause') {
			this._play();
		}
	}

	private _finish() {
		this._status = 'menu';

		this._engine.pause();
		this._soundsManager.finish();
		this._scoreManager.updateMaxScore();
		this._menuManager.setVisibility(true);
		this._achievementsManager.updateNotOpened(this._scoreManager.maxScore);
	}

	private _setupKeyDownInput(callbacks: Record<string, () => void>) {
		document.addEventListener('keydown', (event) => {
			callbacks[event.key]?.();
		});
	}

	private _createScene(camera: Camera): Scene {
		const scene = new Scene(undefined, camera);

		scene.container.classList.add('game');
		document.body.appendChild(scene.container);

		return scene;
	}

	private _createStageManager(): StageManager {
		return new StageManager(this._scene, this._physics, {
			collideblock: () => this._finish(),
			pickupcheckpoint: () => this._scoreManager.updateScore(true)
		});
	}

	private _switchShowMenuOrAchievements(isAchievements: boolean) {
		this._achievementsManager.setVisibility(isAchievements);
		this._menuManager.setVisibility(!isAchievements);
	}

	private _createAchievementsManager(): AchievementsManager {
		const manager = new AchievementsManager(() => this._switchShowMenuOrAchievements(false), this._scoreManager.maxScore, ACHIEVEMENTS);

		manager.setVisibility(false);

		return manager;
	}
}
