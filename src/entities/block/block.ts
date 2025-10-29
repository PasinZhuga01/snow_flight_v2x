import { Bounds } from 'cyxapiki_engine/geometry';
import { Sprite } from 'cyxapiki_engine/render/graphics';
import { SceneObject } from 'cyxapiki_engine/render';

import { BlockPhysics } from './block.physics';

import { BaseEntity } from '../base-entity/base-entity';
import { sprites } from '../sprites';

export class Block extends BaseEntity<SceneObject<Sprite> | null, BlockPhysics> {
	public constructor(bounds: Bounds, isBorder: true);
	public constructor(bounds: Bounds, isBorder: false, isTopBlock: boolean);

	public constructor(bounds: Bounds, isBorder: boolean, isTopBlock?: boolean) {
		const sprite = isBorder ? null : isTopBlock ? sprites.topBlock : sprites.bottomBlock;
		const sceneObject = sprite === null ? null : new SceneObject(bounds, sprite);

		const physics = new BlockPhysics(bounds, isBorder);

		super(bounds, sceneObject, physics);
	}
}
