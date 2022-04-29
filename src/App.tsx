import React, {useEffect, useState} from 'react';
import './App.css';
import Counter from "./components/Counters/Counter";
import ValueCounter from "./components/Counters/ValueCounter";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./components/state/store";
import {maxValueAC, renderDisplayAC} from "./components/state/counter-reducer";


function App() {

    const dispatch = useDispatch()

    const renderDisplay = useSelector<AppStateType, boolean>(state => state.counter.renderDisplay); // логика ошибки выбранного значения
    const maxValue = useSelector<AppStateType, number>(state => state.counter.settingsValue.maxValue); // логика настройки max value input
    const startValue = useSelector<AppStateType, number>(state => state.counter.settingsValue.startValue); // логика настройки start value input
    // {maxValue: 0, startValue: 1},
    const [settingsValue, setSettingsValue] = useState<Array<number>>([0, 1])

    // Перепиши для двух значений
    // const [startValue,setStartValue] = useState<Array<number>>([1])
    // const [maxValue,setMaxValue] = useState<Array<number>>([0])

    const [counterValue, setCounterValue] = useState<number>(maxValue )
    // const [counterValue, setCounterValue] = useState<number>(maxValue || 10)

    const increment = () => {
        if (counterValue < maxValue) {
            setCounterValue(counterValue + 1)
        }
    }

    const reset = () => {
        setCounterValue(maxValue)
    }

    const setInLocalStorage = () => {
        localStorage.setItem("setting", JSON.stringify(maxValue))
        dispatch(renderDisplayAC(false))
        reset()
    }

    useEffect(() => {
        let localStorageValue = localStorage.getItem("setting")
        if (localStorageValue) {
            setCounterValue(JSON.parse(localStorageValue)[0])
            // setSettingsValue(JSON.parse(localStorageValue))
            dispatch(maxValueAC(JSON.parse(localStorageValue)))
        }
    }, [])

    return (
        <div className='header'>

            <ValueCounter
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
