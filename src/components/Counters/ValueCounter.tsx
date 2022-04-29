import React, {ChangeEvent, useState} from 'react';
import s from "./ValueCounter.module.css";
import {SuperButton} from "../Button/SuperButton";
import {renderDisplayAC} from "../state/counter-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../state/store";

type ValueCounterTypeProps = {
    settingsValue: Array<number>
    onChangeCallback: (value: Array<number>) => void
    onClickCallback: () => void
}


const ValueCounter = (props: ValueCounterTypeProps) => {
    const dispatch = useDispatch()

    const [error, setError] = useState<boolean>(false) // максимальное значение для input
    const maxValue = useSelector<AppStateType, number>(state => state.counter.settingsValue.maxValue); // логика настройки max value input
    const startValue = useSelector<AppStateType, number>(state => state.counter.settingsValue.startValue); // логика настройки start value input

    const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(renderDisplayAC(true))
        Number(e.currentTarget.value) > props.settingsValue[0] ? setError(false) : setError(true)
        Number(e.currentTarget.value) > props.settingsValue[0] && props.onChangeCallback([props.settingsValue[0], Number(e.currentTarget.value)])
    }

    const handleStartChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(renderDisplayAC(true))
        if (Number(e.currentTarget.value) < props.settingsValue[1] && Number(e.currentTarget.value) >= 0) {
            setError(false)
            props.onChangeCallback([Number(e.currentTarget.value), props.settingsValue[1]])
        } else setError(true)
    }

    return (
        <div className={s.counter}>
            <div className={s.counterBody}>
                <div className={s.counterNumber}>
                    <div>
                        <div className={s.counterValueMax}>
                            <span>max value:</span>
                            <input
                                className={s.counterInputValue}
                                type="number"
                                value={props.settingsValue[1]}
                                onChange={handleMaxChange}/>
                        </div>
                    </div>
                    <div>
                        <div className={s.counterValueStart}>
                            <span>start value:</span>
                            <input className={s.counterInputValue} type="number" value={props.settingsValue[0]}
                                   onChange={handleStartChange}/>
                        </div>
                    </div>
                </div>
                <div className={s.counterFunction}>
                    <SuperButton callback={props.onClickCallback} title={"set"}/>
                </div>
            </div>
        </div>
    );
};

export default ValueCounter;