import React, { useRef } from "react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

const DeletePostDialog = ({ isOpen, onClose, loading, handler }) => {
  const cancelRef = useRef();
  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        isCentered
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Ștergere postare
            </AlertDialogHeader>

            <AlertDialogBody>
              Ești sigur? Această acțiune este ireversibilă!
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Anulează
              </Button>
              <Button
                isLoading={loading}
                colorScheme="red"
                onClick={handler}
                ml={3}
              >
                Șterge
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeletePostDialog;
