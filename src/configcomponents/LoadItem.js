import React from "react";
import { useState } from "react";
import { Alert, Row, Col, Modal, Button } from "react-bootstrap";
import {
  FaToggleOn,
  FaToggleOff,
  FaTrash,
  FaAngleDoubleLeft,
} from "react-icons/fa";

const LoadItem = (props) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleCloseConfirmDelete = () => setShowConfirmDelete(false);
  const handleShowConfirmDelete = () => setShowConfirmDelete(true);

  const [showConfirmMove, setShowConfirmMove] = useState(false);

  const handleCloseConfirmMove = () => setShowConfirmMove(false);
  const handleShowConfirmMove = () => setShowConfirmMove(true);

  return (
    <>
      <Alert variant="secondary">
        <Row>
          <Col>{props.item.item}</Col>
        </Row>
        <Row>
          <Col>
            {props.item.quantity * props.item.weight} kgs ({props.item.quantity}
            x{props.item.weight} kg)
          </Col>
          <Col xs={"auto"}>
            {props.item.enabled ? (
              <FaToggleOn
                onClick={() => {
                  props.handleToggle(props.item.id);
                }}
                size="25"
                data-testid={`enabled-toggle-load-${props.item.id}`}
              ></FaToggleOn>
            ) : (
              <FaToggleOff
                onClick={() => {
                  props.handleToggle(props.item.id);
                }}
                size="25"
                data-testid={`disabled-toggle-load-${props.item.id}`}
              ></FaToggleOff>
            )}
          </Col>
          <Col xs={"auto"}>
            <FaAngleDoubleLeft
              onClick={() => {
                handleShowConfirmMove();
              }}
              size="25"
              data-testid={`move-load-${props.item.id}`}
            ></FaAngleDoubleLeft>
          </Col>
          <Col xs={"auto"}>
            <FaTrash
              onClick={() => {
                handleShowConfirmDelete();
              }}
              size="25"
              data-testid={`delete-load-${props.item.id}`}
            ></FaTrash>
          </Col>
        </Row>
      </Alert>
      <Modal show={showConfirmDelete} onHide={handleCloseConfirmDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Item?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
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
              props.handleDelete(props.item.id);
              handleCloseConfirmDelete();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showConfirmMove} onHide={handleCloseConfirmMove}>
        <Modal.Header closeButton>
          <Modal.Title>Move Item?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to move this item?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleCloseConfirmMove}
            data-testid="cancel-move-button"
          >
            Cancel
          </Button>
          <Button
            data-testid="confirm-move-button"
            variant="danger"
            onClick={() => {
              props.handleMove(props.item.id);
              handleCloseConfirmMove();
            }}
          >
            Move
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoadItem;
