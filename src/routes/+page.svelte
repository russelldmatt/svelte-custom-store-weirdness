<script lang="ts">
	export function myWritable(name, initialValue) {
		let currentValue = initialValue;
		let subscriptions = new Set();

		let subscribe = (f) => {
			f(currentValue);
			subscriptions.add(f);
			return function unsubscribe() {
				subscriptions.delete(f);
			};
		};

		function set(value) {
			currentValue = value;
			subscriptions.forEach((f) => f(currentValue));
		}

		function update(f) {
			set(f(currentValue));
		}

		return { subscribe, set, update };
	}

	import Tags from './Tags.svelte';

	let initialA = new Set();
	let a = myWritable('a', initialA);
	console.log({ a: $a });

	let b = myWritable('b', new Set());
	console.log({ b: $b });

	let initialC = new Set();
	let c = myWritable('c', initialC);
	console.log({ c: $c });

	let d = myWritable('d', new Set());
	console.log({ d: $d });
</script>

<Tags bind:activeTags={a} />
<Tags bind:activeTags={b} />

<Tags activeTags={c} />
<Tags activeTags={d} />
