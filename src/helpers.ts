export function getContainerOrThrow<T extends HTMLElement>(selector: string, source: ParentNode = document): T {
	const container = source.querySelector<T>(selector);

	if (container === null) {
		throw new Error(`Container with selector "${selector}" is not defined.`);
	}

	return container;
}
