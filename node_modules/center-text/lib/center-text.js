// Grabbed from underscore.string
// which I have found out already had this module's functionality -_-;;
// DEV: This should be in its own module
var strRepeat = function(str, qty){
  if (qty < 1) return '';
  var result = '';
  while (qty > 0) {
    if (qty & 1) {
      result += str;
    }
    qty >>= 1;
    str += str;
  }
  return result;
};

// Grabbed from colors
// https://github.com/Marak/colors.js/blob/v0.6.2/colors.js#L232-L234
function stripColors(input) {
  return input.replace(/\x1B\[\d+m/g, '');
}

function centerText(input, options) {
  // Fallback options
  options = options || {};
  var cols = options.columns || process.stdout.columns;

  // Remove colors from the string
  var colorlessInput = stripColors(input);

  // Calculate the padding for the text
  var deadSpace = cols - colorlessInput.length;
  var offset = deadSpace / 2;
  var morePadding = Math.ceil(offset);
  var lessPadding = Math.floor(offset);

  // Generate the text
  var leftPadding = options.leftBias ? lessPadding : morePadding;
  var rightPadding = options.leftBias ? morePadding : lessPadding;
  return strRepeat(' ', leftPadding) + input + strRepeat(' ', rightPadding);
}

module.exports = centerText;