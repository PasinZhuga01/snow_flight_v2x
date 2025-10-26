export type SliderEventMap = { change: (value: number) => void };

export interface SliderConfig {
	value: number;
	min: number;
	max: number;
}
