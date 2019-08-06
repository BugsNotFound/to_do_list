

window.onload = function(){

	
	chrome.storage.sync.get('html', function(data){
		var containerHtml = data.html;
		$("#container").html(containerHtml);


		function save_data(){
			var containerHtml = $("#container").html();
			chrome.storage.sync.set({'html': containerHtml}, function(){
				//nothing		
			});
		}


		$("input[type='checkbox']").click(function(){
			if(this.checked){
				$('input[type="checkbox"]').attr("checked", "checked");
			}else{
				$('input[type="checkbox"]').removeAttr("checked");
			}

			save_data();
		});


		$("input[type='text']").on("keypress", function(e){
			if(e.which==13 && $(this).val().replace(/\s/g, '').length>0){
				$("ul").prepend("<li><span><i class='fa fa-trash'></i></span>" + " " + $(this).val() + "</li>");
				$(this).val("");
			}


			save_data();
		});


		$("ul").on("click", "span", function(e){
			e.stopPropagation();

			if($("input[type='checkbox'").prop("checked")==true && !($(this).parent().hasClass('completed'))){
				var self = this;
				swal("Are you sure you want to do this?", {
						buttons: {
							cancel: "Oh noez!",
							accept: "Aww yiss!",
						}
				})
				.then((value) => {
					if(value=='accept'){
						$(self).parent().fadeOut(400, function(){
							$(this).remove();
							save_data();
						});						
					}
				});				

				/*var conf = confirm("Are you sure you want to delete this Activity?");
				if(conf == true){
						$(this).parent().fadeOut(400, function(){
							$(this).remove();
							save_data();
						});
				}*/
			
			}else{
				$(this).parent().fadeOut(400, function(){
					$(this).remove();
					save_data();
				});
			}

		});

		$("ul").on("click", "li", function(){
			$(this).toggleClass("completed");
			save_data();
		});


		$(".fa-plus").click(function(){
			$("input[type='text']").fadeToggle(function(){
				save_data();
			});
		});



	});
}
