import {ArrowWrapper} from "./ArrowStyles";

type PointerArrowPropsType = {
    turnOn: number
}

export const PointerArrow = ({turnOn} : PointerArrowPropsType) => {
    return (
        <ArrowWrapper turnOn={turnOn}>
            <svg width="40" height="100" viewBox="0 0 334 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M334 74.5667L173.349 0V32.7661H0V115.858H173.349V149.079L334 74.5667Z" fill="#010002"/>
            </svg>
        </ArrowWrapper>
    );
};