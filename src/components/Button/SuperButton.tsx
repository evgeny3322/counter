import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import s from './SuperButton.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SetButtonPropsType = DefaultButtonPropsType & {
    callback?: () => void
    title?: string
}


export const SuperButton = (props: SetButtonPropsType) => {
    return (
        <div>
            <button
                className={s.viewButton}
                disabled={props.disabled}
                onClick={props.callback}>
                {props.title}
            </button>
        </div>
    );
};
