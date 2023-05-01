import React from "react";
import { useState } from "react";
import {
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";

function NewItemDialog(props) {
  const [dialogNew, setDialogNew] = useState(false);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");

  function toggleDialogNew() {
    setDialogNew(!dialogNew);
    clearAll();
  }

  function changeQuantity(num) {
    let value = num + quantity;
    if (value < 0) value = 0;
    setQuantity(value);
  }

  function clearAll() {
    setName("");
    setQuantity(0);
    setPrice("");
    setWeight("");
    setDescription("");
  }

  function addItem() {
    let array = [];
    array.push({
      id: generateId(),
      name,
      description,
      price,
      weight,
      quantity,
    });
    toggleDialogNew();
    props.setInventory([...props.inventory, ...array]);
    console.log("array: ", array);
  }

  function generateId() {
    return uuidv4();
  }

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Button
        variant="contained"
        sx={props.buttonGridStyle}
        onClick={toggleDialogNew}
      >
        Add
      </Button>

      <Dialog open={dialogNew} onClose={toggleDialogNew}>
        <DialogContent>
          <TextField
            label="Name"
            sx={props.textFieldStyle}
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></TextField>
          <TextField
            label="Description"
            sx={props.textFieldStyle}
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></TextField>
          <TextField
            label="Quantity"
            sx={props.textFieldStyle}
            variant="outlined"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          ></TextField>
          <TextField
            label="Price"
            sx={props.textFieldStyle}
            variant="outlined"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></TextField>
          <TextField
            label="Weight"
            sx={props.textFieldStyle}
            variant="outlined"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          ></TextField>

          <Grid sx={props.buttonGridstyle}>
            <IconButton sx={props.iconStyle} onClick={() => changeQuantity(-1)}>
              <RemoveIcon sx={props.iconStyle} />
            </IconButton>
            {quantity}
            <IconButton sx={props.iconStyle} onClick={() => changeQuantity(+1)}>
              <AddIcon sx={props.iconStyle} />
            </IconButton>
          </Grid>

          <DialogActions>
            <Button onClick={toggleDialogNew}>Cancel</Button>
            <Button onClick={addItem}>Add</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}

export default NewItemDialog;
