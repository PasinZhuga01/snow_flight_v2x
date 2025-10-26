import { Scene } from 'cyxapiki_engine/render';
import { PhysicsManager } from 'cyxapiki_engine/physics';
import { Bounds } from 'cyxapiki_engine/geometry';
import { randomInteger, withReturn } from 'cyxapiki_engine/utils';

import { BaseEntity, Block, Checkpoint, Player, PlayerEventHandlers } from '../../entities';
import { BLOCK_START_BOUNDS, CHECKPOINT_START_BOUNDS, PLAYER_BOUNDS, PLAYGROUND_SIZE, STAGE_TICK_DELAY } from '../../constants';

export class StageManager {
	private readonly _scene: Scene;
	private readonly _physics: PhysicsManager;

	private readonly _player: Player;

	private _tempEntities: BaseEntity[];
	private _stageTick: number;

	public constructor(scene: Scene, physics: PhysicsManager, handlers: PlayerEventHandlers) {
		this._scene = scene;
		this._physics = physics;

		this._tempEntities = [];
		this._stageTick = STAGE_TICK_DELAY;

		this._player = this._registerEntity(new Player(handlers, new Bounds(PLAYER_BOUNDS)));
	}

	public playerJump() {
		this._player.jump();
	}

	public reset() {
		this._stageTick = 0;

		this._player.physicsReset();
		this._player.setY(PLAYER_BOUNDS.y);

		this._clearTempEntities();
	}

	public update() {
		this._clearOffscreenTempEntities();
		this._updateStage();
	}

	private _clearOffscreenTempEntities() {
		this._tempEntities = this._tempEntities.filter((entity) => {
			if (entity.isOffscreenLeft()) {
				entity.extractFrom(this._scene, this._physics);
				return false;
			}

			return true;
		});
	}

	private _clearTempEntities() {
		this._tempEntities.forEach((entity) => entity.extractFrom(this._scene, this._physics));
		this._tempEntities = [];
	}

	private _updateStage() {
		this._stageTick++;

		if (this._stageTick >= STAGE_TICK_DELAY) {
			this._stageTick = 0;
			this._generateNextStage();
		}
	}

	private _generateNextStage() {
		const checkpointHeight = randomInteger(PLAYER_BOUNDS.height * 3, PLAYGROUND_SIZE.y * 0.6);
		const checkpointY = randomInteger(0, PLAYGROUND_SIZE.y - checkpointHeight);

		const checkpointBounds = new Bounds({ ...CHECKPOINT_START_BOUNDS, y: checkpointY, height: checkpointHeight });
		const topBlockBounds = new Bounds({ ...BLOCK_START_BOUNDS, y: checkpointY - BLOCK_START_BOUNDS.height });
		const bottomBlockBounds = new Bounds({ ...BLOCK_START_BOUNDS, y: checkpointY + checkpointHeight });

		this._registerTempEntity(new Checkpoint(checkpointBounds));

		this._registerTempEntity(new Block(topBlockBounds, true));
		this._registerTempEntity(new Block(bottomBlockBounds, false));
	}

	private _registerEntity<T extends BaseEntity>(entity: T) {
		return withReturn(entity, (entity) => entity.insertTo(this._scene, this._physics));
	}

	private _registerTempEntity<T extends BaseEntity>(entity: T) {
		return withReturn(this._registerEntity(entity), (target) => this._tempEntities.push(target));
	}
}
