import type * as prismicT from '@prismicio/types';

export type ParagraphsSlice = prismicT.Slice<
  'paragraphs',
  { paragraphs: prismicT.KeyTextField }
>;

export type Slices = ParagraphsSlice;

export type SliceZoneType = prismicT.SliceZone<Slices>;
