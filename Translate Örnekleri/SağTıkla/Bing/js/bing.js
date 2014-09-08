var g_token = '';
function onLoad() {
  getToken();
  setInterval(getToken, 9 * 60 * 1000);
}
function getToken() {
  var requestStr = "token.php";
  $.ajax({
    url: requestStr,
    type: "GET",
    cache: true,
    dataType: 'json',
    success: function (data) {
      g_token = data.access_token;
    }
  });
}
function translate(text, from, to) {
  var p = new Object;
  p.text = text;
  p.from = from;
  p.to = to;
  p.oncomplete = 'ajaxTranslateCallback';
  p.appId = "Bearer " + g_token;
  var requestStr = "http://api.microsofttranslator.com/V2/Ajax.svc/Translate";
  $.ajax({
    url: requestStr,
    type: "GET",
    data: p,
    dataType: 'jsonp',
    cache: true
  });
}
function ajaxTranslateCallback(response) {
  //Kelime çevrilince yapılacak olan işlem.
  apprise(response,{'textOk' : 'Kapat','animate' :'300'});
}
function getSelectionHtml() {
    var html = "";
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.innerHTML;
        }
    } else if (typeof document.selection != "undefined") {
        if (document.selection.type == "Text") {
            html = document.selection.createRange().htmlText;
        }
    }
    translate(html, "en", "tr");
}