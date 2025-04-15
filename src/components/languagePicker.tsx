import {
  AUTO_LANGUAGE,
  PickerType,
  SOURCE_LANGUAGES,
  TARGET_LANGUAGES
} from "@/constants/languages";
import {
  AutoLanguageCode,
  SourceLanguageCode,
  TargetLanguageCode
} from "@/interfaces/translation";
import { ArrowDownIcon } from "./icons";

type Props =
  | {
      type: PickerType.From;
      onChange: (language: string) => void;
      value: SourceLanguageCode | AutoLanguageCode;
    }
  | {
      type: PickerType.To;
      onChange: (language: string) => void;
      value: TargetLanguageCode;
    };

const LanguagePicker = ({ type, value, onChange }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  const languageCodes =
    type === PickerType.From ? SOURCE_LANGUAGES : TARGET_LANGUAGES;

  return (
    <div className="relative w-[180px]">
      <select
        value={value}
        onChange={handleChange}
        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#ccc1ee] focus:border-transparent bg-white appearance-none"
      >
        {type === PickerType.From && (
          <option value={AUTO_LANGUAGE}>Auto</option>
        )}
        {Object.entries(languageCodes).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <ArrowDownIcon />
      </div>
    </div>
  );
};

export default LanguagePicker;
