<script lang="ts">
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

	import Tags from './Tags.svelte';

	let initialA: Set<string> = new Set();
	let a = myWritable('a', initialA);
	console.log({ a: $a });

	let b = myWritable('b', new Set());
	console.log({ b: $b });

	let initialC: Set<string> = new Set();
	let c = myWritable('c', initialC);
	console.log({ c: $c });

	let d = myWritable('d', new Set());
	console.log({ d: $d });
</script>

<Tags bind:activeTags={a} />
<Tags bind:activeTags={b} />

<Tags activeTags={c} />
<Tags activeTags={d} />
