import React, {useEffect} from "react";
import {MatrixBlock, MatrixColumn, MatrixRow, MatrixWrapper} from "./MatrixStyles";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {
    createMatrixAC,
    MatrixType,
    PointType,
    setMatrixSizeAC,
    setPossibleMovesAC,
    setStartPointAC,
} from "../../state/reducer";

const getMovesAmount = (matrixSize: number) => {
    const movesAmount = 10 + (matrixSize - 3) * 5;
    return Math.max(10, movesAmount);
};

const getNextMove = (startPoint: PointType, matrixSize: number) => {
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

const getPossibleMoves = (
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

export const Matrix = () => {
    const dispatch = useDispatch()
    const matrix = useSelector<AppRootStateType, MatrixType>(state => state.matrix.matrix)
    const matrixSize = useSelector<AppRootStateType, number>(state => state.matrix.matrixSize)
    const startPoint = useSelector<AppRootStateType, PointType>(state => state.matrix.startPoint)
    const endPoint = useSelector<AppRootStateType, PointType>(state => state.matrix.possibleMoves.lastCoordinate)
    const possibleMoves = useSelector<AppRootStateType, Array<string>>(state => state.matrix.possibleMoves.moves)
    const matrixSizeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(createMatrixAC(matrixSize))
        dispatch(setMatrixSizeAC(Number(e.currentTarget.value)))
    }
    // console.log(startPoint)
    const matrixStart = (matrixSize: number) => {
        dispatch(createMatrixAC(matrixSize))
        dispatch(setStartPointAC(matrixSize))
    }
    console.log('matrix', matrix)
    useEffect(() => {
        if (matrix.length !== 0) {
            console.log(matrix)
            dispatch(setPossibleMovesAC(getPossibleMoves(startPoint, matrixSize, getMovesAmount(matrixSize))))
        }
    }, [startPoint])

    return (
        <MatrixWrapper>
            <input type='number'
                   value={matrixSize}
                   onChange={matrixSizeHandler}/>
            <button onClick={() =>
                matrixStart(matrixSize)
            }>начать игру
            </button>
            <MatrixBlock>
                {
                    matrix.map((row, rowIndex) => {
                        return <MatrixRow key={rowIndex}>
                            {matrix[rowIndex].map((column, columnIndex) =>
                                <MatrixColumn
                                    rowIndex={rowIndex}
                                    startRow={startPoint.row}
                                    endRow={endPoint.row}
                                    startColumn={startPoint.column}
                                    endColumn={endPoint.column}
                                    columnIndex={columnIndex}
                                    key={columnIndex}
                                >
                                    {column}
                                </MatrixColumn>)}
                        </MatrixRow>
                    })
                }
            </MatrixBlock>
            <ol>
                {possibleMoves.map((move, i) => (
                    <li key={i}>{move}</li>
                ))}
            </ol>
        </MatrixWrapper>
    );
}


//

// export const Matrix = () => {
//     const [matrixSize, setMatrixSize] = useState(3);
//     const [startPosition, setStartPosition] = useState<{dir?: string|undefined, row: number; col: number; }>(
//         getRandomPoint(matrixSize)
//     );
//     const [endPosition, setEndPosition] = useState<{ dir?: string, col: number, row: number }>({
//         dir: '',
//         col: 0,
//         row: 0
//     });
//     const [possibleMoves, setPossibleMoves] = useState<Array<string>>([]);
//
//
//     const matrixSizeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setMatrixSize(Number(e.currentTarget.value));
//         setStartPosition(getRandomPoint(matrixSize)); //start a new game
//     };
//
//     const checkAnswer = ({col, row}: { col: number, row: number }) => {
//         if (endPosition.col === col && endPosition.row === row) {
//             alert('You won');
//             setStartPosition(getRandomPoint(matrixSize)); //start a new game
//         } else {
//             alert('Looser');
//         }
//     };
//
//     useEffect(() => {
//         const {moves, endPosition} = getPossibleMoves(
//             startPosition,
//             matrixSize,
//             getMovesAmount(matrixSize)
//         );
//         setEndPosition(endPosition);
//         setPossibleMoves(moves);
//     }, [startPosition]);
//
//     return (
//
//         <MatrixWrapper>
//             <input type='number'
//                    value={matrixSize}
//                    onChange={matrixSizeHandler}/>
//             <button onClick={
//                 // () => matrixStart(matrixSize)
//                 () => setStartPosition(getRandomPoint(matrixSize))
//             }>начать игру</button>
//             <MatrixBlock>
//                 {
//                     matrix.map((row, rowIndex) => {
//                         return <MatrixRow key={rowIndex}>
//                             {matrix[rowIndex].map((column, columnIndex) =>
//                                 <MatrixColumn
//                                     onClick={() =>
//                                         checkAnswer({col: columnIndex, row: rowIndex})}
//                                     rowIndex={rowIndex}
//                                     startRow={startCoordinates.row}
//                                     endRow={endCoordinates.row}
//                                     startColumn={startCoordinates.column}
//                                     endColumn={endCoordinates.column}
//                                     columnIndex={columnIndex}
//                                     key={columnIndex}
//                                 >
//                                     {column}
//                                 </MatrixColumn>)}
//                         </MatrixRow>
//                     })
//                 }
//             </MatrixBlock>
//             <ol>
//                 {possibleMoves.map((move,i) => (
//                     <li key={i}>{move}</li>
//                 ))}
//             </ol>
//         </MatrixWrapper>)}


//         <div>
//             <input
//                 type="number"
//                 min={2}
//                 value={matrixSize}
//                 onChange={matrixSizeHandler}
//             />
//             <button onClick={() => setStartPosition(getRandomPoint(matrixSize))}>
//                 начать игру
//             </button>
//             <div>
//                 {Array.from(Array(matrixSize)).map((row, rowIndex) => {
//                     return (
//                         <div key={rowIndex} style={{display: 'flex'}}>
//                             {Array.from(Array(matrixSize)).map((column, columnIndex) => (
//                                 <button
//                                     key={columnIndex}
//                                     onClick={() =>
//                                         checkAnswer({col: columnIndex, row: rowIndex})
//                                     }
//                                     style={{
//                                         // @ts-ignore
//                                         color:
//                                             rowIndex === startPosition.row &&
//                                             columnIndex === startPosition.col &&
//                                             'green',
//                                     }}
//                                 >
//                                     {columnIndex}
//                                 </button>
//                             ))}
//                         </div>
//                     );
//                 })}
//             </div>
//             <ol>
//                 {possibleMoves.map((move,i) => (
//                     <li key={i}>{move}</li>
//                 ))}
//             </ol>
//         </div>
//     );
// };

// export default Matrix;
