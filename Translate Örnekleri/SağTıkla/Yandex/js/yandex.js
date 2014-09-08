function translate(text, originLang, targetLang, callback) {
  //Yandex translate
  var sentences = text.split('.'),
      translated = [],
      queryStringLimit = 2000,
      queryStringParts = [],
      offset = 0;
  for (var i=0, l=sentences.length; i < l; i++) {
    var sentence = encodeURIComponent(sentences[i]);
    if (queryStringParts[offset] && queryStringParts[offset].length >= queryStringLimit) {
      offset += 1;
    }
    if (!queryStringParts[offset]) {
      queryStringParts[offset] = sentence;
    }
    else if (queryStringParts[offset].length < queryStringLimit 
      && (queryStringParts[offset].length + (sentence.length + 1)) < queryStringLimit) {
      queryStringParts[offset] += '.' + sentence;
    }
    else {
      offset += 1;
      queryStringParts[offset] = '.' + sentence;
    }
  }
  offset = 0;
  var timestamp = (new Date).getTime();
  var translateText = function() {
    var scr = document.createElement('script'),
        params = [
          'callback=_tmp_translate_callback_' + timestamp,
          'lang=' + originLang + '-' + targetLang,
          'srv=tr-text',
          'id=adb7aca1-0-0',
          'text=' + queryStringParts[offset]
        ];
    scr.type = 'text/javascript';
    scr.src = 'http://translate.yandex.ru/tr.json/translate?' + params.join('&');
    document.body.appendChild(scr);
  };
  window['_tmp_translate_callback_' + timestamp] = function(response) {
    offset += 1;
    if (response) {
      translated.push(response);
    }
    if (queryStringParts.length == offset) {
      delete window['_tmp_translate_callback_' + timestamp];
      callback(translated.join('.'));
    }
    else {
      translateText();
    }
  };
  translateText();
}
function ajaxTranslateCallback(response) {
    //Kelime çevrilince yapılacak olan işlem.
    apprise(response,{'textOk' : 'Kapat','animate' :'300'});
}
function getSelectionHtml() {
    //Seçilen veriyi almak için gerekli fonksiyon
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
    translate(html, "en", "tr",ajaxTranslateCallback);
}