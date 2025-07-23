class Vehicle:
    def __init__(self, name, speed):
        self.name = name
        self.speed = speed

    def start_engine(self):
        return "Engine started"

    def describe(self):
        return f"{self.name} moves at {self.speed} km/h"

class Car(Vehicle):
    def __init__(self, name, speed, brand):
        super().__init__(name, speed)
        self.brand = brand

    def describe(self):
        base_description = super().describe()
        return f"{base_description} (Brand: {self.brand})"


class ElectricCar(Car):
    def __init__(self, name, speed, brand, battery_range):
        super().__init__(name, speed, brand)
        self.battery_range = battery_range

    def start_engine(self):
        return "Electric motor activated!"


class Bicycle:
    def __init__(self, name, speed):
        self.name = name
        self.speed = speed

    def start_engine(self):
        return "No engine, just pedals!"

    def describe(self):
        return f"{self.name} moves at {self.speed} km/h using pedal power"
