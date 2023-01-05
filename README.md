# A minimal reproduction of an issue with custom svelte stores

## To reproduce:

```bash
npm install
npm run build
```

You should see output that looks like this:

```
{ a: Set(0) {} }
{ b: undefined }
{ c: Set(0) {} }
{ d: Set(0) {} }
```

The fact that `b` is `undefined` is the bug!

## A very confusing way to "fix" the bug

Now go into [+page.svelte](./src/routes/%2Bpage.svelte) and delete lang="ts" from the script tag.

Run `npm run build` again and...

```
{ a: Set(0) {} }
{ b: Set(0) {} }
{ c: Set(0) {} }
{ d: Set(0) {} }
```

🤯
