import React, { useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";

import axios from "axios";

const ReportPostModal = ({ id, isOpen, onClose }) => {
  const [reason, setReason] = useState(null);
  const [otherReason, setOtherReason] = useState(null);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const report = async () => {
    if (!reason) {
      return toast({
        title: `Vă rugăm să alegeți un motiv!`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
    if (!otherReason && reason === "Altceva") {
      return toast({
        title: `Vă rugăm să scrieți un motiv!`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
    setLoading(true);
    const { data } = await axios.patch(`/api/post/report/${id}`, {
      reason: reason !== "Altceva" ? reason : otherReason,
    });
    setLoading(false);
    if (data.status === "SUCCESS") {
      onClose();
      toast({
        title: `Problema a fost trimisă cu succes! Îți mulțumim!`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } else {
      toast({
        title: `A apărut o eroare. Vă rugam încercați din nou mai târziu!`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Raportează postarea</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="flex flex-col">
          <Select
            onChange={(e) => setReason(e.target.value ? e.target.value : null)}
            className="border-blue"
            placeholder="Alege un motiv..."
          >
            <option value="Nuditate">Nuditate</option>
            <option value="Violență">Violență</option>
            <option value="Hărțuire">Hărțuire</option>
            <option value="Suicid sau vătămare proprie">
              Suicid sau vătămare proprie
            </option>
            <option value="Informații false">Informații false</option>
            <option value="Spam">Spam</option>
            <option value="Limbaj licențios">Limbaj licențios</option>
            <option value="Terorism">Terorism</option>
            <option value="Altceva">Altceva</option>
          </Select>
          {reason === "Altceva" && (
            <Textarea
              className="no-scrollbar my-3 rounded border-blue animate__animated animate__fadeIn"
              placeholder="Introduceți motivul"
              size="sm"
              resize="none"
              onChange={(e) => setOtherReason(e.target.value)}
            />
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            Anulează
          </Button>
          <Button isLoading={loading} onClick={report} colorScheme="blue">
            Trimite
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReportPostModal;
