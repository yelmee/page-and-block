import {
    type Block,
    type BlockMapType,
    type DecorationType,
    type FontStyle,
    type map,
    type MapFontStyle,
    type NotNull,
    type RowContentType,
    type SubDecorationType,
} from "~/types/Block";
import React
    from "react";


const getNeedToUpdate =() => {
    const blockList: BlockMapType = {}
    const updateList  = []
    for (const [key, value] of Object.entries(blockList)) {
        if (value.value.last_updated < value.value.last_modified) {
            updateList.push(key)
        }
    }
    return updateList
}

const styleMap = {
    b: "font-bold",
    i: "italic",
    s: "line-through",
    c: "bg-gray-100 font-mono px-1 rounded text-sm",
} as const;

type StyleKey = keyof typeof styleMap;
type ClassName = (typeof styleMap)[StyleKey];

const reverseStyleMap: Record<ClassName, StyleKey> = Object.entries(styleMap).reduce(
    (acc, [key, value]) => {
        acc[value] = key as StyleKey;
        return acc;
    },
    {} as Record<ClassName, StyleKey>
);

const getCSSStyle = (decorationText: CSSStyleDeclaration): string[] =>{
    return  decorationText.textDecoration.split(" ")
}


const getClassNames = (decorations: SubDecorationType[] ): string => {
    return decorations
        .map(([key]) => styleMap[key])
        .filter(Boolean)
        .join(" ");
}

const parseKeyEvent = (keyEventValue: React.ChangeEvent<HTMLTextAreaElement>, block: Block): RowContentType[] =>{
    let style = ""
    let text= ""
    let preSymbol= ""
    switch (block.value.type) {
        case "select":
        case "relation":
            const val = keyEventValue.target.value.split('●');
            const preSymbol =  val[0]
            const style = getCSSStyle(keyEventValue.target.style)
            const text = getCSSStyle(val[1]).text
            break;
        case 'checkbox':

        // case 'title':

        case "number":


    }
    return {
        text, style,
    }
}


export {getNeedToUpdate, getCSSStyle, parseKeyEvent}