export type LoadPageChunk = {
    pageId: number;
    limit: number;
    cursor: { stack: number[] };
    chunkNumber: number;
    verticalColumns: boolean;
};
