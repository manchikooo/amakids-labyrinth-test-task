import React from 'react';
import {PointerArrow} from "./Arrow/Arrow";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {ArrowsBlock} from "./ArrowsStyles";

export const Arrows = () => {

    const possibleMoves = useSelector<AppRootStateType, Array<string>>(state => state.matrix.possibleMoves.moves)

    return (
        <ArrowsBlock>
            {possibleMoves.map((move, i) => {
                switch (move) {
                    case 'moveRight': {
                        return <PointerArrow key={i} turnOn={0}/>
                    }
                    case 'moveLeft': {
                        return <PointerArrow key={i} turnOn={180}/>
                    }
                    case 'moveUp': {
                        return <PointerArrow key={i} turnOn={270}/>
                    }
                    case 'moveDown': {
                        return <PointerArrow key={i} turnOn={90}/>
                    }
                    default:
                        return ''
                }
            })}
        </ArrowsBlock>
    );
};
