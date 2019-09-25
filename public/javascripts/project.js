document.addEventListener('DOMContentLoaded', () => {

  $(document).on("click", "#addProjectBtn", function(event){
    event.preventDefault()
    let projectName = $('#project-name').val();
    axios.post(`/api/projects/create`, {projectName: projectName})
    .then(project => {
      $('#project-name').val("")
      axios.get(`/api/projects/${project.data._id}`)
      .then(project => {
        console.log(project)
        $("#project-card").append( 
          `<div class="col-sm-4 p-2">
            <div class="card ">
              <div class="card-body">
                <h5 class="card-title "><a href='/projects/${project.data._id}' class="card-link text-warning">${project.data.projectName}</a></h5>
                  <hr>
                  <a href="#" class="card-link text-secondary" data-id="${project.data._id}" data-toggle="modal" id="editProjectBtn" data-target="#editProject">Edit Project</a>
                  <a href="#" class="card-link delete-btn" data-id="${project.data._id}" id="delete-project">Delete Project</a>
              </div>
            </div>
          </div>
          `
        );
        $('#project-links').after(`<a class="nav-link text-warning" href='/projects/${project.data._id}'>
        <img id="" src="../images/quill-drawing-a-line (1).png" width="20" height="20" >
        <span id=${project.data._id}>${project.data.projectName}</span></a>`)
      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
 });

  $(document).on("click", "#editProjectBtn", function(event){
    event.preventDefault()
    let projectId = event.currentTarget.getAttribute('data-id');
    let projectName = event.currentTarget.parentNode.querySelector('a')
    axios.get(`/api/projects/${projectId}`)
    .then(project => {
      $('#editProject input[name="projectName"]').val(project.data.projectName);
      $('#editProject input[name="id"]').val(project.data._id);
      console.log($(`#${project.data._id}`))
      $(`#${project.data._id}`).text(project.data.projectName);
    })
    .catch(err => console.log(err))
    
    $('#editProject').on('shown.bs.modal', function () {
      $('#myInput').trigger('focus')
    })

    $(document).on("click", "#saveProjectChanges", function(event){
      event.preventDefault()
      let projectId = $(event.currentTarget.parentNode.parentNode).find('input:hidden').val()
      let project = $(event.currentTarget.parentNode.parentNode).find('input').val()
      
      event.preventDefault()
      axios.put(`/api/projects/update/${projectId}`, {
       projectName: project
     })
     .then(response => {
       axios.get(`/api/projects/${projectId}`)
       .then(projectRes => { 
         projectName.innerHTML = `${projectRes.data.projectName}`
        
        })
       .catch(err => console.log(err))
     })
     .catch(err => console.log(err))
    
     });
    
    
 });

 

 $(document).on("click", "#delete-project", function(event){
  let cardToDelete = event.currentTarget.parentNode.parentNode.remove();
  let projectId = event.currentTarget.getAttribute('data-id');
  event.preventDefault()
  axios.delete(`/api/projects/delete/${projectId}`)
 .then(response => {})
 .catch(err => console.log(err))

});


 


}, false);
