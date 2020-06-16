import {
  STORAGE_KEY,
  DEFAULT_BLOCK_WIDTH,
  DEFAULT_BLOCK_HEIGHT,
} from '@/constants/';
import Block from '@/helpers/Block';
import storage from '@/helpers/storage';

// eslint-disable-next-line import/prefer-default-export
export const getBlocks = () => {
  const blocks = storage.getItem(STORAGE_KEY);
  if (Array.isArray(blocks)) {
    return blocks;
  }

  return Array.from({ length: 5 }, (v, k) => {
    const title = `Block${k + 1}`;
    const width = DEFAULT_BLOCK_WIDTH;
    const height = DEFAULT_BLOCK_HEIGHT;
    const x = 0;
    const y = k > 0 ? (height * k) : 0;
    const z = 0;
    return new Block(k, title, width, height, x, y, z);
  });
};
