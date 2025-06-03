"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";

type Props = {
  loading: boolean;
  isConfirmOpen: boolean;
  onConfirmClose: () => void;
  confirmDelete: () => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
};

export default function DeleteModal({
  loading,
  isConfirmOpen,
  onConfirmClose,
  confirmDelete,
  title = "Confirm Deletion",
  description = "Are you sure you want to proceed? This action cannot be undone.",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
}: Props) {
  return (
    <Modal
      backdrop="blur"
      isOpen={isConfirmOpen}
      onClose={onConfirmClose}
      classNames={{
        base: "bg-white border-2 border-neutral-200",
      }}
    >
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{description}</ModalBody>
        <ModalFooter>
          <Button
            variant="bordered"
            onPress={onConfirmClose}
            className="border-2 border-neutral-200"
          >
            {cancelLabel}
          </Button>
          <Button color="danger" onPress={confirmDelete} isLoading={loading}>
            {confirmLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
