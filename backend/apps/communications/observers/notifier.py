"""Notifier for Observer pattern."""

from .observer import Observer


class Notifier:
    def __init__(self) -> None:
        self.observers: list[Observer] = []

    def attach(self, observer: Observer) -> None:
        """Adds a new observer to the list."""
        self.observers.append(observer)

    def notify_all(self, data: dict) -> None:
        """Notifies all registered observers."""
        for observer in self.observers:
            observer.notify(data)
