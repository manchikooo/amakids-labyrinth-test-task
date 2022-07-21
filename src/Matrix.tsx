import React from "react";
import {MatrixWrapper} from "./components/Matrix/MatrixMapped/MatrixStyles";
import {Arrows} from "./components/ArrowsBlock/Arrows";
import {Button} from "./components/Button/Button";
import {Input} from "./components/Input/Input";
import MatrixMapped from "./components/Matrix/MatrixMapped/MatrixMapped";


export const Matrix = () => {
    return (
        <MatrixWrapper>
            <Input/>
            <Button/>
            <Arrows/>
            <MatrixMapped/>
        </MatrixWrapper>
    );
}