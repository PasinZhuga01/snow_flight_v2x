import { Scene } from 'cyxapiki_engine/render';
import { PhysicsManager } from 'cyxapiki_engine/physics';
import { Bounds } from 'cyxapiki_engine/geometry';
import { randomBoolean, randomInteger, withReturn } from 'cyxapiki_engine/utils';

import { BaseEntity, Block, Checkpoint, Player, PlayerEventHandlers, Snow } from '../../entities';
import {
	BLOCK_START_BOUNDS,
	BOTTOM_BORDER_BOUNDS,
	CHECKPOINT_START_BOUNDS,
	GARLAND_TICK_DELAY,
	MAX_SNOWFALL_LENGTH,
	PLAYER_BOUNDS,
	PLAYGROUND_SIZE,
	SNOWFALL_TICK_DELAY,
	STAGE_TICK_DELAY,
	TOP_BORDER_BOUNDS
} from '../../constants';

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

		this._setupBorders();
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

		if (this._stageTick % GARLAND_TICK_DELAY === 0) {
			this._updateBlockGarlands();
		}

		if (this._stageTick % SNOWFALL_TICK_DELAY === 0) {
			this._spawnRandomSnow();
		}

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

		const topBlockHasGarland = randomInteger(1, 3) === 3;
		const bottomBlockHasGarland = randomInteger(1, 3) === 3;

		this._registerTempEntity(new Checkpoint(checkpointBounds));

		this._registerTempEntity(new Block(topBlockBounds, false, true, topBlockHasGarland));
		this._registerTempEntity(new Block(bottomBlockBounds, false, false, bottomBlockHasGarland));
	}

	private _updateBlockGarlands() {
		for (const entity of this._tempEntities) {
			if (entity instanceof Block) {
				entity.toggleGarlandLight();
			}
		}
	}

	private _spawnRandomSnow() {
		const percent = PLAYGROUND_SIZE.x / MAX_SNOWFALL_LENGTH;

		for (let x = percent; x < PLAYGROUND_SIZE.x + PLAYGROUND_SIZE.x / 2; x += percent) {
			if (randomBoolean()) {
				this._registerTempEntity(new Snow(new Bounds({ x, y: 0, width: 4, height: 4 })));
			}
		}
	}

	private _registerEntity<T extends BaseEntity>(entity: T) {
		return withReturn(entity, (entity) => entity.insertTo(this._scene, this._physics));
	}

	private _registerTempEntity<T extends BaseEntity>(entity: T) {
		return withReturn(this._registerEntity(entity), (target) => this._tempEntities.push(target));
	}

	private _setupBorders() {
		this._registerEntity(new Block(new Bounds(TOP_BORDER_BOUNDS), true));
		this._registerEntity(new Block(new Bounds(BOTTOM_BORDER_BOUNDS), true));
	}
}
