
import React
    from "react";

type PropsBlockTextInput = {
    text: string;
    preSymbol?: string
    checkbox?: boolean
    style?: string
    // handleInputEvent: (inputValue: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function Block(props: PropsBlockTextInput) {

    return (
        <div className="">
            props.checkbox && <input type="checkbox" checked={props.checkbox}/>
            props.preSymbol && <span className="block-pre-symbol">{props.preSymbol} </span>
            props.text && <textarea className={"whitespace-break-spaces"+props.style? props.style : ""}>
                {props.text}
            </textarea>
        </div>
    )
}