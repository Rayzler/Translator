import { SectionType } from "../types.d";
import { ChangeEvent, CSSProperties } from "react";

interface Props {
    type: SectionType;
    loading?: boolean | undefined;
    value: string;
    onChange: (text: string) => void;
}

const style = {
    minHeight: "200px",
    resize: "none",
    fieldSizing: "content"
};

function TextArea({ loading, value, onChange, type }: Props) {
    const placeholder = loading ? "Loading..." :
        type === SectionType.From ? "Enter text" : "Translation";

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value);
    };

    return (
        <textarea className={`p-3 w-full h-full text-2xl outline-0 bg-transparent`}
                  placeholder={placeholder} autoFocus={type === SectionType.From}
                  value={value} onChange={handleChange} readOnly={type === SectionType.To}
                  style={style as CSSProperties} />
    );
}

export default TextArea;