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
    .then(response => {$('#create-weekly-status')[0].reset()})
    .catch(err => console.log(err))

  });

  axios.get('/api/projects')
  .then(projects => {
    projects.data.forEach(project => {
      $('#project-links').after(`<a class="nav-link" href='/projects/${project._id}'>${project.projectName}</a>`)
    });
  })
  .catch(err => console.log(err))

  axios.get('/users')
  .then(users => {
    users.data.forEach(user => {
      $('#user-links').after(`
      <div class="users-nav"> 
        <img src="${user.userImage}" alt="profilepic" class="user-img">
        <a class="nav-link" href="/weeklystatus/${user._id}">${user.firstName} ${user.lastName}</a>
      </div>
      <hr>
      `)
    })
  })
  .catch(err => console.log(err))
  


}, false);
