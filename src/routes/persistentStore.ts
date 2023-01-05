import type { Writable, Updater, Subscriber } from 'svelte/store';

export function myWritable<T>(name: string, initialValue: T): Writable<T> {
	let currentValue = initialValue;
	let subscriptions: Set<Subscriber<T>> = new Set();

	let subscribe = (f: Subscriber<T>) => {
		f(currentValue);
		subscriptions.add(f);
		return function unsubscribe() {
			subscriptions.delete(f);
		};
	};

	function set(value: T) {
		currentValue = value;
		subscriptions.forEach((f) => f(currentValue));
	}

	function update(f: Updater<T>) {
		set(f(currentValue));
	}

	return { subscribe, set, update };
}
