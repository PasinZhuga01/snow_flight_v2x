import { Bounds } from 'cyxapiki_engine/geometry';
import { Sprite } from 'cyxapiki_engine/render/graphics';
import { SceneObject } from 'cyxapiki_engine/render';

import { BlockPhysics } from './block.physics';

import { BaseEntity } from '../base-entity/base-entity';
import { sprites } from '../sprites';

export class Block extends BaseEntity<SceneObject<Sprite> | null, BlockPhysics> {
	private readonly _isTopBlock: boolean;

	private _isFirstGarlandMode?: boolean;

	public constructor(bounds: Bounds, isBorder: true);
	public constructor(bounds: Bounds, isBorder: false, isTopBlock: boolean, hasGarland: boolean);

	public constructor(bounds: Bounds, isBorder: boolean, isTopBlock: boolean = false, hasGarland: boolean = false) {
		const sprite = isBorder ? null : isTopBlock ? sprites.topBlock : sprites.bottomBlock;
		const sceneObject = sprite === null ? null : new SceneObject(bounds, sprite);

		const physics = new BlockPhysics(bounds, isBorder);

		super(bounds, sceneObject, physics);

		this._isTopBlock = isTopBlock;

		if (hasGarland) {
			this._isFirstGarlandMode = true;
			this.toggleGarlandLight();
		}
	}

	public toggleGarlandLight() {
		if (this._isFirstGarlandMode !== undefined && this._sceneObject !== null) {
			if (this._isTopBlock) {
				this._sceneObject.graphic = this._isFirstGarlandMode ? sprites.topBlockWithGarlands0 : sprites.topBlockWithGarlands1;
			} else {
				this._sceneObject.graphic = this._isFirstGarlandMode ? sprites.bottomBlockWithGarlands0 : sprites.bottomBlockWithGarlands1;
			}

			this._isFirstGarlandMode = !this._isFirstGarlandMode;
		}
	}
}
