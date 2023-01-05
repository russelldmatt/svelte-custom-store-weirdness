<script lang="ts">
	import { myWritable } from './persistentStore';
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
