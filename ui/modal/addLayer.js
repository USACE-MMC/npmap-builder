/* globals $, Builder, NPMap */

$('head').append($('<link rel="stylesheet">').attr('href', 'ui/modal/addLayer.css'));

Builder.ui = Builder.ui || {};
Builder.ui.modal = Builder.ui.modal || {};
Builder.ui.modal.addLayer = (function() {
  var
    $attribution = $('#layerAttribution'),
    $description = $('#layerDescription'),
    $name = $('#layerName'),
    $type = $('#layerType'),
    types = {
      arcgisserver: {
        _tiled: false,
        _url: null,
        fields: {
          $layers: $('#arcgisserver-layers'),
          $url: $('#arcgisserver-url').bind('change paste keyup', function() {
            var value = $(this).val(),
                lower = value.toLowerCase();

            if (lower.indexOf('mapserver') === (value.length - 9) || lower.indexOf('mapserver/') === (value.length - 10)) {
              $.ajax({
                dataType: 'json',
                success: function(response) {
                  if (value !== types.arcgisserver._url) {
                    types.arcgisserver.fields.$layers.find('option').remove();
                    types.arcgisserver.fields.$layers.removeAttr('disabled');
                    $.each(response.layers, function(i, layer) {
                      types.arcgisserver.fields.$layers.append($('<option>', {
                        value: layer.id
                      }).text(layer.id + ': ' + layer.name));
                    });
                    types.arcgisserver._tiled = response.singleFusedMapCache || false;
                    types.arcgisserver._url = value;
                  }
                },
                url: value + '?f=json&callback=?'
              });
            } else {
              types.arcgisserver.fields.$layers.find('option').remove();
              types.arcgisserver.fields.$layers.attr('disabled', 'disabled');
              types.arcgisserver._url = null;
            }
          })
        },
        reset: function() {
          types.arcgisserver.fields.$layers.find('option').remove();
          types.arcgisserver.fields.$layers.attr('disabled', 'disabled');
          types.arcgisserver.fields.$url.val('');
          types.arcgisserver._tiled = false;
          types.arcgisserver._url = null;
        }
      },
      cartodb: {
        fields: {
          $table: $('#cartodb-table'),
          $user: $('#cartodb-user')
        },
        reset: function() {
          types.cartodb.fields.$table.val('');
          types.cartodb.fields.$user.val('');
        }
      },
      geojson: {
        fields: {
          $url: $('#geojson-url')
        },
        reset: function() {
          types.geojson.fields.$url.val('');
        }
      },
      github: {
        fields: {
          $path: $('#github-path'),
          $repo: $('#github-repo'),
          $user: $('#github-user')
        },
        reset: function() {
          types.github.fields.$path.val('');
          types.github.fields.$repo.val('');
          types.github.fields.$user.val('');
        }
      },
      kml: {
        fields: {
          $url: $('#kml-url')
        },
        reset: function() {
          types.kml.fields.$url.val('');
        }
      },
      mapbox: {
        fields: {
          $id: $('#mapbox-id')
        },
        reset: function() {
          types.mapbox.fields.$id.val('');
        }
      }
    };

  function setHeight() {
    $('#modal-addLayer .tab-content').css({
      height: $(document).height() - 289
    });
  }

  $('#modal-addLayer').modal({
    backdrop: 'static'
  })
    .on('hidden.bs.modal', function() {
      $attribution.val(null);
      $description.val(null);
      $name.val(null);
      $type.val('arcgisserver').trigger('change');
      $('#modal-addLayer .tab-content').css({
        top: 0
      });
      $.each(types, function(type) {
        types[type].reset();
      });
      $.each($('#modal-addLayer .form-group'), function(index, formGroup) {
        var $formGroup = $(formGroup);

        if ($formGroup.hasClass('has-error')) {
          $formGroup.removeClass('has-error');
        }
      });
    })
    .on('shown.bs.modal', function() {
      $type.focus();
    });
  $('#modal-addLayer .btn-primary').click(function() {
    Builder.ui.modal.addLayer._click();
  });
  $('#modal-addLayer-search').typeahead([{
    header: '<h3 class="modal-addLayer-search-type">ArcGIS Online</h3>',
    limit: 10,
    prefetch: 'data/arcgisonline-search.json',
    valueKey: 'n'
  },{
    header: '<h3 class="modal-addLayer-search-type">ArcGIS Server</h3>',
    limit: 10,
    prefetch: 'data/arcgisserver-search.json',
    valueKey: 'n'
  },{
    header: '<h3 class="modal-addLayer-search-type">CartoDB</h3>',
    limit: 10,
    prefetch: 'data/cartodb-search.json',
    valueKey: 'n'
  },{
    header: '<h3 class="modal-addLayer-search-type">GitHub</h3>',
    limit: 10,
    prefetch: 'data/github-search.json',
    valueKey: 'n'
  },{
    header: '<h3 class="modal-addLayer-search-type">MapBox Hosting</h3>',
    limit: 10,
    prefetch: 'data/tilestream-search.json',
    valueKey: 'n'
  }]);
  Builder.rebuildTooltips();
  setHeight();
  $type.focus();
  $(window).resize(setHeight);

  return {
    /**
     *
     */
    _click: function() {
      var
        attribution = $attribution.val() || null,
        config,
        description = $description.val() || null,
        errors = [],
        fields = [$attribution, $description, $name],
        name = $name.val() || null;

      if (!name) {
        errors.push($name);
      }

      if (typeof NPMap.overlays === 'undefined') {
        NPMap.overlays = [];
      }

      if ($('#arcgisserver').is(':visible')) {
        (function() {
          var layers = types.arcgisserver.fields.$layers.val(),
              url = types.arcgisserver.fields.$url.val();

          $.each(types.arcgisserver.fields, function(field) {
            fields.push(field);
          });

          if (!layers) {
            errors.push(types.arcgisserver.fields.$layers);
          } else {
            layers = layers.join(',');
          }

          if (!url) {
            errors.push(types.arcgisserver.fields.$url);
          }

          config = {
            layers: layers,
            opacity: 1,
            tiled: types.arcgisserver._tiled,
            type: 'arcgisserver',
            url: url
          };
        })();
      } else if ($('#cartodb').is(':visible')) {
        (function() {
          var $table = $('#cartodb-table'),
              table = $table.val(),
              $user = $('#cartodb-user'),
              user = $user.val();

          fields.push($table);
          fields.push($user);

          if (!table) {
            errors.push($table);
          }

          if (!user) {
            errors.push($user);
          }

          config = {
            table: table,
            type: 'cartodb',
            user: user
          };
        })();
      } else if ($('#geojson').is(':visible')) {
        (function() {
          var $url = $('#geojson-url'),
              url = $url.val();

          fields.push($url);

          if (!url) {
            errors.push($url);
          }

          config = {
            type: 'geojson',
            url: url
          };
        })();
      } else if ($('#github').is(':visible')) {
        (function() {
          var path = types.github.fields.$path.val(),
              repo = types.github.fields.$repo.val(),
              user = types.github.fields.$user.val();

          $.each(types.github.fields, function(field) {
            fields.push(field);
          });

          if (!path) {
            errors.push(types.github.fields.$path);
          }

          if (!repo) {
            errors.push(types.github.fields.$repo);
          }

          if (!user) {
            errors.push(types.github.fields.$user);
          }

          config = {
            path: path,
            repo: repo,
            type: 'github',
            user: user
          };
        })();
      } else if ($('#kml').is(':visible')) {
        (function() {
          var $url = $('#kml-url'),
              url = $url.val();

          fields.push($url);

          if (!url) {
            errors.push($url);
          }

          config = {
            'type': 'kml',
            'url': url
          };
        })();
      } else if ($('#mapbox').is(':visible')) {
        (function() {
          var $id = $('#mapbox-id'),
              id = $id.val();

          fields.push($id);

          if (!id) {
            errors.push($id);
          }

          config = {
            'id': id,
            'type': 'mapbox'
          };
        })();
      }

      if (errors.length) {
        $.each(errors, function(i, $el) {
          $el.parent().addClass('has-error');
        });
      } else {
        var $layers = $('#layers'),
            index;

        config.attribution = attribution;
        config.description = description;
        config.name = name;
        NPMap.overlays.push(config);
        Builder.updateMap();
        $('#modal-addLayer').modal('hide');

        if (!$layers.is(':visible')) {
          $layers.prev().hide();
          $('#customize .content').css({
            padding: 0
          });
          $layers.show();
        }

        index = $layers.children().length;

        $layers.append($('<li class="dd-item" data-id="' + index + '"><div class="letter">' + Builder._abcs[index] + '</div><div class="details"><span>' + name + '</span><span><img src="img/edit-layer.png" style="cursor:pointer;float:left;"><button style="background-color:transparent;border:none;float:right;" onclick="Builder._handlers.layerRemoveOnClick(this);"><img src="img/remove-layer.png" style="cursor:pointer;float:right;margin-top:3px;"></button></span></div></li>'));
        Builder._refreshLayersUl();
      }
    },
    /**
     *
     */
    _layerTypeOnChange: function(value) {
      $.each($('#manual div'), function(i, div) {
        var $div = $(div);

        if ($div.attr('id')) {
          if ($div.attr('id') === value) {
            $div.show();
          } else {
            $div.hide();
          }
        }
      });
    }
  };
})();
