
document.addEventListener('DOMContentLoaded', () => {

  
  $(document).on("click", "#edit-status", function(event){
    event.preventDefault()
    let statusId = event.currentTarget.getAttribute('data-id');
    axios.get(`/api/weeklystatus/status/${statusId}`)
    .then(status => {
      $('#edit-weekly-status input[name="beginDate"]').val(status.data.beginDateVal);
      $('#edit-weekly-status input[name="endDate"]').val(status.data.endDateVal);
      $('#edit-weekly-status input[name="stories"]').val(status.data.status.stories);
      $('#edit-weekly-status input[name="bugsCreated"]').val(status.data.status.bugsCreated);
      $('#edit-weekly-status input[name="ticketsRejected"]').val(status.data.status.ticketsRejected);
      $('#edit-weekly-status input[name="blockers"]').val(status.data.status.blockers);
      $('#edit-weekly-status input[name="general"]').val(status.data.status.general);
      $('#edit-weekly-status input[name="testCases"]').val(status.data.status.testCases);

    })
    .catch(err => console.log(next))
    
    $('#editStatusModal').on('shown.bs.modal', function () {
    
      $('#myInput').trigger('focus')
    })
 });
  
  $(document).on("click", "#delete-status", function(event){
    let statusId = event.currentTarget.getAttribute('data-id');
    event.preventDefault()
    axios.delete(`/api/weeklystatus/delete/${statusId}`)
   .then(response => {console.log(response)})
   .catch(err => console.log(err))

 });
 


}, false);
