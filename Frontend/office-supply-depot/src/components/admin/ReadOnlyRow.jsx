import React from "react";
import { FaEdit } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { MdDelete } from "react-icons/md";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{contact.fullName}</td>
      <td>{contact.address}</td>
      <td>{contact.phoneNumber}</td>
      <td>{contact.email}</td>
      <td>
        <Button
          variant="primary"
          onClick={(event) => handleEditClick(event, contact)}
        >
          <FaEdit />
        </Button>
        {/* <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button> */}
        <Button variant="primary" onClick={() => handleDeleteClick(contact.id)}>
          <MdDelete />
        </Button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
