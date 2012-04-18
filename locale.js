(function() {
  // The global reference.  All locale.js logic will reference this.
  var locale = this.locale = {};

  // Initialize a default value for the locale.
  locale.current = null;

  // Allow the use of jQuery, Zepto, or Ender with the locale package.
  var $ = this.jQuery || this.Zepto || this.ender;
  
  // Initialize a helper to retrieve the XMLHttpRequest.
  var getXMLHttpRequest = function () {
    // Attempt to retrieve the browser's native XMLHttpRequest object.
    if (window.XMLHttpRequest) {
        return new window.XMLHttpRequest;
    }      
    
    // Attempt to instantiate a new HTTP request object using an Active X object.
    try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
      catch (e) {}
    try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
      catch (e) {}
    try { return new ActiveXObject("Microsoft.XMLHTTP"); }
      catch (e) {}

    // Return a default of null.
    return null;
  };

  // Check if any available frameworks were found.
  if ($) {
    $.ajax({ 
      async: false, 
      type: 'HEAD', 
      url: window.location, 
      success: function (data, status, jqxhr) {
        locale.current = jqxhr.getResponseHeader('Accept-Language');
      }
    });
  } 
  
  // If no frameworks were found attempt to retrieve an XHR object manually.
  var xhr = null;
  if (!locale.current && xhr = getXMLHttpRequest()) {
    xhr.open('HEAD', window.location, false);
    xhr.onreadystatechange = function () {
      if (xhr.readyState==4) { 
        locale.current = xhr.getResponseHeader('Accept-Language'); 
      }
    };
    xhr.send();
  }
  
  // Fallback to the browser's settings if no locale can be detected.
  locale.current = (locale.current || window.navigator.userLanguage || window.navigator.language || 'en').toLowerCase();
})();