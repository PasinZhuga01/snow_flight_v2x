import { BaseEngine } from 'cyxapiki_engine/engine';
import { PhysicsManager } from 'cyxapiki_engine/physics';
import { Scene } from 'cyxapiki_engine/render';

import { StageManager } from '../managers';

export class Engine extends BaseEngine {
	private readonly _scene: Scene;

	private readonly _physics: PhysicsManager;
	private readonly _stageManager: StageManager;

	public constructor(scene: Scene, physics: PhysicsManager, stageManager: StageManager) {
		super(1000 / 60);

		this._scene = scene;

		this._physics = physics;
		this._stageManager = stageManager;
	}

	protected _update() {
		this._physics.update();
		this._stageManager.update();
	}

	protected _render() {
		this._scene.render();
	}
}
