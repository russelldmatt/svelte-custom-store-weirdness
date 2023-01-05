import type { Writable, Updater, Subscriber } from 'svelte/store';

export function myWritable<T>(name: string, initialValue: T): Writable<T> {
	console.log(`${name}'s initial value is ${initialValue}`);
	let currentValue = initialValue;
	let keyCounter = 0;
	let subscriptions: Map<number, Subscriber<T>> = new Map();

	let subscribe = (f: Subscriber<T>) => {
		console.log(`calling [f] for ${name} with currentValue ${currentValue}`);

		f(currentValue);
		let key = (keyCounter += 1);
		subscriptions.set(key, f);
		let unsubscribe = () => subscriptions.delete(key);
		return unsubscribe;
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
