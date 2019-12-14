import { get,post } from "./studentRequester.js";

const html = {
    'getStudentID':()=>document.getElementById('student-id'),
    'getFirstName':()=>document.getElementById('first-name'),
    'getLastName':()=>document.getElementById('last-name'),
    'getFacultyNumber':()=>document.getElementById('faculty-number'),
    'getGrade':()=>document.getElementById('grade'),
    'getTableBody':()=>document.getElementById('table-body'),
    'createTableRow': function(id,fn,ln,facn,g){
        const tr = document.createElement('tr');
        const $idTd = document.createElement('td');
        const $firstNameTd = document.createElement('td');
        const $lastNameTd = document.createElement('td');
        const $facultyNumberTd = document.createElement('td');
        const $gradeTd = document.createElement('td');

        $idTd.textContent = id;
        $firstNameTd.textContent = fn;
        $lastNameTd.textContent = ln;
        $facultyNumberTd.textContent = facn;
        $gradeTd.textContent = g;

        tr.append($idTd,$firstNameTd,$lastNameTd,$facultyNumberTd,$gradeTd)
        return tr;
    }
}

const actions = {
    'load-btn':async function(){
        html['getTableBody']().innerHTML = '';
        const fragment = document.createDocumentFragment();
        try{
           const allStudents = await get('appdata','students');
           const students = allStudents.sort((a,b)=>a["ID"]-b["ID"])
           students.forEach(student=>{
           const currentTr =  html['createTableRow'](student["ID"],
           student["FirstName"],student["LastName"],student["FacultyNumber"],student["Grade"]);
          fragment.appendChild(currentTr);
           })
           
           
           html['getTableBody']().appendChild(fragment);
        }catch(err){
            alert(err)
        }
    },
    'create-btn':async function(){
        const $formId = html['getStudentID']();
        const $fisrName = html['getFirstName']();
        const $lastName = html['getLastName']();
        const $facultyNumber = html['getFacultyNumber']();
        const $grade = html['getGrade']();

        const data = {
            "ID":$formId.value,
            "FirstName":$fisrName.value,
            "LastName":$lastName.value,
            "FacultyNumber":$facultyNumber.value,
            "Grade":$grade.value
        }
       const newStudent = await post('appdata','students',data);

       $formId.value = '';
       $fisrName.value = '';
       $lastName.value = '';
       $facultyNumber.value = '';
       $grade.value = '';

      // actions['load-btn']();
    }
}

function handleEvent(e){
    
    if(typeof actions[e.target.id]==='function'){
        e.preventDefault();
        actions[e.target.id]();
    }
}

(function attachEvents(){
    document.addEventListener('click',handleEvent)
}())

