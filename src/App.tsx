import React, {useEffect, useState} from 'react';
import './App.css';
import Counter from "./components/Counters/Counter";
import ValueCounter from "./components/Counters/ValueCounter";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./components/state/store";
import {counterValueAC, maxValueAC, renderDisplayAC} from "./components/state/counter-reducer";


function App() {
    const dispatch = useDispatch()

    const renderDisplay = useSelector<AppStateType, boolean>(state => state.counter.renderDisplay); // логика ошибки выбранного значения
    // const [renderDisplay, setRenderDisplay] = useState(false)

    const maxValue = useSelector<AppStateType, number>(state => state.counter.settingsValue.maxValue); // логика настройки max value input
    const startValue = useSelector<AppStateType, number>(state => state.counter.settingsValue.startValue); // логика настройки start value input
    // {maxValue: 0, startValue: 1}

    const [settingsValue, setSettingsValue] = useState<Array<number>>([0, 1])

    const counterValueTest = useSelector<AppStateType, number>(state => state.counter.count); // логика увеличение счётчика
    // const [counterValue, setCounterValue] = useState<number>(settingsValue[0])
    const [counterValue, setCounterValue] = useState<number>(maxValue || 1)

    const increment = () => {
        // if (counterValue < settingsValue[1]) {
        if (maxValue < startValue) {
            // setCounterValue(counterValue + 1)
            setCounterValue(counterValue + 1)
        }
    }

    const reset = () => {
        setCounterValue(settingsValue[0])
        // dispatch(maxValueAC(0))
    }

    const setInLocalStorage = () => {
        localStorage.setItem("setting", JSON.stringify(settingsValue))
        dispatch(renderDisplayAC(false))
        reset()
    }

    // useEffect(() => {
    //     let localStorageValue = localStorage.getItem("setting")
    //     if (localStorageValue) {
    //         setCounterValue(JSON.parse(localStorageValue)[0])
    //         setSettingsValue(JSON.parse(localStorageValue))
    //     }
    // }, [])

    return (
        <div className='header'>

            <ValueCounter
                // changeRendered={setRenderDisplay}
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
