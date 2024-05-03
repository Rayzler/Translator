import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from "../constants.ts";
import { type AutoLanguage, type Language, SectionType } from "../types.d";
import { ChangeEvent } from "react";

type Props =
    | { type: SectionType.From, onChange: (language: Language | AutoLanguage) => void, value: Language | AutoLanguage }
    | { type: SectionType.To, onChange: (language: Language) => void, value: Language };

function LanguageSelector({ type, value, onChange }: Props) {
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value as Language);
    };

    return (
        <select aria-label="Select language" onChange={handleChange} value={value}
                className={"outline outline-1 outline-black/25 dark:outline-white/50 rounded-lg px-4 py-2"}>
            {
                type === SectionType.From && (
                    <option value={AUTO_LANGUAGE}>Auto</option>
                )
            }
            {

                Object.entries(SUPPORTED_LANGUAGES).map(([key, value]) => (
                    <option key={key} value={key}>
                        {value}
                    </option>
                ))
            }
        </select>
    );
}

export default LanguageSelector;