// Fake API using setTimeout and Promises
function fetchStudentData(studentId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const students = {
        1: "Student #1: Ali  (Age: 20)",
        2: "Student #2: Abdo (Age: 21)",
        3: "Student #3: Ahmed (Age: 22)",
      };
      if (students[studentId]) {
        resolve(students[studentId]);
      } else {
        reject("Student not found!");
      }
    }, 1000);
  });
}

// Load single student using async/await
async function loadStudent(studentId) {
  const output = document.getElementById("studentData");
  output.textContent = "Loading...";
  try {
    const data = await fetchStudentData(studentId);
    output.textContent = data;
  } catch (err) {
    output.textContent = "Error: " + err;
  }
}

// Load multiple students
async function loadMultipleStudents() {
  const output = document.getElementById("studentData");
  output.textContent = "Loading multiple students...";
  try {
    const ids = [1, 2, 3];
    const results = await Promise.all(ids.map(id => fetchStudentData(id)));
    output.textContent = results.join("\n");
  } catch (err) {
    output.textContent = "Error loading students: " + err;
  }
}

// Button event listeners
document.getElementById("loadBtn").addEventListener("click", () => loadStudent(1));
document.getElementById("loadMultipleBtn").addEventListener("click", loadMultipleStudents);
