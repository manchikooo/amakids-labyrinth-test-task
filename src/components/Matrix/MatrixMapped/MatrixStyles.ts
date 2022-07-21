import styled from "styled-components";
import {PointType} from "../../../state/reducer";

export const MatrixWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MatrixBlock = styled.div`
  width: 500px;
  height: 500px;
  margin: 30px auto 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #F9C76A;
  justify-content: center;
`;

export const MatrixRow = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

type MatrixElPropsType = {
    isGotAnswer: boolean
    clickedElement: PointType
    rowIndex: number
    startRow: number
    endRow: number
    startColumn: number
    endColumn: number
    columnIndex: number
}

export const MatrixColumn = styled.div<MatrixElPropsType>`
  background-color: ${({
                         isGotAnswer,
                         rowIndex,
                         endRow,
                         endColumn,
                         columnIndex,
                         clickedElement
                       }) => {
    if (isGotAnswer && (rowIndex === endRow) && (columnIndex === endColumn)) return 'green'
    if (isGotAnswer && (rowIndex === clickedElement.row) && (columnIndex === clickedElement.column)) return 'red'
  }};
  color: ${({
              rowIndex,
              startRow,
              columnIndex,
              startColumn,
            }) => rowIndex === startRow && columnIndex === startColumn && 'green'
  };
  font-size: ${({
                  rowIndex,
                  startRow,
                  startColumn,
                  columnIndex,
                }) => (rowIndex === startRow && columnIndex === startColumn) && '20px'};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px;
  cursor: pointer;
  border: 1px solid #F9C76A;
  transition: 1.3s;
`;