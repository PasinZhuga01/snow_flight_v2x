import { Bounds } from 'cyxapiki_engine/geometry';
import { Sprite } from 'cyxapiki_engine/render/graphics';
import { SceneObject } from 'cyxapiki_engine/render';

import { BlockPhysics } from './block.physics';

import { BaseEntity } from '../base-entity/base-entity';
import { sprites } from '../sprites';

export class Block extends BaseEntity<SceneObject<Sprite>, BlockPhysics> {
	public constructor(bounds: Bounds, isTopBlock: boolean) {
		const sprite = isTopBlock ? sprites.topBlock : sprites.bottomBlock;

		super(bounds, new SceneObject(bounds, sprite), new BlockPhysics(bounds));
	}
}
