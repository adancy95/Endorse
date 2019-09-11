document.addEventListener('DOMContentLoaded', () => {

  $('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
    

  })

  $(document).on("click", "#save-status", function(event){
     let weeklyStatus = $('#create-weekly-status input')
     event.preventDefault()
     axios.post('/api/weeklystatus/create', {
      tester: weeklyStatus.first().val(),
      beginDate: weeklyStatus.eq(1).val() ,
      endDate: weeklyStatus.eq(2).val() ,
      bugsCreated: weeklyStatus.eq(4).val() ,
      ticketsRejected: weeklyStatus.eq(5).val() ,
      stories: weeklyStatus.eq(3).val() ,
      blockers: weeklyStatus.eq(6).val() ,
      general: weeklyStatus.eq(7).val() ,
      nextWeek: weeklyStatus.eq(8).val() ,
      testCases: weeklyStatus.eq(9).val() 
    })
    .then(response => {$('#create-weekly-status')[0].reset()
        // axios.get(`/api/weeklystatus/status/${response.data[1]._id}`)
        // .then(status => {
        //     `
        //     <div class="card-body">
        //     <h6 class="card-title">Stories Tested</h6>
        //     <p class="card-text">{{this.stories}}</p>
        //     <h6 class="card-title">Bugs Opened</h6>
        //     <p class="card-text">{{this.bugsCreated}}</p>
        //     <h6 class="card-title">Tickets Rejected</h6>
        //     <p class="card-text">{{this.ticketsRejected}}</p>
        //     <h6 class="card-title">Blockers</h6>
        //     <p class="card-text">{{this.blockers}}</p>
        //     <h6 class="card-title">General</h6>
        //     <p class="card-text">{{this.general}}</p>
        //     <h6 class="card-title">Next Week</h6>
        //     <p class="card-text">{{this.nextWeek}}</p>
        //     <h6 class="card-title">Test Cases</h6>
        //     <p class="card-text">{{this.testCases}}</p>
            
            
        //   </div>
        //   <div class="card-body">
        //     <form id="status" action="">
        //       <a href="#" data-id="{{this._id}}" class="card-link" id="edit-status" data-toggle="modal" data-target="#editStatusModal">Edit Status</a>
        //       <a href="#" data-id="{{this._id}}"  class="card-link" id="delete-status" >Delete Status</a>
        //     </form>
        //   </div>
        //  `
        // })
        // .catch(err => console.log(err))
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
