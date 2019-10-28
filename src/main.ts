import { renderStudent } from './components/student.js';
import { Student } from './interfaces/studentInterface';

const studentsListingElement = document.getElementById('students-listing');
const searchInputElement = document.getElementById('search-input');
const searchButtonElement = document.getElementById('search-button');
const studentName = document.getElementById('name');
const studentYear = document.getElementById('year');
const addButton = document.getElementById('add-student');
const editId = document.getElementById('id-edit');
const editName = document.getElementById('name-edit');
const editYear = document.getElementById('year-edit');
const editButton = document.getElementById('edit-student');

var students = null;

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function httpPostAsync(theUrl, callback, body)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", theUrl, true); // true for asynchronous 

    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }

    xmlHttp.send(JSON.stringify(body));
}

function httpPUTAsync(theUrl, callback, body)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("PUT", theUrl, true); // true for asynchronous 

    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }

    xmlHttp.send(JSON.stringify(body));
}

function httpDELETEAsync(theUrl, callback)
{
  var xmlHttp = new XMLHttpRequest();

  xmlHttp.onreadystatechange = function() { 
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
          callback(xmlHttp.responseText);
  }
  xmlHttp.open("DELETE", theUrl, true); // true for asynchronous 
  xmlHttp.send(null);
}

function renderListing(studentList: Student[]) {
    studentsListingElement.innerHTML = '';
  
    studentList
      .map(student => renderStudent(student))
      .forEach(html => studentsListingElement.innerHTML += html);
}

function searchByName(phrase: string, studentList: Student[]): Student[] {
    return studentList
      .filter(product => product.name.toLowerCase().includes(phrase.toLowerCase()))
  }

function performSearch() {
    const phrase = (searchInputElement as HTMLInputElement).value;
    const results = searchByName(phrase, students);
    renderListing(results);
  }

export function deleteStudent(id: number){
  console.log(id);
  httpDELETEAsync('http://127.0.0.1:5000/student/' + id, () => {
    console.log("delete student with id: ", id);
  });
}

function render() {
  httpGetAsync('http://127.0.0.1:5000/students', (response) => {
    students = JSON.parse(response).students;
    console.log(students);
    renderListing(students);
  });
}
  
searchInputElement.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') performSearch();
});
searchButtonElement.addEventListener('click', () => performSearch());

addButton.addEventListener('click', () => {
  httpPostAsync('http://127.0.0.1:5000/student', () => {
    render();
  },
  {
    name: (studentName as HTMLInputElement).value,
    year: (studentYear as HTMLInputElement).value
  }
  )
});

editButton.addEventListener('click', () => {
  httpPUTAsync('http://127.0.0.1:5000/student', () => {
    render();
  },
  {
    id: (editId as HTMLInputElement).value;
    name: (editName as HTMLInputElement).value,
    year: (editYear as HTMLInputElement).value
  }
  )
})

render()