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
  const borderColor = useColorModeValue(
    isDragActive ? "teal.300" : "gray.300",
    isDragActive ? "teal.500" : "gray.500"
  );

  return (
    <Center
      className="w-full"
      p={10}
      cursor="pointer"
      bg={isDragActive ? activeBg : "transparent"}
      _hover={{ bg: activeBg }}
      transition="background-color 0.2s ease"
      borderRadius={4}
      border="3px dashed"
      borderColor={borderColor}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <p className="text-center">{dropText}</p>
    </Center>
  );
}
