<div class="col-md-6 text-left">
 <button onclick="getElementById('demo').innerHTML=Date()">Show Date and Time</button>
</div>
<p id="demo"></p>
</script>
<?php echo form_open('users/login'); ?>
	<div class="row">
		<div class="col-md-4 col-md-offset-4">
			<h1 class="text-center"><?php echo $title; ?></h1>
			<div class="form-group">
				<input type="text" name="email" class="form-control" placeholder="Enter Email" required autofocus>
			</div>
			<div class="form-group">
				<input type="password" name="password" class="form-control" placeholder="Enter Password" required autofocus>
			</div>
			<button type="submit" class="btn btn-primary btn-block">Login</button>
		</div>
	</div>
<?php echo form_close(); ?>



<div class="row">
<div class="col-md-6 text-left">
   <h1>Technology news-</h1>

   <iframe src="http://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Ftechnologyreview&width=600&colorscheme=light&show_faces=true&border_color&stream=true&header=true&height=435"
   scrolling="yes" frameborder="0" style="border:none; overflow:hidden; width:600px; height:430px; background: white; float:left; " allowTransparency="true">
   </iframe>

</div>
</div>

    

