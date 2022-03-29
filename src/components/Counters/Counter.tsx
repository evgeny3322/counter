import React from 'react';
import s from './Counter.module.css'
import {SuperButton} from "../Button/SuperButton";

type CounterPropsType = {
    increment: () => void
    reset: () => void
    valueCounter: number
    setCounterValue: (n: number) => void
    rendered: boolean
    settingsValue: number[]
}

const Counter = (props: CounterPropsType) => {

    let maxValue = props.valueCounter === props.settingsValue[1]
    let finalClassName = maxValue ? `${s.number} ${s.numberError}` : s.number

    return (

        <div className={s.counter}>
            <div className={s.counterBody}>

                <div className={s.counterNumber}>
                    {props.rendered ?
                        <div className={s.scoreError}>enter values and press "SET"</div>
                        : <span className={finalClassName}>{props.valueCounter}</span>}
                </div>

                <div className={s.counterFunction}>
                    <SuperButton
                        disabled={maxValue}
                        callback={props.increment}
                        title={'inc'}
                    />

                    <SuperButton
                        callback={props.reset}
                        title={'reset'}
                    />
                </div>
            </div>
        </div>

    );
};

export default Counter;