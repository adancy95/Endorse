
document.addEventListener('DOMContentLoaded', () => {

  
  $(document).on("click", "#edit-status", function(event){
    event.preventDefault()
    let statusId = event.currentTarget.getAttribute('data-id');
    axios.get(`/api/weeklystatus/status/${statusId}`)
    .then(status => {
      $('#edit-weekly-status input[name="tester"]').val(status.data.status.tester);
      $('#edit-weekly-status input[name="beginDate"]').val(status.data.beginDateVal);
      $('#edit-weekly-status input[name="endDate"]').val(status.data.endDateVal);
      $('#edit-weekly-status input[name="stories"]').val(status.data.status.stories);
      $('#edit-weekly-status input[name="bugsCreated"]').val(status.data.status.bugsCreated);
      $('#edit-weekly-status input[name="ticketsRejected"]').val(status.data.status.ticketsRejected);
      $('#edit-weekly-status input[name="blockers"]').val(status.data.status.blockers);
      $('#edit-weekly-status input[name="general"]').val(status.data.status.general);
      $('#edit-weekly-status input[name="nextWeek"]').val(status.data.status.nextWeek);
      $('#edit-weekly-status input[name="testCases"]').val(status.data.status.testCases);
      $('#edit-weekly-status input[name="id"]').val(status.data.status._id);

    })
    .catch(err => console.log(err))
    
    $('#editStatusModal').on('shown.bs.modal', function () {
    
      $('#myInput').trigger('focus')
    })
 });

 $(document).on("click", "#save-edits", function(event){
    event.preventDefault()
    let statusId = $(event.currentTarget.parentNode.parentNode).find('input:hidden')[1].value
    let weeklyStatus = $(event.currentTarget.parentNode.parentNode).find('input')
    event.preventDefault()
    axios.put(`/api/weeklystatus/update/${statusId}`, {
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
   .then(response => {})
   .catch(err => console.log(err))

   });
  
  $(document).on("click", "#delete-status", function(event){
    let statusId = event.currentTarget.getAttribute('data-id');
    event.preventDefault()
    axios.delete(`/api/weeklystatus/delete/${statusId}`)
   .then(response => {console.log(response)})
   .catch(err => console.log(err))

 });


 


}, false);
