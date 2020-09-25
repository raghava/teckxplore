var vendorDetails = {};
var product_collection = [];
var initiateModal = false;

async function openProductModal() {
  if (initiateModal) {
    let product_modal = document.getElementById('event-modal');
    var modal_div = document.createElement('div');
    modal_div.innerHTML = `
              <div id="ProductInfoVideo" class="modal fade">
                <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title">Product Details</h5>
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">

                      <div class="row">
                        <div class="col-lg-6">
                          <div class="form-group">
                            <span >Product Name</span><br>
                            <span id="product-name" class="font-weight-light" style="font-size: 15px;"></span>
                          </div>
                          <div class="form-group">
                            <span >Product Youtube URL</span><br>
                            <a href="" id="product-youtubeurl" target="_blank">
                            <span id="text" style="color: #0275d8;text-decoration: underline;font-size: 15px;"></span></a>
                          </div>
                      </div>

                      <div class="col-lg-6">
                          <div class="form-group">
                            <span >Contact Details</span><br>
                            <span id="contact-info" class="font-weight-light" style="font-size: 15px;"></span>
                          </div>
                            <div class="form-group">
                            <span >Company Name</span><br>
                            <span id="company-name" class="font-weight-light" style="font-size: 15px;"></span>
                          </div>
                            <div class="form-group">
                            <span >Company GST</span><br>
                            <span id="company-gst" class="font-weight-light" style="font-size: 15px;"></span>
                          </div>
                          <div class="form-group">
                            <span >Company Address</span><br>
                            <span id="company-address" class="font-weight-light" style="font-size: 15px;"></span>
                          </div>
                      </div>

                    </div>
                        <h5>Products</h5>
                        <hr>
                          <div style="width: '100%';height: 200px;overflow-x: scroll;overflow-y: hidden;">
                          <div id="product_list" style="display:flex"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              `
    product_modal.appendChild(modal_div);

    document.getElementById('company-name').innerHTML = vendorDetails.companyName;
    document.getElementById('company-gst').innerHTML = vendorDetails.companyGST;
    document.getElementById('company-address').innerHTML = `${vendorDetails.addressLine1}, ${vendorDetails.city},${vendorDetails.state} ${vendorDetails.country}`;
    document.getElementById('contact-info').innerHTML = `${vendorDetails.primaryContactFirstName}, ${vendorDetails.primaryContactLastName}<br>${vendorDetails.primaryContactEmail}, ${vendorDetails.primaryContactPhoneNumber}`;

    if (vendorDetails.productDetails && vendorDetails.productDetails.length) {
      product_collection = vendorDetails.productDetails;
      showSelectedProduct(0);
    }
    product_collection.forEach((product, key) => {
      let main_div = document.createElement('div');
      main_div.className = 'text-center';
      if (product.productDetailsProductImage.length) {
        main_div.innerHTML = `
      <img src="${product.productDetailsProductImage[0].url}" width="180px" height="150px" onclick="showSelectedProduct(${key})" 
      class="p-2" style="cursor: pointer"/>
      <span style="font-size: 15px;">${product.productName}</span>
      `
      } else {
        main_div.innerHTML = `
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTYWuhcxmhBdb1B2vXhXAGAFn-XdyyUmQFfQw&usqp=CAU" width="180px" height="150px" onclick="showSelectedProduct(${key})" 
      class="p-2" style="cursor: pointer"/>
      <span style="font-size: 15px;">${product.productName}</span>
      `
      }
      document.getElementById('product_list').appendChild(main_div);
    });
    jQuery("#ProductInfoVideo").modal({ backdrop: 'static', keyboard: false }).show();
  }
}


//bind selected product
function showSelectedProduct(key) {
  document.getElementById('product-name').innerHTML = product_collection[key].productName;
  document.getElementById('product-youtubeurl').href = product_collection[key].provideYouTubeVideolink;
  document.getElementById('text').innerHTML = product_collection[key].provideYouTubeVideolink;
}

(function ($) {
  "use strict"

  /* 1. Proloder */
  $(window).on('load', function () {
    const db = firebase.firestore();
    db.collection('vendors').doc('ApWgwKGu9EaXRaK3UfVDpK4cT263').onSnapshot(function (doc) {
      vendorDetails = doc.data();
      initiateModal = true;
      console.log(vendorDetails);
    });
  })
})(jQuery);