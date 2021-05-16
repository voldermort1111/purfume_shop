import { EventEmitter } from 'events';

export class EventEmitterPerfume {
	static eventEmitter: EventEmitter;

	static getEventEmitter() {
		if (!EventEmitterPerfume.eventEmitter) {
			EventEmitterPerfume.eventEmitter = new EventEmitter();
		}
		return EventEmitterPerfume.eventEmitter;
	}
}
