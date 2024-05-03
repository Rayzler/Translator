import "./App.css";
import useTranslationStore from "./hooks/useTranslationStore.ts";
import { AUTO_LANGUAGE, BCP47_LANGUAGES } from "./constants.ts";
import { ClipboardIcon, SpeakerIcon, SwitchIcon } from "./components/Icons.tsx";
import LanguageSelector from "./components/LanguageSelector.tsx";
import { BodyRequestAPI, SectionType } from "./types.d";
import TextArea from "./components/TextArea.tsx";
import { useEffect, useRef } from "react";
import useDebounce from "./hooks/useDebounce.ts";

function App() {
    const {
        fromLanguage,
        toLanguage,
        fromText,
        result,
        loading,
        interchangeLanguages,
        setFromLanguage,
        setToLanguage,
        setFromText,
        setResult
    } = useTranslationStore();
    const lastSearch = useRef("");
    const debouncedFromText = useDebounce(fromText, 350);

    const handleTranslate = async () => {
        const body: BodyRequestAPI = {
            "text": debouncedFromText.trim(),
            "target_lang": toLanguage
        };
        if (fromLanguage !== AUTO_LANGUAGE)
            body["source_lang"] = fromLanguage;

        fetch("http://localhost:3000/translate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => setResult(data.result))
            .catch(() => {
                alert("An error occurred while translating the text.");
                setResult("");
            });
    };

    const handleCopy = async () => {
        if (result.trim() === "") return;
        await navigator.clipboard.writeText(result);
    };

    const handleSpeak = async () => {
        if (result.trim() === "") return;

        const utterance = new SpeechSynthesisUtterance(result);
        utterance.lang = BCP47_LANGUAGES[toLanguage];
        speechSynthesis.speak(utterance);
    };

    useEffect(() => {
        if (debouncedFromText.trim() === lastSearch.current) return;
        lastSearch.current = debouncedFromText.trim();

        if (debouncedFromText.trim() === "") return;

        (async () => {
            await handleTranslate();
        })();
    }, [debouncedFromText]);

    useEffect(() => {
        if (debouncedFromText.trim() === "") return;

        (async () => {
            await handleTranslate();
        })();
    }, [toLanguage, fromLanguage]);

    return (
        <div className={"w-screen"}>
            <h1 className={"text-center mb-5 text-3xl"}>Translate</h1>
            <div className={"flex flex-wrap sm:flex-nowrap w-full gap-4 justify-center px-6"}>
                <div className={"flex flex-col gap-3 w-screen sm:w-96"}>
                    <LanguageSelector type={SectionType.From} onChange={setFromLanguage} value={fromLanguage} />
                    <div className={"relative grow rounded-xl bg-neutral-50 dark:bg-neutral-900 pb-14"}>
                        <TextArea type={SectionType.From} value={fromText} onChange={setFromText} />
                    </div>
                </div>
                <div>
                    <button disabled={fromLanguage === AUTO_LANGUAGE}
                            onClick={
                                () => interchangeLanguages()
                            } className={"py-1"}>
                        <SwitchIcon size={30} />
                    </button>
                </div>
                <div className={"flex flex-col gap-3 w-screen sm:w-96"}>
                    <LanguageSelector type={SectionType.To} onChange={setToLanguage} value={toLanguage} />
                    <div className={"relative grow rounded-xl bg-neutral-200 dark:bg-neutral-800 pb-14"}>
                        <TextArea type={SectionType.To} loading={loading} value={result} onChange={setResult} />
                        <div className={"flex absolute left-2 bottom-2 p-2 gap-6"}>
                            <button onClick={handleCopy}>
                                <ClipboardIcon size={26} />
                            </button>
                            <button onClick={handleSpeak}>
                                <SpeakerIcon size={26} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
