import { renderStudent } from './components/student.js';
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
function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    };
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send(null);
}
function httpPostAsync(theUrl, callback, body) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", theUrl, true);
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    };
    xmlHttp.send(JSON.stringify(body));
}
function httpPUTAsync(theUrl, callback, body) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("PUT", theUrl, true);
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    };
    xmlHttp.send(JSON.stringify(body));
}
function httpDELETEAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    };
    xmlHttp.open("DELETE", theUrl, true);
    xmlHttp.send(null);
}
function renderListing(studentList) {
    studentsListingElement.innerHTML = '';
    studentList
        .map(student => renderStudent(student))
        .forEach(html => studentsListingElement.innerHTML += html);
}
function searchByName(phrase, studentList) {
    return studentList
        .filter(product => product.name.toLowerCase().includes(phrase.toLowerCase()));
}
function performSearch() {
    const phrase = searchInputElement.value;
    const results = searchByName(phrase, students);
    renderListing(results);
}
export function deleteStudent(id) {
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
    if (event.key === 'Enter')
        performSearch();
});
searchButtonElement.addEventListener('click', () => performSearch());
addButton.addEventListener('click', () => {
    httpPostAsync('http://127.0.0.1:5000/student', () => {
        render();
    }, {
        name: studentName.value,
        year: studentYear.value
    });
});
editButton.addEventListener('click', () => {
    httpPUTAsync('http://127.0.0.1:5000/student', () => {
        render();
    }, {
        id: editId.value,
        name: editName.value,
        year: editYear.value
    });
});
render();
