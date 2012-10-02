// This file was automatically generated from file-dialog.soy.
// Please don't edit this file by hand.

if (typeof component == 'undefined') { var component = {}; }
if (typeof component.ui == 'undefined') { component.ui = {}; }
if (typeof component.ui.fileDialog == 'undefined') { component.ui.fileDialog = {}; }
if (typeof component.ui.fileDialog.template == 'undefined') { component.ui.fileDialog.template = {}; }


component.ui.fileDialog.template.filedialog = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="file-dialog"><div>File path</div><ul id = "file-list"><li class="file-header"><div class="file-header-name-column" ><div data-area-name="name"> Name</div></div><div class="file-header-size-column"  data-area-name="size"> Size</div><div class="file-header-modification-date-column" data-area-name="midification-date"> Modification Date </div></li></ul></div>');
  return opt_sb ? '' : output.toString();
};


component.ui.fileDialog.template.fileheader = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<li class="file-header"><div class="file-header-name-column" ><div data-area-name="name"> Name</div></div><div class="file-header-size-column"  data-area-name="size"> Size</div><div class="file-header-modification-date-column" data-area-name="midification-date"> Modification Date </div></li>');
  return opt_sb ? '' : output.toString();
};


component.ui.fileDialog.template.filerow = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<li class="file-row"><div class="file-name-column" ><div class=" file-icon-thumbnail-spaceholder" data-area-name="thumbnail"><div class=" ', soy.$$escapeHtml(opt_data.thumbnail), '"></div></div><div class="file-name" data-area-name="name"> ', soy.$$escapeHtml(opt_data.name), '</div></div><div class="file-size-column"  data-area-name="size"> ', soy.$$escapeHtml(opt_data.size), ' </div><div class="file-modificaion-date-column" data-area-name="midification-date">', soy.$$escapeHtml(opt_data.moddate), ' </div></li>');
  return opt_sb ? '' : output.toString();
};
