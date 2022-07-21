import {checkGotAnswerAC, PointType, setClickedElementAC} from "../state/reducer";
import {Dispatch} from "redux";

export const checkAnswer = (dispatch: Dispatch, column: number, row: number) => {
    dispatch(checkGotAnswerAC(true))
    dispatch(setClickedElementAC({row, column}))
};

export const getMovesAmount = (matrixSize: number) => {
    const movesAmount = 10 + (matrixSize - 3) * 5;
    return Math.max(10, movesAmount);
};

export const getNextMove = (startPoint: PointType, matrixSize: number) => {
    const possibleMoves = [];
    if (startPoint.row !== 0) {
        possibleMoves.push({
            ...startPoint,
            dir: 'moveUp',
            row: startPoint.row - 1,
        });
    }
    if (startPoint.row !== matrixSize - 1) {
        possibleMoves.push({
            ...startPoint,
            dir: 'moveDown',
            row: startPoint.row + 1,
        });
    }
    if (startPoint.column !== 0) {
        possibleMoves.push({
            ...startPoint,
            dir: 'moveLeft',
            column: startPoint.column - 1,
        });
    }
    if (startPoint.column !== matrixSize - 1) {
        possibleMoves.push({
            ...startPoint,
            dir: 'moveRight',
            column: startPoint.column + 1,
        });
    }
    return possibleMoves[Math.round(Math.random() * (possibleMoves.length - 1))];
};

export const getPossibleMoves = (
    startCoordinates: PointType,
    matrixSize: number,
    movesLeft: number,
    moves: Array<string> = []):
    { lastCoordinate: PointType; moves: Array<string> } => {
    if (movesLeft > 0) {
        const {dir, column, row} = getNextMove(startCoordinates, matrixSize);
        return getPossibleMoves({dir, column, row}, matrixSize, movesLeft - 1, [
            ...moves,
            dir,
        ]);
    } else {
        return {moves, lastCoordinate: startCoordinates};
    }
};