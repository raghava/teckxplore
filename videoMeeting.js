var initiateModal = false;
var api
async function openVideoMeeting() {
  if (initiateModal) {
    let product_modal = document.getElementById('event-modal');
    var modal_div = document.createElement('div');
    modal_div.innerHTML = `
              <div id="videoMeeting" class="modal fade">
                <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title">Video meeting</h5>
                      <button type="button" class="close" data-dismiss="modal" onClick='dispose()'>&times;</button>
                    </div>
                        <div class="modal-body" style='width:800px; height:800px'>
                        <div id='meet'>                      
                        </div>  
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              `
    product_modal.appendChild(modal_div);
    if (localStorage.getItem('participant')) {
      var data =JSON.parse(localStorage.getItem('participant'))
    }
    if(!localStorage.getItem('isMeeting')){
      const domain = 'meet.jit.si';
      const options = {
        roomName: 'JitsiMeetAPIExample',
        width: 768,
        height: 707,
        userInfo: {
          email: data.user.email,
          displayName: data.user.displayName,
      },
        parentNode: document.querySelector('#meet')
    };
      api = new JitsiMeetExternalAPI(domain, options);
      localStorage.setItem("isMeeting",JSON.stringify(true));
      jQuery("#videoMeeting").modal({ backdrop: 'static', keyboard: false }).show();
    }
  }
}

(function ($) {
  "use strict"
  /* 1. Proloder */

  $(window).on('load', function () {
    localStorage.removeItem('isMeeting')
  })
})(jQuery);

function dispose(){
  localStorage.removeItem('isMeeting');
  api.dispose();
}