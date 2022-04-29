const initialState = {
    renderDisplay: false,
    error: false,
    settingsValue: {maxValue: 0, startValue: 1},
}

//auto type
type InitialStateType = typeof initialState

export const counterReducer = (
    state: InitialStateType = initialState,
    action: counterReducerType): InitialStateType => {
    switch (action.type) {
        case "RENDER_DISPLAY": { // ошибка значения
            return {...state, renderDisplay: action.value}
        }
        case "ERROR_VALUE": { // максимальное значение input
            return {...state, error: action.value}
        }
        case "MAX_VALUE": { // настройка max value input
            return {...state, settingsValue: {...state.settingsValue, maxValue: action.maxValue}}
        }
        case "START_VALUE": { // настройка start value input
            return {...state, settingsValue: {...state.settingsValue, startValue: action.startValue}}
        }
        default:
            return state;
    }
}

type counterReducerType = RenderDisplayType | ErrorValueType | StartValueType | MaxValueType

type RenderDisplayType = ReturnType<typeof renderDisplayAC>
export const renderDisplayAC = (value: boolean) => ({type: "RENDER_DISPLAY", value} as const)

type ErrorValueType = ReturnType<typeof errorValueAC>
export const errorValueAC = (value: boolean) => ({type: "ERROR_VALUE", value} as const)

type MaxValueType = ReturnType<typeof maxValueAC>
export const maxValueAC = (maxValue: number) => ({type: "MAX_VALUE", maxValue} as const)

type StartValueType = ReturnType<typeof startValueAC>
export const startValueAC = (startValue: number) => ({type: "START_VALUE", startValue} as const)
