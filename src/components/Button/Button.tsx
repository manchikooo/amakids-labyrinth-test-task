import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {checkGotAnswerAC, createMatrixAC, setStartPointAC} from "../../state/reducer";
import {ButtonStyled} from "./ButtonStyles";

export const Button = () => {
    const dispatch = useDispatch()
    const matrixSize = useSelector<AppRootStateType, number>(state => state.matrix.matrixSize)

    const matrixStart = (matrixSize: number) => {
        dispatch(checkGotAnswerAC(false))
        dispatch(createMatrixAC(matrixSize))
        dispatch(setStartPointAC(matrixSize))
    }

    return (
        <ButtonStyled onClick={() =>
            matrixStart(matrixSize)
        }>Start Game
        </ButtonStyled>
    );
};
