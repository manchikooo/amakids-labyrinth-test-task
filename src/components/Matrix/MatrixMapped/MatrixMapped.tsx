import React, {useEffect} from 'react';
import {MatrixBlock, MatrixColumn, MatrixRow} from "./MatrixStyles";
import {checkAnswer, getMovesAmount, getPossibleMoves} from "../../../helpers/helpers";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../state/store";
import {MatrixType, PointType, setPossibleMovesAC} from "../../../state/reducer";

const MatrixMapped = () => {
    const dispatch = useDispatch()
    const matrix = useSelector<AppRootStateType, MatrixType>(state => state.matrix.matrix)
    const matrixSize = useSelector<AppRootStateType, number>(state => state.matrix.matrixSize)
    const startPoint = useSelector<AppRootStateType, PointType>(state => state.matrix.startPoint)
    const endPoint = useSelector<AppRootStateType, PointType>(state => state.matrix.possibleMoves.lastCoordinate)
    const isGotAnswer = useSelector<AppRootStateType, boolean>(state => state.matrix.isGotAnswer)
    const clickedElement = useSelector<AppRootStateType, PointType>(state => state.matrix.clickedElement)

    useEffect(() => {
        if (matrix.length !== 0) {
            dispatch(setPossibleMovesAC(getPossibleMoves(startPoint, matrixSize, getMovesAmount(matrixSize))))
        }
    }, [startPoint])

    return (
        < MatrixBlock>
            {
                matrix.map((row, rowIndex) => {
                    return <MatrixRow key={rowIndex}>
                        {matrix[rowIndex].map((column, columnIndex) =>
                            <MatrixColumn
                                onClick={() => checkAnswer(dispatch, columnIndex, rowIndex)}
                                isGotAnswer={isGotAnswer}
                                clickedElement={clickedElement}
                                rowIndex={rowIndex}
                                startRow={startPoint.row}
                                endRow={endPoint.row}
                                startColumn={startPoint.column}
                                endColumn={endPoint.column}
                                columnIndex={columnIndex}
                                key={columnIndex}
                            >
                                {columnIndex === startPoint.column && rowIndex === startPoint.row && 'START'}
                            </MatrixColumn>)}
                    </MatrixRow>
                })
            } </MatrixBlock>
    );
};

export default MatrixMapped;