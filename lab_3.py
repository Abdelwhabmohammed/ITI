import math

def validate_input(func):
    def wrapper(self, value):
        if value < 0:
            raise ValueError("Value must be positive")
        func(self, value)
    return wrapper

class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    @property
    def area(self):
        return self.width * self.height
    
    @property
    def perimeter(self):
        return 2 * (self.width + self.height)

class Circle:
    _count = 0

    def __init__(self, radius):
        self.radius = radius
        Circle._count += 1

    @validate_input
    def set_radius(self, value):
        self._radius = value
    @property
    def radius(self):
        return self._radius

    @radius.setter
    @validate_input
    def radius(self, value):
        self._radius = value
    @property
    def area(self):
        return math.pi * self.radius ** 2

    @property
    def circumference(self):
        return 2 * math.pi * self.radius

    @classmethod
    def get_instance_count(cls):
        return cls._count


# Rectangle
rect = Rectangle(5, 3)
print("Rectangle area:", rect.area)
print("Rectangle perimeter:", rect.perimeter)

# Circle 
c1 = Circle(4)
print("Circle area:", c1.area)
print("Circle circumference:", c1.circumference)

c2 = Circle(10)
print("Total Circles:", Circle.get_instance_count())

c3 = Circle(-5)
