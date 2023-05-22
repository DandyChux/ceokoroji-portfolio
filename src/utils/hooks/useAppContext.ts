import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

export default function useAppContext() {
    const context = useContext(AppContext)

    return context
}