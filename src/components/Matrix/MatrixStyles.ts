import styled from "styled-components";

export const MatrixWrapper = styled.div`
  height: 500px;
`;

export const MatrixBlock = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid red;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const MatrixRow = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

type MatrixElPropsType = {
    rowIndex: number
    startRow: number
    endRow: number
    startColumn: number
    endColumn: number
    columnIndex: number
}

export const MatrixColumn = styled.div<MatrixElPropsType>`
  color: ${({
              rowIndex,
              startRow,
              endRow,
              columnIndex,
              startColumn,
            }) => rowIndex === startRow && columnIndex === startColumn && 'green'
  };
  font-weight: ${({
                    rowIndex,
                    startRow,
                    endRow,
                    startColumn,
                    endColumn,
                    columnIndex,
                  }) => {
    // console.log('rowIndex ', rowIndex, 'startRow ', startRow, 'startEl ', startColumn, 'endRow ', endRow, 'endEl ', endColumn)
      return (rowIndex === endRow && columnIndex === endColumn) && 900}
  };
  font-size: ${({
                  rowIndex,
                  startRow,
                  endRow,
                  startColumn,
                  endColumn,
                  columnIndex,
                }) => (rowIndex === startRow && columnIndex === startColumn) && '40px'};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px;
  cursor: pointer;
  border: 1px solid red;
`;