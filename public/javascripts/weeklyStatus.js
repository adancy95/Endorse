
document.addEventListener('DOMContentLoaded', () => {

  
  $(document).on("click", "#edit-status", function(event){
    let targetStatusCard = event.currentTarget.parentNode.parentNode.parentNode.querySelectorAll('p')
    let targetStatusCardArr = Array.from(targetStatusCard);

    console.log(event.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelectorAll('input'))
    event.preventDefault()
    let statusId = event.currentTarget.getAttribute('data-id');
    axios.get(`/api/weeklystatus/status/${statusId}`)
    .then(status => {
      $('#edit-weekly-status input[name="tester"]').val(status.data.status.tester._id);
      $('#edit-weekly-status input[name="beginDate"]').val(status.data.beginDateVal);
      $('#edit-weekly-status input[name="endDate"]').val(status.data.endDateVal);
      $('#edit-weekly-status textarea[name="stories"]').val(status.data.status.stories);
      $('#edit-weekly-status textarea[name="bugsCreated"]').val(status.data.status.bugsCreated);
      $('#edit-weekly-status textarea[name="ticketsRejected"]').val(status.data.status.ticketsRejected);
      $('#edit-weekly-status textarea[name="blockers"]').val(status.data.status.blockers);
      $('#edit-weekly-status textarea[name="general"]').val(status.data.status.general);
      $('#edit-weekly-status textarea[name="nextWeek"]').val(status.data.status.nextWeek);
      $('#edit-weekly-status textarea[name="testCases"]').val(status.data.status.testCases);
      $('#edit-weekly-status input[name="id"]').val(status.data.status._id);

    })
    .catch(err => console.log(err))
    
    $('#editStatusModal').on('shown.bs.modal', function () {
      $('#myInput').trigger('focus')
    })

    $(document).on("click", "#save-edits", function(event){
      console.log(targetStatusCard)
      event.preventDefault()
      let editWeeklyStatus = $('#edit-weekly-status').serializeArray()
      axios.put(`/api/weeklystatus/update/${editWeeklyStatus[10].value}`, editWeeklyStatus)
     .then(response => {
        axios.get(`/api/weeklystatus/status/${response.data[1]._id}`)
        .then(status => {
          let data = status.data
          // ${data.formattedUpdatedDate}
          // ${data.status.tester.firstName} ${data.status.tester.lastName}
          // ${data.formattedBeginDate} - ${status.data.formattedEndDate}
          console.log(data)
          targetStatusCard[0].innerHTML = `${data.status.stories}`
          targetStatusCard[1].innerHTML = `${data.status.bugsCreated}`
          targetStatusCard[2].innerHTML = `${data.status.ticketsRejected}`
          targetStatusCard[3].innerHTML =  `${data.status.blockers}`
          targetStatusCard[4].innerHTML = `${data.status.general}`
          targetStatusCard[5].innerHTML = `${data.status.nextWeek}`
          targetStatusCard[6].innerHTML = `${data.status.testCases}`
        })
        .catch(err => console.log(err))
         })
     .catch(err => console.log(err))
  
     });
 });

 
  
  $(document).on("click", "#delete-status", function(event){
    let statusId = event.currentTarget.getAttribute('data-id');
    event.preventDefault()
    axios.delete(`/api/weeklystatus/delete/${statusId}`)
   .then(response => {console.log(response)})
   .catch(err => console.log(err))

 });


 


}, false);
