import { Achievement } from '../types';

export const PLAYGROUND_SIZE = { x: 960, y: 540 } as const;
export const STAGE_TICK_DELAY = 90;
export const GARLAND_TICK_DELAY = 20;

export const PLAYER_BOUNDS = { x: 300, y: 190, width: 76, height: 66 } as const;

export const BLOCK_START_BOUNDS = { x: PLAYGROUND_SIZE.x, width: 150, height: PLAYGROUND_SIZE.y * 0.75 } as const;
export const CHECKPOINT_START_BOUNDS = { x: BLOCK_START_BOUNDS.x, width: BLOCK_START_BOUNDS.width } as const;

export const TOP_BORDER_BOUNDS = { ...PLAYER_BOUNDS, y: -PLAYER_BOUNDS.height * 2, height: 1 };
export const BOTTOM_BORDER_BOUNDS = { ...PLAYER_BOUNDS, y: PLAYGROUND_SIZE.y + PLAYER_BOUNDS.height * 2, height: 1 };

export const SOUNDS = {
	BACK: ['assets/sounds/back_0.mp3', 'assets/sounds/back_1.mp3', 'assets/sounds/back_2.mp3', 'assets/sounds/back_3.mp3'],
	LOSE: ['assets/sounds/finish.mp3']
} as const satisfies Record<string, [string, ...string[]]>;

export const ACHIEVEMENTS = [
	{
		title: 'Первый вздох',
		description: 'Новое приключение начинается здесь и сейчас.',
		score: 0
	},
	{
		title: 'Фракция снежинок',
		description: 'Каждая снежинка уникальна — как и ваш путь! (5 очков).',
		score: 5
	},
	{
		title: 'Ритм сердца',
		description: 'Вы находитесь в потоке. Продолжайте! (10 очков).',
		score: 10
	},
	{
		title: 'Первые звёзды',
		description: 'Ночь ещё молода, но огни уже зажигаются. (25 очков).',
		score: 25
	},
	{
		title: 'Древняя мудрость',
		description: 'Зима символизирует подготовку к возрождению. Вы готовитесь к великому! (50 очков).',
		score: 50
	},
	{
		title: 'Перекрёсток дорог',
		description: 'Каждый выбор приближает вас к цели. (75 очков).',
		score: 75
	},
	{
		title: 'Звёздный свет',
		description: 'Вы светитесь так ярко, что видны издалека! (100 очков).',
		score: 100
	},
	{
		title: 'Голос природы',
		description: 'Ваш успех резонирует с самой землёй. (200 очков).',
		score: 200
	},
	{
		title: 'Пик мастерства',
		description: 'Навык становится второй природой. (300 очков).',
		score: 300
	},
	{
		title: 'Тень победы',
		description: 'Слава уже видит вас издалека. (400 очков).',
		score: 400
	},
	{
		title: 'Врата величия',
		description: 'Вы подошли к пороговому моменту. Скоро произойдёт чудо! (500 очков).',
		score: 500
	},
	{
		title: 'Знак судьбы',
		description: 'Космос подмигивает вам в ответ. (600 очков).',
		score: 600
	},
	{
		title: 'Предчувствие',
		description: 'Воздух пахнет переменами. Что-то великое рождается! (750 очков).',
		score: 750
	},
	{
		title: 'Гармония стихий',
		description: 'Вы нашли баланс между волей и мудростью. (800 очков).',
		score: 800
	},
	{
		title: 'На краю',
		description: 'Вы почти там. Финальный рывок впереди! (900 очков).',
		score: 900
	},
	{
		title: 'Последний луч уходящего года',
		description: 'Солнце садится на 2025 году. Ваша легенда завершена. (1000 очков).',
		score: 1000
	},
	{
		title: 'Край времени',
		description: 'Между настоящим и будущим — только ваш выбор. (1200 очков).',
		score: 1200
	},
	{
		title: 'С новым годом, 2026!',
		description: 'Часы пробили полночь — начало новой эры! (2026 очков).',
		score: 2026
	}
] as const satisfies Achievement[];
