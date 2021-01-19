import React, { useState } from "react";
import { Alert, Row, Col, Modal, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

const AccessoryItem = (props) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleCloseConfirmDelete = () => setShowConfirmDelete(false);
  const handleShowConfirmDelete = () => setShowConfirmDelete(true);

  return (
    <>
      <Alert variant="secondary">
        <Row>
          <Col>{`${props.accessory.accessory} - ${props.accessory.weight}kg`}</Col>
        </Row>
        <Row className="justify-content-md-right">
          <Col xs={"2"}>
            <FaTrash
              onClick={() => {
                handleShowConfirmDelete();
              }}
              size="25"
              data-testid={`delete-acc-${props.accessory.id}`}
            ></FaTrash>
          </Col>
        </Row>
      </Alert>
      <Modal show={showConfirmDelete} onHide={handleCloseConfirmDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Accessory?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this accessory?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleCloseConfirmDelete}
            data-testid="cancel-delete-button"
          >
            Cancel
          </Button>
          <Button
            data-testid="confirm-delete-button"
            variant="danger"
            onClick={() => {
              props.handleDelete(props.accessory.id);
              handleCloseConfirmDelete();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AccessoryItem;
