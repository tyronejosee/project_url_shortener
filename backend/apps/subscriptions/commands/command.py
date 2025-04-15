from abc import ABC, abstractmethod


class Command(ABC):
    def __init__(self, payload: dict) -> None:
        self.payload: dict = payload

    @abstractmethod
    def execute(self) -> None:
        """
        Execute the command.
        """
        pass
