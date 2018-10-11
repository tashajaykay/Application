<h2><?= $title ?><h2>
	<p>This page is for user log in and registration</p>

<?php echo validation_errors(); ?>

<?php echo form_open('pages/login'); ?>
  <div class="form-group">
    <label>Email</label>
    <input type="text" class="form-control" name="email" placeholder="Email">
  </div>
  <div class="form-group">
    <label>Password</label>
    <textarea class="form-control"  name="password" placeholder="Password"></textarea>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>