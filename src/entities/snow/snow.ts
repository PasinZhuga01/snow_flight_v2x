import { Bounds } from 'cyxapiki_engine/geometry';
import { Sprite } from 'cyxapiki_engine/render/graphics';
import { SceneObject } from 'cyxapiki_engine/render';

import { SnowPhysics } from './snow.physics';

import { BaseEntity } from '../base-entity/base-entity';
import { sprites } from '../sprites';

export class Snow extends BaseEntity<SceneObject<Sprite> | null> {
	public constructor(bounds: Bounds) {
		super(bounds, new SceneObject(bounds, sprites.snow), new SnowPhysics(bounds), -1);
	}
}
