import { Vector, VectorObject } from 'cyxapiki_engine/geometry';
import { Sprite, Bitmap, SpriteConfig } from 'cyxapiki_engine/render/graphics';

export function createSprite(src: string, size: VectorObject, config: Partial<SpriteConfig> = {}): Sprite {
	const sprite = new Sprite(new Vector(size), config);

	Bitmap.get(`assets/images/${src}`).then((bitmap) => (sprite.source = bitmap));

	return sprite;
}
