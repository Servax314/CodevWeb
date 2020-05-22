/*download an image
$("<a>")
    .attr("href", "img.png")
    .attr("download", "output.png")
    .appendTo("body")
    .click()
    .remove();*/

/*var a = document.createElement('a');
a.href = "img.png";
a.download = "output.png";
document.body.appendChild(a);
a.click();
document.body.removeChild(a);

var fileSelect = document.getElementById("fileSelect"),
  fileElem = document.getElementById("fileElem");

fileSelect.addEventListener("click", function (e) {
  if (fileElem) {
    fileElem.click();
  }
  e.preventDefault(); // empêche la navigation vers "#"
}, false);*/

