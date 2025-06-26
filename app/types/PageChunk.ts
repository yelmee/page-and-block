import {
    namedTypes
} from "ast-types";
import Block = namedTypes.Block;

type PageChunk = {
    pageId: string;
    limit: number;
    cursor: { stack: string[] };
    chunkNumber: number;
};

// ✔ cursor: 다음 데이터를 불러올 위치 (페이징)
// ✔ chunkNumber: 현재 요청 중인 청크(페이지) 번호

type BlockInfo = {
    [T: string]: {
        value: Pick<Block, "block_id" | "type" | "properties">;
    };
};

type PageChunkReturn = {
    block: BlockInfo[];
};
//     {
//   recordMap: {
//     block: {
//       block_id_1: {
//         value: {
//           id: "block_id_1";
//           type: "text";
//           properties: { title: [["Hello, Notion!"]] };
//         };
//       };
//     };
//   };
// };

export type { PageChunk, PageChunkReturn };
