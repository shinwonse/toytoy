import esbuild from 'esbuild';
import pkg from './package.json' assert { type: 'json' };

const dev = process.argv.includes('--dev');
const minify = !dev;

const watch = process.argv.includes('--watch');

const external = Object.keys({
  ...pkg.devDependencies,
  ...pkg.peerDependencies,
});

const baseConfig = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify,
  sourcemap: true,
  outdir: 'dist',
  target: 'es2019',
  watch,
  external,
};

Promise.all([
  esbuild.build({
    ...baseConfig,
    format: 'esm',
  }),
  esbuild.build({
    ...baseConfig,
    outExtension: { '.js': '.cjs' },
  })
]).catch(() => {
  console.error('Build failed');
  process.exit(1);
});

