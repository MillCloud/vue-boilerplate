import pkg from '@/../package.json';

export { default as pkg } from '@/../package.json';

export const DefaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'X-Requested-With': 'XMLHttpRequest',
  'X-Version': `${pkg.name}/${pkg.version}`,
};

export const PageLimits: TPageLimit[] = [10, 20, 50, 100, 200, 500];
