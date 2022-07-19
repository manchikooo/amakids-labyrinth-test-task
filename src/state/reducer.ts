type MatrixType = Array<MatrixRowType>

type MatrixRowType = Array<number>

export type PointType = {
    row: number
    column: number
}

type InitialStateType = {
    matrix: MatrixType
    matrixSize: number
    startPoint: PointType
    endPoint: PointType
}

const initialState: InitialStateType = {
    matrix: [],
    matrixSize: 3,
    startPoint: {
        row: -1,
        column: -1
    },
    endPoint: {
        row: -1,
        column: -1
    }
}

export const matrixReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'CREATE_MATRIX': {
            let matrix: Array<Array<number>> = []
            for (let i = 0; i < action.payload.tableSize; i++) {
                matrix.push([])
                for (let j = 0; j < action.payload.tableSize; j++) {
                    matrix[i].push(j)
                }
            }
            return {...state, matrix}
        }
        case "SET_START_COORDINATES": {
            const row = Math.round(Math.random() * (action.payload.matrixSize - 1))
            const column = Math.round(Math.random() * (action.payload.matrixSize - 1))
            return {...state, startPoint: {row, column: column}, endPoint: {row, column: column}}
        }
        case "SET_MATRIX_SIZE": {
            if (action.payload.size > 5) {
                return {...state, matrixSize: 5}
            } else if (action.payload.size < 3) {
                return {...state, matrixSize: 3}
            } else {
                return {...state, matrixSize: action.payload.size}
            }
        }
        case "MOVE_UP": {
            return {
                ...state, endPoint: {
                    row: state.endPoint.row - 1,
                    column: state.endPoint.column
                }
            }
        }
        case "MOVE_DOWN": {
            return {
                ...state, endPoint: {
                    row: state.endPoint.row + 1,
                    column: state.endPoint.column
                }
            }
        }
        case "MOVE_RIGHT": {
            return {
                ...state, endPoint: {
                    row: state.endPoint.row,
                    column: state.endPoint.column + 1
                }
            }
        }
        case "MOVE_LEFT": {
            return {
                ...state, endPoint: {
                    row: state.endPoint.row,
                    column: state.endPoint.column - 1
                }
            }
        }
        default:
            return state;
    }
}

type ActionsType =
    CreateMatrixACType
    | SetStartCoordinatesACType
    | SetMatrixSizeACType
    | MoveUpACType
    | MoveDownACType
    | MoveRightACType
    | MoveLeftACType

type CreateMatrixACType = ReturnType<typeof createMatrixAC>
export const createMatrixAC = (tableSize: number) => {
    return {
        type: 'CREATE_MATRIX',
        payload: {
            tableSize
        }
    } as const
}
type SetMatrixSizeACType = ReturnType<typeof setMatrixSizeAC>
export const setMatrixSizeAC = (size: number) => {
    return {
        type: 'SET_MATRIX_SIZE',
        payload: {
            size
        }
    } as const
}

type SetStartCoordinatesACType = ReturnType<typeof setStartCoordinatesAC>
export const setStartCoordinatesAC = (matrixSize: number) => {
    return {
        type: 'SET_START_COORDINATES',
        payload: {
            matrixSize
        }
    } as const
}

type MoveUpACType = ReturnType<typeof moveUpAC>
export const moveUpAC = () => {
    return {
        type: 'MOVE_UP'
    } as const
}
type MoveDownACType = ReturnType<typeof moveDownAC>
export const moveDownAC = () => {
    return {
        type: 'MOVE_DOWN'
    } as const
}
type MoveRightACType = ReturnType<typeof moveRightAC>
export const moveRightAC = () => {
    return {
        type: 'MOVE_RIGHT'
    } as const
}
type MoveLeftACType = ReturnType<typeof moveLeftAC>
export const moveLeftAC = () => {
    return {
        type: 'MOVE_LEFT'
    } as const
}