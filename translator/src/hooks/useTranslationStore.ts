import { useReducer } from "react";
import { AutoLanguage, Language, TranslationAction, TranslationState } from "../types";
import { AUTO_LANGUAGE } from "../constants.ts";

const initialState: TranslationState = {
    fromLanguage: "auto",
    toLanguage: "en-US",
    fromText: "",
    result: "",
    loading: false
};

function reducer(state: TranslationState, action: TranslationAction): TranslationState {
    const { type } = action;

    switch (type) {
        case "INTERCHANGE_LANGUAGES":
            return state.fromLanguage === AUTO_LANGUAGE ? state : {
                ...state,
                fromLanguage: state.toLanguage,
                toLanguage: state.fromLanguage,
                result: "",
                loading: state.fromText.trim() !== "",
                fromText: state.result
            };
        case "SET_FROM_LANGUAGE":
            if (state.fromLanguage === action.payload) return state;
            
            return {
                ...state,
                fromLanguage: action.payload,
                result: "",
                loading: state.fromText.trim() !== ""
            };
        case "SET_TO_LANGUAGE":
            if (state.toLanguage === action.payload) return state;
            
            return {
                ...state,
                toLanguage: action.payload,
                loading: state.fromText.trim() !== "",
                result: ""
            };
        case "SET_FROM_TEXT":
            return {
                ...state,
                loading: action.payload.trim() !== "",
                fromText: action.payload,
                result: ""
            };
        case "SET_RESULT":
            return {
                ...state,
                loading: false,
                result: action.payload
            };
        default:
            return state;
    }
}

export default function useTranslationStore() {
    const [{
        fromLanguage,
        toLanguage,
        fromText,
        result,
        loading
    }, dispatch] = useReducer(reducer, initialState);

    const interchangeLanguages = () => dispatch({ type: "INTERCHANGE_LANGUAGES" });
    const setFromLanguage = (fromLanguage: Language | AutoLanguage) => dispatch({ type: "SET_FROM_LANGUAGE", payload: fromLanguage });
    const setToLanguage = (toLanguage: Language) => dispatch({ type: "SET_TO_LANGUAGE", payload: toLanguage });
    const setFromText = (fromText: string) => dispatch({ type: "SET_FROM_TEXT", payload: fromText });
    const setResult = (result: string) => dispatch({ type: "SET_RESULT", payload: result });

    return {
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
    };
}