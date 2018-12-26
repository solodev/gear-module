# photos-module

## Prerequisites
<ul>
	<li><a target="_blank" href="https://getbootstrap.com/">Boostrap4</a></li>
</ul>

## Step 1: Add the Form
 - gear-form.tpl

Create a calendar for the Gear Gallery and upload the following form. This module will use category template for the details, so please follow our tutorial on doing that here! ADD LINK!

```
<link href="/core/fileparse.php/15/urlt/cms-style.css" rel="stylesheet">

<script>
$(function() {
  $("#resource_type").change(function() {
    if ($(this).val() == "Document") {
      $('#documentOptions').show();
      $('#linkOptions').hide();
    } else if ($(this).val() == "Link") {
      $('#documentOptions').hide();
      $('#linkOptions').show();
    } else {
      $('#documentOptions').hide();
      $('#linkOptions').hide();
    }
  });
  $("#resource_type").trigger("change");

});
</script>
  
<div class="panel-group">
	<div class="panel panel-default">
		<div class="panel-heading">
			<h4 class="panel-title">
				<a data-toggle="collapse" href="#collapseStatus" aria-expanded="true">Resource Status<span class="toggle" aria-hidden="true"></span></a>
			</h4>
		</div>
		<div id="collapseStatus" class="panel-collapse collapse in">
			<div class="panel-body">

				<div class="row">
					<div class="col-md-3">
						<h2><label class="label-control" for="post_status">Post Status</label></h2>
						<select class="form-control" type="text" name="post_status">
							<option value="Draft">Draft</option>
							<option value="Published">Published</option>
						</select>
					</div>
				</div>
			
			</div>
		</div>
	</div>
</div>

<div class="panel-group">
	<div class="panel panel-default">
		<div class="panel-heading">
			<h4 class="panel-title">
				<a data-toggle="collapse" href="#collapseType" aria-expanded="true">Resource Type<span class="toggle" aria-hidden="true"></span></a>
			</h4>
		</div>
		<div id="collapseContent" class="panel-collapse collapse in">
			<div class="panel-body">			

				<div class="row">
					<div class="col-md-6">
						<h2><label class="label-control" for="resource_type">Resource Type</label></h2>
						<p class="subText">(Required) The main content section for the cow.</p>
						<select class="form-control" name="resource_type" id="resource_type">
						  <option value="Document">Document Download (i.e. PDF)</option>
						  <option value="Link">Link</option>
						</select>
					</div>
				</div>
                                            
				<div class="row" class="documentOptions" id="documentOptions">
					<div class="col-md-6">
						<h2><label class="label-control" for="resource_file">Resource File</label></h2>
						<input class="form-control" type="file" name="resource_file" id="resource_file" />
					</div>
				</div>

				<div class="row" class="linkOptions" id="linkOptions">
					<div class="col-md-6">
						<h2><label class="label-control" for="link_url">Link URL</label></h2>
                        <p class="subText">Include the full link including the "http://" or "https://" protocol.</p>
						<input class="form-control" type="text" name="link_url" id="link_url" />
					</div>
				</div>					

			</div>
		</div>
	</div>
</div>


```

## Step 2: Add the Repeater
 - gear-repeater.tpl

Add the following repeater shortcode. 

```
<div class="row pt-3">
  <div class="text-center col-md-8 mx-auto">
    <h2 class="text-uppercase">Ready To Gear Up?</h2>
    <p>Made for space, designed on earth. Show your LunarXP pride and "gear up" like a pro!</p>
  </div>
</div>
  
<div class="row py-5">
  [category_list id="7"]
    <div class="col-md-4 mt-4 mt-sm-0">
      <div class="bg-primary bg-hover-primary-dark text-center h-100">
        <a href="{{name}}/">
          <div class="h-100 w-100">
            <img class="w-100 h-250p cover" alt="{{title}} Gear Image" src="[get_asset_file_url id={{category_image}}]">
            <div class="p-3 text-white">
              <h3 class="h5 text-uppercase m-0">{{title}}</h3>
              [is_set value="{{description}}"]
              <p>{{description}}</p>
              [/is_set]
            </div>
          </div>
        </a>
      </div>
    </div>
  [/category_list]
</div>
```

## Step 3: Add the Detail Template
- gear-detail.tpl

This will be in the category.stml page.
```
<section class="py-5">
  <h2 class="h3 text-uppercase">Choose Your Option</h2>
  <p>[category_description]</p>
  <table class="table table-striped table-bordered solodev-table mt-4">
    <thead>
      <tr>
        <th>Gear Name</th>
        <th>Gear Source</th>
        <th>Gear Drop Date</th>
      </tr>
    </thead>
    <tbody>
    [repeater id='9' pages="22" order="start_time desc" display_type="news" where="post_status='Published'"]
      [cond type="is" subject="{{resource_type}}" value="Document"]
      <tr>
        <td><a href="[get_asset_file_url id={{resource_file}}]" target="_blank">{{event_title}}</a></td>
        <td>{{resource_type}}</td>
        <td>[print_date format="F d, Y" timestamp="{{start_time}}"]</td>
      </tr>
    [/cond]
    [cond type="is" subject="{{resource_type}}" value="Link"]
      <tr>
        <td><a href="{{link_url}}" target="_blank">{{event_title}}</a></td>
        <td>{{resource_type}}</td>
        <td>[print_date format="F d, Y" timestamp="{{start_time}}"]</td>
      </tr>
      [/cond]
    [/repeater]
    </tbody>
  </table>
</section>

```

## Step 4: Add the SCSS/SCC
  - /_/scss/gear.scss

```
.bg-hover-primary-dark {
    &:hover {
        background-color: #a60b74!important;
    }
}

.h-250p {
    height: 250px;
}

.cover {
    object-fit: cover;
}


```

## Step 5: Add the JS
  - /_/js/gear.js
  
```
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
  

```
