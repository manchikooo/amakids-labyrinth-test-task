import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {createMatrixAC, setMatrixSizeAC, setStartPointAC} from "../../state/reducer";
import {InputStyled} from './InputStyles';

export const Input = () => {

    const dispatch = useDispatch()

    const matrixSize = useSelector<AppRootStateType, number>(state => state.matrix.matrixSize)
    const matrixSizeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(createMatrixAC(matrixSize))
        dispatch(setMatrixSizeAC(Number(e.currentTarget.value)))
    }
    useEffect(() => {
        dispatch(createMatrixAC(matrixSize))
        dispatch(setStartPointAC(matrixSize))
    }, [matrixSize])
    return (
        <InputStyled type='number'
                     value={matrixSize}
                     onChange={matrixSizeHandler}/>
    );
};
