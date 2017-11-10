localStorage.removeItem('sk_deviceid');

var greeting = false;

var skPromise = Smooch.init({ 
    appToken: '9rdvx7xi6lkoj4i7mpyza5ut9',
    emailCaptureEnabled: false,
    imageUploadEnabled: false,
    linkedEnabled: false,
    speech: ''
  });

  skPromise.then(function() {
      Smooch.on('widget:opened', function(message) {  
        if (!greeting){
            greeting = true;
            setTimeout(function() {      
              var userId = Clare.getUserId();
              $.ajax({
                      type: "POST",
                      url: "https://hk-demo3.clare.ai/api/webhook2/track",
                      async: true,
                      cache: false,
                      crossDomain: true,
                      data: JSON.stringify({ userId: userId, event: "welcome", language: "en-us"}),
                      contentType: "application/json; charset=utf-8",
                      dataType: "json",
                      success: function (responseData, textStatus, jqXHR) {
                        Clare.getConversation();
                      },
                      error: function (responseData, textStatus, errorThrown) {
                          
                      }
                  });

                  // Smooch.track('greeting');
            }, 2000);
        }
      });
  });