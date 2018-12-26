window.onload = function() {

    // Detect IE
    function detectIE() {
      var ua = window.navigator.userAgent;
  
      var msie = ua.indexOf('MSIE ');
      if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
      }
  
      var trident = ua.indexOf('Trident/');
      if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
      }
  
      var edge = ua.indexOf('Edge/');
      if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
      }
  
      // other browser
      return false;
    }
  
  
    var isIE = detectIE();
    
    if (isIE != false) {

      var obCoverImgs = document.querySelectorAll('.cover');
      var imgLength;
      imgLength = obCoverImgs.length;
      var thisParent;
      var newDiv;
      var thisSRC;

      for (var i = 0; i < imgLength; i++) {

        thisSRC = obCoverImgs[i].src;
        thisParent = obCoverImgs[i].parentNode;

        if (thisSRC) {

          obCoverImgs[i].className += " hidden";

          newDiv = document.createElement("div");
          newDiv.className = "image-hero-container";

          newDiv.style.backgroundImage = "url('" + thisSRC + "')";
          
          // If image is using height classes, take those for the containing div. These will override the fallback of height on page load.
          for (var j = 0; j < obCoverImgs[i].classList.length; j++) {
            if (obCoverImgs[i].classList[j].match(/^h-/)) {
              newDiv.className += " " + obCoverImgs[i].classList[j];
            }
          }
          newDiv.style.height = obCoverImgs[i].clientHeight + "px";


          newDiv.appendChild(obCoverImgs[i]);
          thisParent.insertBefore(newDiv, thisParent.firstChild);

        }
      }
    }
};
document.addEventListener("DOMContentLoaded", function (evt) {
    var SDTable = document.getElementsByClassName('solodev-table');
    for (var i = 0; i < SDTable.length; i++) {
        var tableHeadings = SDTable[i].getElementsByTagName('th');
        var tableRows = SDTable[i].querySelectorAll('tbody tr');
        var tableCells = SDTable[i].querySelectorAll('tbody tr td');
        var cellsPerRow = tableCells.length / tableRows.length;




        // Dont allow user to have different number of headings and rows 
        function errorMsg() {
            if (cellsPerRow != tableHeadings.length) {

                var errorDiv = SDTable[i].createElement('div');
                errorDiv.className = "bg-warning text-white";
                errorDiv.innerHTML =
                    "To use our responsive table, please create a table with equal cells per row and headings";
                sdTable[0].appendChild(errorDiv);
            }
        }


        function removeHeadings() {
            for (var i = 0; i < tableHeadings.length; i++) {
                tableHeadings[i].className += " d-none d-md-table-cell";
            }
        }


        function removeNonFirsts() {
            for (var i = 0; i < tableCells.length; i++) {
                // Hide all cells aside from first in each row 
                if (i % cellsPerRow != 0) {
                    tableCells[i].className += " d-none d-md-table-cell";
                }
            }
        }

        function propogateFirsts() {
            for (var i = 0; i < tableRows.length; i++) {
                var cellsInRow = tableRows[i].querySelectorAll('td');
                //cellsInRow[0].innerHTML += cellsInRow[];
                for (var x = 0; x < cellsInRow.length; x++) {
                    if (x != 0) {
                        cellsInRow[0].innerHTML += "<p class='d-block mt-2 d-md-none'>" + tableHeadings[x].innerHTML +
                            ": " + cellsInRow[x].innerHTML + "</p>"
                    } else {
                        var savedHTML = cellsInRow[0].innerHTML;
                        cellsInRow[0].innerHTML = "<span class='d-none d-md-block'>" + savedHTML + "</span>"
                        cellsInRow[0].innerHTML += "<p class='d-block mt-2 d-md-none'><span class='font-weight-bold'>" +
                            tableHeadings[x].innerHTML + ":</span> " + savedHTML + "</p>";
                    }
                }
            }
        }
        errorMsg();
        removeHeadings();
        removeNonFirsts();
        propogateFirsts();
    }
});
  
