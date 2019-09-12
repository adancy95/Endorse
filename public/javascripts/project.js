document.addEventListener('DOMContentLoaded', () => {

  $(document).on("click", "#addProjectBtn", function(event){
    event.preventDefault()
    let projectName = $('#project-name').val();
    console.log(projectName)
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
      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
 });

  $(document).on("click", "#editProjectBtn", function(event){
    event.preventDefault()
    let projectId = event.currentTarget.getAttribute('data-id');
    axios.get(`/api/projects/${projectId}`)
    .then(project => {
      $('#editProject input[name="projectName"]').val(project.data.projectName);
      $('#editProject input[name="id"]').val(project.data._id);
    })
    .catch(err => console.log(err))
    
    $('#editProject').on('shown.bs.modal', function () {
      $('#myInput').trigger('focus')
    })
    
 });

 $(document).on("click", "#saveProjectChanges", function(event){
  event.preventDefault()
  let projectId = $(event.currentTarget.parentNode.parentNode).find('input:hidden').val()
  let project = $(event.currentTarget.parentNode.parentNode).find('input').val()
  event.preventDefault()
  axios.put(`/api/projects/update/${projectId}`, {
   projectName: project
 })
 .then(response => {})
 .catch(err => console.log(err))

 });


 $(document).on("click", "#delete-project", function(event){
  let projectId = event.currentTarget.getAttribute('data-id');
  event.preventDefault()
  axios.delete(`/api/projects/delete/${projectId}`)
 .then(response => {console.log(response)})
 .catch(err => console.log(err))

});


 


}, false);
