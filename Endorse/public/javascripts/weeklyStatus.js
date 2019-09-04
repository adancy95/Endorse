document.addEventListener('DOMContentLoaded', () => {

  $(document).on("click", "#delete-status", function(event){
    let statusId = $('#status-id').val()
    event.preventDefault()
    axios.delete(`/api/weeklystatus/delete/${statusId}`)
   .then(response => {console.log(response)})
   .catch(err => console.log(err))

 });
 


}, false);
