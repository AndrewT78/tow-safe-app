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

  const getSingleItem = () => {
    return `${props.item.item} - ${props.item.quantity * props.item.weight}kg`;
  };

  const getMultipleItem = () => {
    return `${props.item.item} x ${props.item.quantity} - ${
      props.item.quantity * props.item.weight
    }kg`;
  };

  return (
    <>
      <Alert variant="secondary">
        <Row>
          <Col>
            {props.item.quantity > 1 ? getMultipleItem() : getSingleItem()}
          </Col>
        </Row>
        <Row className="justify-content-md-right">
          <Col xs="5"></Col>
          <Col xs={"2"}>
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
          <Col xs={"3"}>
            <div
              onClick={() => {
                handleShowConfirmMove();
              }}
              data-testid={`move-load-${props.item.id}`}
            >
              {props.moveIcon}
              <FaAngleDoubleLeft size="25"></FaAngleDoubleLeft>
            </div>
          </Col>
          <Col xs={"2"}>
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
