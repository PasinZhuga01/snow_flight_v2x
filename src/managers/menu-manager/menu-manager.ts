import { MenuManagerEventHandlers } from './menu-manager.types';

import { getContainerOrThrow } from '../../helpers';

export class MenuManager {
	private readonly _container: HTMLDivElement;

	public constructor(handlers: MenuManagerEventHandlers) {
		this._container = getContainerOrThrow('.main-menu');

		this._setupHotKeysInput(handlers);
		this._setupButtonClickEventHandlers(handlers);
	}

	public setVisibility(isVisible: boolean) {
		this._container.style.display = isVisible ? '' : 'none';
	}

	private _setupHotKeysInput(handlers: MenuManagerEventHandlers) {
		document.addEventListener('keydown', (event) => {
			switch (event.key) {
				case 'Enter':
					return handlers.play();
			}
		});
	}

	private _setupButtonClickEventHandlers(handlers: MenuManagerEventHandlers) {
		this._setupClickButtonEventHandler('play', handlers.play);
		this._setupClickButtonEventHandler('open-achievements', handlers.openachievements);
	}

	private _setupClickButtonEventHandler(className: string, handler: () => void) {
		getContainerOrThrow(`.menu-button.${className}`).addEventListener('click', handler);
	}
}
