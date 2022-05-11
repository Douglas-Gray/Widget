function oneChkbox() {
    
	var chkgroup = document.getElementById('chkboxgroup').getElementsByTagName("input");
	var limit = 1;

	for (var i = 0; i < chkgroup.length; i++) {
		chkgroup[i].onclick = function() {
			var chkcount = 0;
				for (var i = 0; i < chkgroup.length; i++) {
				chkcount += (chkgroup[i].checked) ? 1 : 0;
			}
			if (chkcount > limit) {
				console.log("Maximum of " + limit + " checkbox.");
				alert("Maximum of " + limit + " checkbox.");
				this.checked = false;
			}
		}
	}
}