var disclaimer="";
disclaimer += "<span>";
disclaimer += "<span>";
disclaimer += "• Virtual Assistant is an automated service, and therefore cannot answer questions";
disclaimer += " specific to your account.";
disclaimer += "<br\/>";
disclaimer += "• Please do NOT disclose any personal account information in your messages.";
disclaimer += "<br\/>";
disclaimer += "• The information you input here will be recorded for service quality assurance.";
disclaimer += "<br\/>";
disclaimer += "• Data will be processed and stored by members of the Fidelity Group and authorised third parties, which may include processing overseas.";
disclaimer += "<br\/>";
disclaimer += "• For the details please read the <a href=\"https:\/\/www.fidelity.com.hk\/investor\/security-privacy\" target=\"_blank\">Security and Privacy<\/a> guidelines.";
disclaimer += "<\/span>";
disclaimer += "<\/span>";

$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">');

localStorage.removeItem('sk_deviceid');

var greeting = false;

function getIP(){
  return $.getJSON("https://freegeoip.net/json/",
      function (data) {
          return data.ip;
      });
}

getIP().then(function(data){
  var ip = data.ip;
  
  var clientId = '';

  if (ga){
    clientId = ga.getAll()[0].get('clientId');
  }

  var skPromise = Smooch.init({ 
    appToken: '13cfz4srwuq5jgvgrxeqkl85h',
    emailCaptureEnabled: false,
    imageUploadEnabled: false,
    linkedEnabled: false,
    speech: '',    
    properties: {
        'ip': ip,
        'clientId': clientId
    },
    disclaimer: disclaimer,
    customText: {
      headerText: '',
      introductionText: 'Welcome to Fidelity. I\'m Clare. Simply ask me question on MPF and I\'ll do my best to help.',
      disclaimerHeader: 'Important Notice'
    }
  });

  skPromise.then(function() {
      Smooch.on('widget:opened', function(message) {  
        if (!greeting){
            greeting = true;
            
            setTimeout(function() {      
              var userId = Smooch.getUserId();

              $.ajax({
                      type: "POST",
                      url: "https://demo3.clare.ai/fidelity/api/fidelity2/track",
                      async: true,
                      cache: false,
                      crossDomain: true,
                      data: JSON.stringify({ userId: userId, event: "greeting"}),
                      contentType: "application/json; charset=utf-8",
                      dataType: "json",
                      success: function (responseData, textStatus, jqXHR) {
                        Smooch.getConversation();
                      },
                      error: function (responseData, textStatus, errorThrown) {
                          
                      }
                  });

                  // Smooch.track('greeting');
            }, 2000);
        }

      });
  });

});
