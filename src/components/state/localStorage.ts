import {useEffect, useState} from "react";

const [renderDisplay, setRenderDisplay] = useState(false)
const [settingsValue, setSettingsValue] = useState<Array<number>>([0, 1]) //раздели
const [counterValue, setCounterValue] = useState<number>(settingsValue[0])

export const Localstorage = () => {

    const reset = () => {
        setCounterValue(settingsValue[0])
    }

    const setInLocalStorage = () => {
        localStorage.setItem("setting", JSON.stringify(settingsValue))
        setRenderDisplay(false)
        reset()
    }

    useEffect(() => {
        let localStorageValue = localStorage.getItem("setting")
        if (localStorageValue) {
            setCounterValue(JSON.parse(localStorageValue)[0])
            setSettingsValue(JSON.parse(localStorageValue))
        }
    }, [])
}