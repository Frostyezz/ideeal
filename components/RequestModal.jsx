import React from "react";

import Image from "next/image";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

const RequestModal = ({ request, isOpen, onClose }) => {
  return (
    <Modal
      size="2xl"
      closeOnOverlayClick={true}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cerere de înregistrare</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="flex flex-col">
          <div>
            <b>Nume: </b>
            <span>{request.lastName}</span>
          </div>
          <div>
            <b>Prenume: </b>
            <span>{request.firstName}</span>
          </div>
          <div>
            <b>Localitate: </b>
            <span>{request.location.city}</span>
          </div>
          <div>
            <b>Județ: </b>
            <span>{request.location.county}</span>
          </div>

          <Image
            src={request.verified.ic}
            width="300px"
            height="200px"
            layout="responsive"
            className="mt-3"
          />
        </ModalBody>

        <ModalFooter>
          <Button mr={3} colorScheme="gray">
            Respinge
          </Button>
          <Button colorScheme="blue">Aprobă</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RequestModal;
