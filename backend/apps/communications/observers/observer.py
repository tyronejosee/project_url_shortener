"""Observer for Observer pattern."""

from abc import ABC, abstractmethod


class Observer(ABC):

    @abstractmethod
    def notify(self, data: dict, category: str) -> None:
        pass
