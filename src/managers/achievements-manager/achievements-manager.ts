import { AchievementView } from './achievements-manager.types';

import { getContainerOrThrow } from '../../helpers';
import { Achievement } from '../../types';

export class AchievementsManager {
	private readonly _container: HTMLDivElement;
	private readonly _achievementsViews: Set<AchievementView>;

	public constructor(close: () => void, maxScore: number, achievements: Achievement[]) {
		this._container = getContainerOrThrow('.achievements-container');
		this._achievementsViews = this._createAchievementsViews(achievements);

		this._setupClickClose(close);
		this.updateNotOpened(maxScore);
	}

	public setVisibility(isVisible: boolean) {
		this._container.style.display = isVisible ? '' : 'none';
	}

	public updateNotOpened(maxScore: number) {
		for (const { score, container } of this._achievementsViews) {
			if (score > maxScore) {
				container.classList.add('not-opened');
				continue;
			}

			container.classList.remove('not-opened');
		}
	}

	private _setupClickClose(handler: () => void) {
		getContainerOrThrow('.achievements-container .close').addEventListener('click', handler);
	}

	private _createAchievementsViews(achievements: Achievement[]): Set<AchievementView> {
		const containers = new Set<AchievementView>();

		const template = getContainerOrThrow<HTMLTemplateElement>('.achievement-template');
		const listContainer = getContainerOrThrow('.achievements');

		for (const { title, description, score } of achievements) {
			const fragment = template.content.cloneNode(true);

			if (!(fragment instanceof DocumentFragment)) {
				throw new Error('Achievement container has invalid format');
			}

			const container = fragment.firstElementChild;

			if (container === null) {
				throw new Error('Achievement container has invalid format');
			}

			getContainerOrThrow('.title', fragment).innerText = title;
			getContainerOrThrow('.description', fragment).innerText = description;

			listContainer.appendChild(fragment);
			containers.add({ score, container });
		}

		return containers;
	}
}
