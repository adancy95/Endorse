document.addEventListener('DOMContentLoaded', () => {

  $('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })


}, false);
