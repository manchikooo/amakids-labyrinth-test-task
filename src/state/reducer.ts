export type MatrixType = Array<MatrixRowType>

export type PossibleMovesType = {
    moves: Array<string>
    lastCoordinate: PointType
}

type MatrixRowType = Array<number>

export type PointType = {
    dir?: string | undefined
    row: number
    column: number
}

type InitialStateType = {
    matrix: MatrixType
    matrixSize: number
    startPoint: PointType
    possibleMoves: PossibleMovesType
}

const initialState: InitialStateType = {
    matrix: [],
    matrixSize: 3,
    startPoint: {
        row: -1,
        column: -1
    },
    possibleMoves: {
        moves: [],
        lastCoordinate: {
            row: -1,
            column: -1
        }
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
        case "SET_START_POINT": {
            const row = Math.round(Math.random() * (action.payload.matrixSize - 1))
            const column = Math.round(Math.random() * (action.payload.matrixSize - 1))
            return {
                ...state,
                startPoint: {...state.startPoint, row, column},
            }
        }
        case "SET_MATRIX_SIZE": {
            if (action.payload.size > 5) {
                return {...state, matrixSize: 5}
            } else if (action.payload.size < 2) {
                return {...state, matrixSize: 2}
            } else {
                return {...state, matrixSize: action.payload.size}
            }
        }
        case "SET_POSSIBLE_MOVES": {
            return {
                ...state,
                possibleMoves: {
                    ...state.possibleMoves,
                    moves: action.payload.moves,
                    lastCoordinate: action.payload.lastCoordinate
                }
            }
        }
        default:
            return state;
    }
}

type ActionsType =
    CreateMatrixACType
    | SetStartPointACType
    | SetMatrixSizeACType
    | SetPossibleMovesACType

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

type SetStartPointACType = ReturnType<typeof setStartPointAC>
export const setStartPointAC = (matrixSize: number) => {
    return {
        type: 'SET_START_POINT',
        payload: {
            matrixSize
        }
    } as const
}
type SetPossibleMovesACType = ReturnType<typeof setPossibleMovesAC>
export const setPossibleMovesAC = ({
                                       lastCoordinate,
                                       moves
                                   }: { lastCoordinate: PointType, moves: Array<string> }) => {
    return {
        type: 'SET_POSSIBLE_MOVES',
        payload: {
            moves,
            lastCoordinate
        }
    } as const
}