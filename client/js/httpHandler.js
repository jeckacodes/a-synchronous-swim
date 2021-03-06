(function () {

  const serverUrl = 'http://127.0.0.1:3000';

  //
  // TODO: build the swim command fetcher here
  const ajaxGetRequest = () => {
    $.ajax({
      type: 'GET',
      url: serverUrl,
      cache: false,
      contentType: true,
      processData: false,
      success: (data) => {
        console.log(data);
        SwimTeam.move(data);
        // pass information on to SwimTeam
        // set background image with CSS/jQuery
        // $.css('background-image', `url(${serverUrl}/background.jpg)`)
        // var img = document.createElement('img');
        // img.src = 'data:image/jpeg;base64,' + btoa(data.postData.data)
        //window.location = window.location.href; //reloads the screen
      },
      complete: () => {
        setTimeout(ajaxGetRequest, 1500);
      }
    });
  };
  //

  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUpload = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: serverUrl,
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        window.location = window.location.href;
      }
    });
  };

  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUpload(file);
  });

  setTimeout(ajaxGetRequest, 500);
})();

// setTimeout to ask for info from server
// pass responses to swimTeam