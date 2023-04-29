import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
  IconButton,
} from "@mui/material";
import {
  Edit as EditIcon,
  DeleteForever as DeleteIcon,
} from "@mui/icons-material";

const TableCellStyle = {
  color: "white",
  fontWeight: "bold",
};

function InventoryTable(props) {
  return (
    <>
      {props.inventory.length > 0 && (
        <TableContainer sx={props.tableStyle} component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#525151" }}>
              <TableRow>
                <TableCell sx={TableCellStyle} align="center">
                  Name
                </TableCell>
                <TableCell sx={TableCellStyle} align="center">
                  Description
                </TableCell>
                <TableCell sx={TableCellStyle} align="center">
                  Price
                </TableCell>
                <TableCell sx={TableCellStyle} align="center">
                  Quantity
                </TableCell>
                <TableCell sx={TableCellStyle} align="center">
                  Weight
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.inventory.map((row) => (
                <TableRow hover key={row.name}>
                  <TableCell
                    onClick={() => {
                      props.viewItem(row.id);
                    }}
                    align="left"
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      props.viewItem(row.id);
                    }}
                    align="left"
                  >
                    {row.description}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      props.viewItem(row.id);
                    }}
                    align="right"
                  >
                    {row.price}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      props.viewItem(row.id);
                    }}
                    align="right"
                  >
                    {row.quantity}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      props.viewItem(row.id);
                    }}
                    align="left"
                  >
                    {row.weight}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => {
                        props.editItem(row.id);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="left">
                    <IconButton
                      onClick={() => {
                        props.deleteItem(row.id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default InventoryTable;
