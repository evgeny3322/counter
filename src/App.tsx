import React, {useEffect, useState} from 'react';
import './App.css';
import Counter from "./components/Counters/Counter";
import ValueCounter from "./components/Counters/ValueCounter";


function App() {
    const [renderDisplay, setRenderDisplay] = useState(false)
    const [settingsValue, setSettingsValue] = useState<Array<number>>([0, 1])
    const [counterValue, setCounterValue] = useState<number>(settingsValue[0])

    const increment = () => {
        if (counterValue < settingsValue[1]) {
            setCounterValue(counterValue + 1)
        }
    }

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

    return (
        <div className='header'>

            <ValueCounter changeRendered={setRenderDisplay}
                          onClickCallback={setInLocalStorage}
                          onChangeCallback={setSettingsValue}
                          settingsValue={settingsValue}
            />

            <Counter
                rendered={renderDisplay}
                setCounterValue={setCounterValue}
                increment={increment}
                reset={reset}
                valueCounter={counterValue}
                settingsValue={settingsValue}
            />

        </div>
    )
}

export default App;
