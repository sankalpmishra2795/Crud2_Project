// opne form
function close() {
  document.getElementById('output').style.display = 'none';
}
document.getElementById('add').addEventListener('click', function (e) {
  document.getElementById('output').style.display = 'block';
  document.getElementById('output').innerHTML = `
 
  
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title" id="exampleModalLabel">Fill The Employee Deitals</h6>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <div class="card mt-4 mx-auto pt-3 pb-5 px-5 rounded" style='width:23rem'>
            <h3>Employee Details</h3>
            <label class="mt-2" for="">Name</label>
            <input class="rounded" type="text" name="" id="name">
            <label class="mt-2" for="">Email</label>
            <input class="rounded" type="email" name="" id="email">
            <label class="mt-2" for="">Phone</label>
            <input class="rounded" type="number" name="" id="phone">
           
            </div>
        </div>
        <div class="modal-footer">
        <button type="button" class="rounded btn btn-dark" id="submit">Add</button>
          <button type="button" id="close" class="rounded btn btn-dark" data-dismiss="modal">Close</button>
          
        </div>
      </div>
    </div>
  </div>

    `;

  // Add Deitals

  document.getElementById('submit').addEventListener('click', function () {
    fname = document.getElementById('name');
    email = document.getElementById('email');
    phone = document.getElementById('phone');
    console.log('object');
    // SET Local storage
    let empArr;
    let count;
    if (localStorage.getItem('person') == null) {
      empArr = [];
      count = 1;
    } else {
      empArr = JSON.parse(localStorage.getItem('person'));
      count = empArr[empArr.length - 1].empID + 1;
    }
    const empObj = {
      empID: count,
      nameEmp: fname.value,
      emailEmp: email.value,
      phoneEmp: phone.value,
    };
    empArr.push(empObj);
    localStorage.setItem('person', JSON.stringify(empArr));
    fname.value = '';
    email.value = '';
    phone.value = '';
    document.getElementById('output').style.display = 'none';

    showData();
  });
  document.getElementById('close').addEventListener('click', close);
  e.preventDefault();
});

// show Details

document.getElementById('show').addEventListener('click', function () {
  document.getElementById('table').innerHTML = `
    <table class="table mt-4">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone</th>
      <th scope="col">Delete</th>
    <th scope="col">Edit</th>
    </tr>
  </thead>
  <tbody  id='list'>
    
  </tbody>
</table>
    `;
  showData();
});

// Show Data
showData = () => {
  document.getElementById('table').innerHTML = `
  <table class="table mt-4">
<thead>
  <tr>
    <th scope="col">#</th>
    <th scope="col">Name</th>
    <th scope="col">Email</th>
    <th scope="col">Phone</th>
    <th scope="col">Delete</th>
    <th scope="col">Edit</th>
  </tr>
</thead>
<tbody  id='list'>
  
</tbody>
</table>
  `;
  const list = document.getElementById('list');
  let empArr = JSON.parse(localStorage.getItem('person'));
  for (let i = 0; i < empArr.length; i++) {
    const row = document.createElement('tr');
    console.log(empArr[i].empID, 'empArr[i].empID');
    row.innerHTML = `
   <th scope="col">${i + 1}</th>
   <th scope="col">${empArr[i].nameEmp}</th>
   <th scope="col">${empArr[i].emailEmp}</th>
   <th scope="col">${empArr[i].phoneEmp}</th>
   <th scope="col"><a href='#' id='delete' onClick="deleteEmp()"   data-id='${
     empArr[i].empID
   }'>X</a></th>
   <th scope="col"><a href='#' id= 'edit' onClick="editEmp(event)" data-id='${
     empArr[i].empID
   }'data-toggle="modal" data-target="#exampleModal">*</a></th>
   `;
    list.appendChild(row);
  }
};
// Delete from LS
function deleteEmp() {
  console.log('delet');
  const id = event.target.getAttribute('data-id');
  let empArr = JSON.parse(localStorage.getItem('person'));
  for (let i = 0; i < empArr.length; i++) {
    if (empArr[i].empID == id) {
      empArr.splice(i, 1);
    }
    localStorage.setItem('person', JSON.stringify(empArr));
    showData();
    if (empArr.length == 0) {
      localStorage.clear('person');
    }
  }
}

// Edit form
function editEmp(e) {
  const id = event.target.getAttribute('data-id');
  console.log(e.target.parentElement.parentElement);
  const edit = e.target.parentElement.parentElement;
  const nameEdit =
    edit.firstChild.nextElementSibling.nextElementSibling.innerHTML;
  const emailEdit =
    edit.firstChild.nextElementSibling.nextElementSibling.nextElementSibling
      .innerHTML;
  const phoneEdit =
    edit.firstChild.nextElementSibling.nextElementSibling.nextElementSibling
      .nextElementSibling.innerHTML;

  console.log('edit', id, nameEdit, emailEdit, phoneEdit);
  document.getElementById('output').style.display = 'block';
  document.getElementById('output').innerHTML = `
  

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title" id="exampleModalLabel">Fill The Employee Deitals</h6>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <div class="card mt-4 mx-auto pt-3 pb-5 px-5 rounded" style='width:23rem'>
            <h3>Employee Details</h3>
            <label class="mt-2" for="">Name</label>
            <input class="rounded" type="text" name="" id="name">
            <label class="mt-2" for="">Email</label>
            <input class="rounded" type="email" name="" id="email">
            <label class="mt-2" for="">Phone</label>
            <input class="rounded" type="number" name="" id="phone">
           
            </div>
        </div>
        <div class="modal-footer">
        <button type="button" class="rounded btn btn-dark edit" id="submit">Edit</button>
          <button type="button" id="close" class="rounded btn btn-dark" data-dismiss="modal">Close</button>
          
        </div>
      </div>
    </div>
  </div>
`;

  fname = document.getElementById('name');
  email = document.getElementById('email');
  phone = document.getElementById('phone');

  fname.value = nameEdit;
  email.value = emailEdit;
  phone.value = phoneEdit;

  document.querySelector('.edit').addEventListener('click', function () {
    console.log('object');
    const empArr = JSON.parse(localStorage.getItem('person'));
    for (let i = 0; i < empArr.length; i++) {
      if (empArr[i].empID == id) {
        console.log(empArr[i].empID, id);
        empArr[i].nameEmp = fname.value;
        empArr[i].emailEmp = email.value;
        empArr[i].phoneEmp = phone.value;
      }
      console.log(empArr);
      localStorage.setItem('person', JSON.stringify(empArr));
    }
    document.getElementById('output').style.display = 'none';

    showData();
  });
  document.querySelector('#close').addEventListener('click', function () {
    document.getElementById('output').style.display = 'none';
  });
}

{
  /* <div class="card mt-4 mx-auto pt-3 pb-5 px-5 rounded" style='width:23rem'>
    <h3>Employee Details</h3>
    <label class="mt-2" for="">Name</label>
    <input class="rounded" type="text" name="" id="name">
    <label class="mt-2" for="">Email</label>
    <input class="rounded" type="email" name="" id="email">
    <label class="mt-2" for="">Phone</label>
    <input class="rounded" type="number" name="" id="phone">
    <input class="rounded btn btn-dark mt-3" type="submit" value="Add" id="submit">
    <input class="rounded btn btn-dark mt-3" type="button" value="Close" id="close">
    
</div> */
}
