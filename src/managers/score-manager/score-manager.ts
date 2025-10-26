import { LocalStorageManager } from 'cyxapiki_engine/storage';

import { getContainerOrThrow } from '../../helpers';

export class ScoreManager {
	private readonly _storage: LocalStorageManager<{ maxScore: number }>;
	private readonly _scoreContainer: HTMLDivElement;
	private readonly _maxScoreContainer: HTMLDivElement;

	private _score: number;
	private _maxScore: number;

	public constructor() {
		this._storage = new LocalStorageManager({
			maxScore: {
				value: 0,
				parse: (value) => (typeof value === 'number' ? { isOk: true, value } : { isOk: false })
			}
		});

		this._score = 0;
		this._maxScore = this._storage.getItem('maxScore');

		this._scoreContainer = getContainerOrThrow('.score');
		this._maxScoreContainer = getContainerOrThrow('.max-score');

		this.updateScore(false);
		this.updateMaxScore();
	}

	public get score(): number {
		return this._score;
	}

	public get maxScore(): number {
		return this._maxScore;
	}

	public reset() {
		this._score = 0;
		this.updateScore(false);
	}

	public updateScore(isIncrement: boolean) {
		this._score += Number(isIncrement);
		this._scoreContainer.innerText = String(this._score);
	}

	public updateMaxScore() {
		if (this._score > this._storage.getItem('maxScore')) {
			this._storage.setItem('maxScore', this._score);
		}

		const maxScore = this._storage.getItem('maxScore');

		this._maxScore = maxScore;
		this._maxScoreContainer.innerText = String(maxScore);
	}
}
