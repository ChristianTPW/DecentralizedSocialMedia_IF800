import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Button,
  VStack,
  Spinner,
} from "@chakra-ui/react";

const defaultMsg =
  "Transaction in progress, please wait! If your selected action did not appear right away, it might be due to the blockchain process.";

function Loading({ isOpen, onClose, message }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Transaction</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <VStack align="start">
            {message ? null : <Spinner />}
            <Text>{message ? message : defaultMsg}</Text>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default Loading;
