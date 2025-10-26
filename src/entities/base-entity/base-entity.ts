import { Bounds } from 'cyxapiki_engine/geometry';
import { Scene, SceneObject } from 'cyxapiki_engine/render';
import { PhysicsManager } from 'cyxapiki_engine/physics';
import { BasePhysicsObject } from 'cyxapiki_engine/physics/objects';

export abstract class BaseEntity<
	TSceneObject extends SceneObject | null = SceneObject | null,
	TPhysics extends BasePhysicsObject = BasePhysicsObject
> {
	protected readonly _bounds: Bounds;

	protected readonly _sceneObject: TSceneObject;
	protected readonly _physicsObject: TPhysics;

	protected constructor(bounds: Bounds, sceneObject: TSceneObject, physicsObject: TPhysics) {
		this._bounds = bounds;

		this._sceneObject = sceneObject;
		this._physicsObject = physicsObject;
	}

	public isOffscreenLeft(): boolean {
		return this._bounds.x <= -this._bounds.width;
	}

	public insertTo(scene: Scene, physics: PhysicsManager) {
		if (this._sceneObject !== null) {
			scene.insert(0, this._sceneObject);
		}

		physics.insertImportant(this._physicsObject);
	}

	public extractFrom(scene: Scene, physics: PhysicsManager) {
		if (this._sceneObject !== null) {
			scene.extract(0, this._sceneObject);
		}

		physics.extract(this._physicsObject);
	}
}
