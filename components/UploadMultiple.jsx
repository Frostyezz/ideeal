import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Center, useColorModeValue, Icon } from "@chakra-ui/react";

export default function UploadMultiple({ onFileAccepted, text }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      onFileAccepted(acceptedFiles);
    },
    [onFileAccepted]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*, video/*",
    maxFiles: 5,
    multiple: true,
  });

  const dropText = isDragActive ? "" : text;

  const activeBg = useColorModeValue("gray.100", "gray.600");

  return (
    <Center
      className="w-full border-blue"
      p={10}
      cursor="pointer"
      bg={isDragActive ? activeBg : "transparent"}
      _hover={{ bg: activeBg }}
      transition="background-color 0.2s ease"
      borderRadius={4}
      border="2px dashed"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <p className="text-center">{dropText}</p>
    </Center>
  );
}
