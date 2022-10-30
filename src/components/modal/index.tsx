import { Modal } from "native-base";
import { StyleSheet } from "react-native";
import { ReactElement } from "react";

interface ModalProps {
  title?: string | ReactElement;
  element?: ReactElement;
  children?: any;
  position?: "top" | "bottom" | "full" | "center";
}

const ModalComponent = ({ children, title }: ModalProps) => {
  return (
    <Modal.Content size="full" mt="auto" mb="0" p={0} bg="#161a1d">
      {title && <Modal.Header bg="#161a1d">{title}</Modal.Header>}
      <Modal.Body bg="#161a1d" p={0}>
        {children}
      </Modal.Body>
    </Modal.Content>
  );
};

export default ModalComponent;
