<?php echo validation_errors(); ?>

<?php echo form_open('users/register'); ?>
	<div class="row">
		<div class="col-md-4 col-md-offset-4">
			<h1 class="text-center"><?= $title; ?></h1>
			<div class="form-group">
				<label>Name</label>
				<input type="text" class="form-control" name="name" placeholder="Name">
			</div>
			
			<div class="form-group">
				<label>Email</label>
				<input type="email" class="form-control" name="email" placeholder="Email">
			</div>
		
			
			<div class="form-group">
				<label>Password</label>
				<input type="password" class="form-control" name="password" placeholder="Password">
			</div>

			<div class="form-group">
				<label>Confirm Password</label>
				<input type="password" class="form-control" name="password2" placeholder="Confirm Password">
			</div>

			<button type="submit" class="btn btn-primary btn-block">Submit</button>
		</div>
	</div>


<?php echo form_close(); ?>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script>
$(document).ready(function(){
    $("input").keyup(function(){
        txt = $("input").val();
        $("span").load("gethint.php", {suggest: txt});
    });
});
</script>
</head>
<body>

<p>Start typing a name in the input field below:</p>
First name:

<input type="text">
<p>Suggestions: <span></span></p>
