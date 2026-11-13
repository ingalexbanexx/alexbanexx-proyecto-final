import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';

const output = new URL('../dist/', import.meta.url);
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const entry of ['index.html', 'pages', 'assets']) {
  await cp(new URL('../' + entry, import.meta.url), new URL(entry, output), { recursive: true });
}

const css = await readFile(new URL('../styles/styles.css', import.meta.url), 'utf8');
await mkdir(new URL('styles/', output));
await writeFile(new URL('styles/styles.css', output), css.replace(/\n?\/\*# sourceMappingURL=.*?\*\/\s*$/, '\n'));
