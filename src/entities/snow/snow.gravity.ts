import { BasePhysicsComponent } from 'cyxapiki_engine/physics/objects/components';
import { PhysicsObjectUpdateContext } from 'cyxapiki_engine/physics/objects';
import { VectorObject } from 'cyxapiki_engine/geometry';

export class SnowGravityComponent extends BasePhysicsComponent {
	private readonly _velocity: VectorObject;

	private _noisePhase: number;
	private _noiseSpeed: number;
	private _noiseAmplitude: number;

	public constructor(speed: VectorObject) {
		super();

		this._velocity = { x: speed.x - Math.random() * 1.2, y: speed.y + Math.random() * 1.5 };

		this._noisePhase = Math.random() * Math.PI * 2;
		this._noiseSpeed = 0.01 + Math.random() * 0.02;
		this._noiseAmplitude = 0.02 + Math.random() * 0.04;
	}

	public update({ stateBuffer }: PhysicsObjectUpdateContext) {
		this._noisePhase += this._noiseSpeed;

		const noise = Math.sin(this._noisePhase) * this._noiseAmplitude;

		stateBuffer.bounds.x += this._velocity.x + noise;
		stateBuffer.bounds.y += this._velocity.y;
	}
}
