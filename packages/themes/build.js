import run from '@toytoy/esbuild-config';
import pkg from './package.json' assert { type: 'json' };

run({ pkg });
