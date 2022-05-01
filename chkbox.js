function oneChkbox() {
	var checkboxgroup = document.getElementById('chkboxgroup').getElementsByTagName("input");
	var limit = 1;
	for (var i = 0; i < checkboxgroup.length; i++) {
		checkboxgroup[i].onclick = function() {
			var checkedcount = 0;
				for (var i = 0; i < checkboxgroup.length; i++) {
				checkedcount += (checkboxgroup[i].checked) ? 1 : 0;
			}
			if (checkedcount > limit) {
				console.log("You can select maximum of " + limit + " checkbox.");
				alert("You can select maximum of " + limit + " checkbox.");
				this.checked = false;
			}
		}
	}
}