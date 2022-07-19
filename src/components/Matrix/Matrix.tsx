import React, {useEffect, useState} from "react";
import {MatrixBlock, MatrixColumn, MatrixRow, MatrixWrapper} from "./MatrixStyles";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {createMatrixAC, PointType, setMatrixSizeAC, setStartCoordinatesAC,} from "../../state/reducer";

export const Matrix = () => {
    const dispatch = useDispatch()
    const [movesArr, setMovesArr] = useState<Array<string>>([])
    const matrix = useSelector<AppRootStateType, Array<Array<number>>>(state => state.matrix.matrix)
    const matrixSize = useSelector<AppRootStateType, number>(state => state.matrix.matrixSize)
    const startCoordinates = useSelector<AppRootStateType, PointType>(state => state.matrix.startPoint)
    const endCoordinates = useSelector<AppRootStateType, PointType>(state => state.matrix.endPoint)
    console.log('END ', endCoordinates)
    // console.log('START ', startCoordinates)
    const matrixSizeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setMatrixSizeAC(Number(e.currentTarget.value)))
    }
    const matrixStart = (matrixSize: number) => {
        dispatch(setStartCoordinatesAC(matrixSize))

        matrixMove()
    }

    const matrixMove = (moves: number = 5) => {
        // debugger
        if (endCoordinates.row !== 0) {
            console.log(endCoordinates.row)
            console.log('1st if ', endCoordinates.row)
            setMovesArr(moveArr => ([...moveArr, 'moveUp']))
            // dispatch(moveUpAC())
        }
        if (endCoordinates.row !== matrix.length - 1) {
            console.log('2st if ', endCoordinates.row)
            setMovesArr(moveArr => ([...moveArr, 'moveDown']))
            // dispatch(moveDownAC())
        }
        if (endCoordinates.column !== 0) {
            console.log('3th if ', endCoordinates.column)
            setMovesArr(moveArr => ([...moveArr, 'moveLeft']))
            // dispatch(moveLeftAC())
        }
        if (endCoordinates.column !== matrix.length - 1) {
            console.log('4th if ', endCoordinates.column)
            setMovesArr(moveArr => ([...moveArr, 'moveRight']))
            // dispatch(moveRightAC())
        }
    }
    console.log(movesArr)
    useEffect(() => {
        dispatch(createMatrixAC(matrixSize))
    }, [matrixSize])

    return (
        <MatrixWrapper>
            <input type='number'
                   value={matrixSize}
                   onChange={matrixSizeHandler}/>
            <button onClick={() => matrixStart(matrixSize)}>начать игру</button>
            <MatrixBlock>
                {
                    matrix.map((row, rowIndex) => {
                        return <MatrixRow key={rowIndex}>
                            {matrix[rowIndex].map((column, columnIndex) =>
                                <MatrixColumn
                                    rowIndex={rowIndex}
                                    startRow={startCoordinates.row}
                                    endRow={endCoordinates.row}
                                    startColumn={startCoordinates.column}
                                    endColumn={endCoordinates.column}
                                    columnIndex={columnIndex}
                                    key={columnIndex}
                                >
                                    {column}
                                </MatrixColumn>)}
                        </MatrixRow>
                    })
                }
            </MatrixBlock>
        </MatrixWrapper>
    );
}