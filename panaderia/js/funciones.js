$(function(){
	var current_li;

	function setImg(src, id){
		$("#main").attr("src", src);
		var path = "text/"+id+".txt";
		$.get(path,function(data){
			$("#descripcion p").html(data);
		
		});

	}

	$("#portfolio img").click(function(){
		var src = $(this).attr("src");
		var id = $(this).attr("id");
		current_li = $(this).parent();
		setImg(src, id)
		$("#frame").fadeIn();
		$("#overlay").fadeIn();
	});

	$("#overlay").click(function(){
		$(this).fadeOut();
		$("#frame").fadeOut();
	});

	$("#right").click(function(){

		if (current_li.is(":last-child")) {
			var next = $("#portfolio li").first();
		} else{
			var next = current_li.next();	
		}
		
		var next_src = next.children("img").attr("src");
		var id = next.children("img").attr("id");

		$("#main").attr("src", next_src);
		setImg(next_src, id);
		current_li = next;
	});
	
	$("#left").click(function(){

		if (current_li.is(":first-child")) {
			var prev = $("#portfolio li").last();
		} else{
			var prev = current_li.prev();
		}

		var prev_src = prev.children("img").attr("src");
		var id = prev.children("img").attr("id");

		//$("#main").attr("src", prev_src);
		setImg(prev_src, id);
		current_li = prev;
	});

	$("#right ,#left").mouseover(function(){
		$(this).css("opacity", "0.75");
	})
	$("#right ,#left").mouseleave(function(){
		$(this).css("opacity", "0.5");
	})

});