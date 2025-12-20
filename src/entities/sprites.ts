import { Sprite } from 'cyxapiki_engine/render/graphics';
import { Vector } from 'cyxapiki_engine/geometry';

import { createSprite } from './helpers';

import { BLOCK_START_BOUNDS, PLAYER_BOUNDS } from '../constants';

export const sprites = {
	player: createSprite('player.png', { x: PLAYER_BOUNDS.width, y: PLAYER_BOUNDS.height }),
	snow: createSprite('snow.png', { x: 8, y: 8 }),
	topBlock: createSprite(
		'block.png',
		{ x: BLOCK_START_BOUNDS.width, y: BLOCK_START_BOUNDS.height },
		{ scale: new Vector({ x: 1, y: -1 }) }
	),
	bottomBlock: createSprite('block.png', { x: BLOCK_START_BOUNDS.width, y: BLOCK_START_BOUNDS.height }),

	topBlockWithGarlands0: createSprite(
		'block_with_garlands_0.png',
		{ x: BLOCK_START_BOUNDS.width, y: BLOCK_START_BOUNDS.height },
		{ scale: new Vector({ x: 1, y: -1 }) }
	),
	bottomBlockWithGarlands0: createSprite('block_with_garlands_0.png', { x: BLOCK_START_BOUNDS.width, y: BLOCK_START_BOUNDS.height }),

	topBlockWithGarlands1: createSprite(
		'block_with_garlands_1.png',
		{ x: BLOCK_START_BOUNDS.width, y: BLOCK_START_BOUNDS.height },
		{ scale: new Vector({ x: 1, y: -1 }) }
	),
	bottomBlockWithGarlands1: createSprite('block_with_garlands_1.png', { x: BLOCK_START_BOUNDS.width, y: BLOCK_START_BOUNDS.height })
} as const satisfies Record<string, Sprite>;
