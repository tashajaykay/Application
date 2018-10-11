<h2><?= $title; ?></h2>

<?php echo validation_errors(); ?>

<?php echo form_open('posts/update'); ?>
  <input type="hidden" name="id" value="<? echo $post['id']; ?>">
  <div class="form-group">
    <label>Title</label>
    <input type="text" class="form-control" name="title" placeholder="Add title" value="<?php echo $post['title']; ?>">
  </div>
  <div class="form-group">
    <label>Post</label>
    <textarea id='editor1' class="form-control"  name="body" placeholder="Add post"><?php echo $post['body']; ?></textarea>
  </div>
  </div>
  <div class="form-group">
    <lable>Categoty</lable>
    <select name="category_id" class="form-control">
      <?php foreach($categories as $category): ?>
        <option value="<?php echo $category['id']; ?>"><?php echo $category['name']; ?></option>

      <?php endforeach; ?> 
    </select>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
