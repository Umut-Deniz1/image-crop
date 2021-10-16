var $uploadCrop;
var reader = new FileReader();
var type_ud;
let vm_download = document.querySelector(".btn-download");
var image_on_site = document.querySelector(".img_edit1").src;



var UD = (function () {

	function output(node) {
		var existing = $('#result .croppie-result');
		if (existing.length > 0) {
			existing[0].parentNode.replaceChild(node, existing[0]);
		}
		else {
			$('#result')[0].appendChild(node);
		}
	}

	function vm_Result(result) {
		var html;
		if (result.html) {
			html = result.html;
		}
		if (result.src) {
			html = '<img class="img_edit" src="' + result.src + '" />';
		}
		document.querySelector(".img_edit1").src = result.src;
		//document.querySelector(".snc").innerHTML = html
		
	}


	function Upload() {		

		function readFile(input) {
			if (input.files && input.files[0]) {
				reader.onload = function (e) {
					$('.upload-ud').addClass('ready');
					
					$uploadCrop.croppie('bind', {
						url: e.target.result
					}).then(function () {
						console.log('jQuery bind complete');
					});

				}

				reader.readAsDataURL(input.files[0]);
								
			}
			else {
				alert("Sorry - you're browser doesn't support the FileReader API");
			}
		}
		$('#upload').on('change', function () { readFile(this); });

		$uploadCrop = $('#upload-ud').croppie({
			viewport: { 
				width: 150, 
				height: 150, 
				type: "square"
			},
			boundary: { width: 300, height: 300 },
			showZoomer: true,
			enableResize: true,
			enableExif: true,
			enableOrientation: false,
			
			}
		);


		$('.upload-result').on('click', function (ev) {
			$uploadCrop.croppie('result', {
				type: 'blob'
			}).then(function (blob) {
				vm_Result({
					src: window.URL.createObjectURL(blob)
				});
				console.log(window.URL.createObjectURL(blob))
				//document.querySelector(".vm_popup_wrapper_ebulten_class").style.display = "none";
			});
		});

		vm_download.addEventListener("click", ()=>{
			$uploadCrop.croppie('result', {
				type: 'blob'
			}).then(function (blob) {
				let imagePath = window.URL.createObjectURL(blob)
				let fileName = getFileName(imagePath)
	
				saveAs(imagePath, fileName)
	
			});
			function getFileName(str){
				return str.substring(str.lastIndexOf("/")+1);
			}
		})
		
		$(".img_edit1").on("click", function (e) {
			document.querySelector(".vm_popup_wrapper_ebulten_class").style.display = "block";
			$('.upload-ud').addClass('ready');
			
			$uploadCrop.croppie('bind', {
				url: image_on_site
			})
		
		});
		
		

	}

	function Edit() {

		document.getElementById("vm_closecap_popup_svg_ebulten").addEventListener("click", function () {
			var el = document.getElementById("popup_wrapper_ebulten");
			el.style.display = "none"
		});
		
		document.querySelector(".vm-popup-overlay").addEventListener("click", function () {
			var el = document.getElementById("popup_wrapper_ebulten");
			el.style.display = "none"
		});
	}



	function init() {
		Upload();
		Edit();
	}

	return {
		init: init
	};
})();


// Full version of `log` that:
//  * Prevents errors on console methods when no console present.
//  * Exposes a global 'log' function that preserves line numbering and formatting.
(function () {
	var method;
	var noop = function () { };
	var methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});

	while (length--) {
		method = methods[length];

		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noop;
		}
	}


	if (Function.prototype.bind) {
		window.log = Function.prototype.bind.call(console.log, console);
	}
	else {
		window.log = function () {
			Function.prototype.apply.call(console.log, console, arguments);
		};
	}
})();

UD.init();

