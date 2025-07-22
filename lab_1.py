name = "Abdelwhab"
age = 20
skills = ["Python", "Machine Learning", "Web Development"]
employee_info = {"id": 1, "department": "AI"}

print("Type of name:", type(name))
print("Type of age:", type(age))
print("Type of skills:", type(skills))
print("Type of employee_info:", type(employee_info))

skills.append("Data Analysis")
print("Updated skills:", skills)

class Employee:
    title = "PythonTech"

    def __init__(self, name, department, salary):
        self.name = name
        self.department = department
        self.salary = salary

    def display_info(self):
        return f"Name: {self.name}, Department: {self.department}, Salary: {self.salary}"

    def year_salary(self):
        return self.salary * 12

    @classmethod
    def get_company(cls):
        return cls.title

    @staticmethod
    def valid_salary(salary):
        return salary >= 6000

emp1 = Employee("Aya", "Engineering", 7000)
emp2 = Employee("Omar", "Marketing", 5000)

print(emp1.display_info())
print(emp2.display_info())
print("Yearly Salary of emp1:", emp1.year_salary())
print("Company Title:", emp1.get_company())
print("Is emp1's salary valid?", Employee.valid_salary(emp1.salary))
