/* globals $, Builder, NPMap */

Builder.ui = Builder.ui || {};
Builder.ui.modal = Builder.ui.modal || {};
Builder.ui.modal.changeStyle = (function() {
  function setHeight() {
    $('#modal-changeStyle .modal-body').css({
      height: $(document).height() - 200
    });
  }

  $('#modal-changeStyle').modal({
    backdrop: 'static'
  });
  Builder.buildTooltips();
  setHeight();
  $(window).resize(setHeight);

  return {};
})();
var set = function () {
  var options = {
    'color': $('#color')[0][$('#color')[0].selectedIndex].value,
    'name': $('#icon')[0][$('#icon')[0].selectedIndex].value
  },
  regex = new RegExp('url\\((.+?)\\)'),
  layer = $('#modal-changeStyle').data('layer');

  document.getElementById('iframe-map').contentWindow.L.npmap.icon.maki(options).createIcon().style.cssText.replace(regex, function(_,url) {
    $('#DemoIcon').html('<img src="' + url + '">');
  });

  if (layer) {
    layer.icon = options;
  }
};
