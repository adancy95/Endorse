document.addEventListener('DOMContentLoaded', () => {

  $('#createModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
    

  })

  $(document).on("click", "#save-status", function(event){
     let weeklyStatus = $('#create-weekly-status').serializeArray()
    //  let weeklyStatus =  $("#create-weekly-status").serialize();
    
  
     
   
     event.preventDefault()
     axios.post('/api/weeklystatus/create', { weeklyStatus })
    .then(response => { console.log(response) 
      $('#create-weekly-status')[0].reset()
        axios.get(`/api/weeklystatus/status/${response.data[1]._id}`)
        .then(status => { console.log(status)
          $('#timeline-card').append(`
          <!-- timeline item 1 left dot -->
          <div class="col-auto text-center flex-column d-none d-sm-flex">
              <div class="row h-50">
                  <div class="col">&nbsp;</div>
                  <div class="col">&nbsp;</div>
              </div>
              <h5 class="m-2">
                  {{!-- <span class="badge badge-pill bg-light border">&nbsp;</span> --}}
                   <img src="{{status.data.userImage}}" alt="profilepic" class="user-img">
              </h5>
              <div class="row h-75">
                  <div class="col border-right">&nbsp;</div>
                  <div class="col">&nbsp;</div>
              </div>
          </div>
          <!-- timeline item 1 event content -->
          <div class="col py-2">
              <div class="card">
                  <div class="card-body">
                      <div class="float-right text-muted">${status.data.formattedUpdatedDate}</div>
                      <h4 class="card-title text-muted">${status.data.firstName} ${status.data.lastName}</h4>
                      <p class="card-text">Weekly Status for the week of ${status.data.formattedBeginDate} - ${status.data.formattedEndDate}</p>
                  </div>
                  <button class="btn btn-sm btn-outline-warning" type="button" data-target="#t2_details" data-toggle="collapse">Show Details ▼</button>
                      <div class="collapse border" id="t2_details">
                          <div class="p-2">
                            <div class="card-body">
                                <h6 class="card-title">Stories Tested</h6>
                                <p class="card-text">${status.data.stories}</p>
                                <h6 class="card-title">Bugs Opened</h6>
                                <p class="card-text">${status.data.bugsCreated}</p>
                                <h6 class="card-title">Tickets Rejected</h6>
                                <p class="card-text">${status.data.ticketsRejected}</p>
                                <h6 class="card-title">Blockers</h6>
                                <p class="card-text">${status.data.blockers}</p>
                                <h6 class="card-title">General</h6>
                                <p class="card-text">${status.data.general}</p>
                                <h6 class="card-title">Next Week</h6>
                                <p class="card-text">${status.data.nextWeek}</p>
                                <h6 class="card-title">Test Cases</h6>
                                <p class="card-text">${status.data.testCases}</p>
                              </div>
                              <div class="card-body">
                                <form id="status" action="">
                                  <a href="#" data-id="${status.data._id}" class="card-link text-secondary " id="edit-status" data-toggle="modal" data-target="#editStatusModal">Edit Status</a>
                                  <a href="#" data-id="${status.data._id}"  class="card-link delete-btn" id="delete-status" >Delete Status</a>
                                </form>
                              </div>
                              
                          </div>
                      </div>
                  
              </div>
          </div>
          `)
        })
        .catch(err => console.log(err))
  })
    .catch(err => console.log(err))

  });

  axios.get('/api/projects')
  .then(projects => {
    projects.data.forEach(project => {
      $('#project-links').after(`<a class="nav-link text-warning" href='/projects/${project._id}'>
      <img id="" src="../images/quill-drawing-a-line (1).png" width="20" height="20" >
      ${project.projectName}</a> <hr>`)
    });
  })
  .catch(err => console.log(err))

  axios.get('/users')
  .then(users => {
    users.data.forEach(user => {
      $('#user-links').after(`
      <div class="users-nav"> 
        <img src="${user.userImage}" alt="profilepic" class="user-img">
        <a class="nav-link text-warning " href="/weeklystatus/${user._id}">${user.firstName} ${user.lastName}</a>
      </div>
      <hr>
      `)
    })
  })
  .catch(err => console.log(err))
  

  $(".custom-file-input").on("change", function() {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
  })
}, false);
