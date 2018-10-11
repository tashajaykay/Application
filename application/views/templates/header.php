<html>
     <head>
     	<title>My WebApp</title>
     	<link rel="stylesheet" href="https://bootswatch.com/4/solar/bootstrap.min.css">
      <link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/style.css">
      <script src="http://cdn.ckeditor.com/4.7.3/standard/ckeditor.js"></script>

      <!-- Hotjar Tracking Code for http://localhost/webapp/users/login -->
<script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:719705,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>
     </head>
     <body>
     	<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="<?php echo base_url(); ?>">Webapp</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation" style="">
    <span class="navbar-toggler-icon"></span>
  </button>
        </div>
        <div class="collapse navbar-collapse" id="navbarColor01">
          <ul class="navbar-nav mr-auto">
          	
            <?php if(!$this->session->userdata('logged_in')) : ?>
            <li class="nav-item"><a class="nav-link" href="<?php echo base_url(); ?>users/login">Login</a>
            </li>
            <li class="nav-item"><a class="nav-link" href="<?php echo base_url(); ?>users/register">Register</a>
            </li>  
            <li class="nav-item"><a class="nav-link" href="<?php echo base_url(); ?>test_page">Ajax</a>
            </li>           
            <?php endif; ?>
            <?php if($this->session->userdata('logged_in')) : ?>
            <li class="nav-item"><a class="nav-link" href="<?php echo base_url(); ?>posts">Blog</a></li>
          </ul>
           <ul class="nav navbar-nav navbar-right">
            <li class="nav-item"><a class="nav-link" href="<?php echo base_url(); ?>posts/create">Create new post</a></li>
           
           <li class="nav-item"><a class="nav-link" href="<?php echo base_url(); ?>users/logout">Logout</a>
            </li>
            </ul>
            <?php endif; ?>
        </div>
       </div>
      </nav>

     

      <div class="container">
        
      <?php if($this->session->flashdata('user_registered')): ?>
        <?php echo '<p class="alert alert-success">'.$this->session->flashdata('user_registered').'</p>'; ?>
      <?php endif; ?>

      <?php if($this->session->flashdata('post_created')): ?>
        <?php echo '<p class="alert alert-success">'.$this->session->flashdata('post_created').'</p>'; ?>
      <?php endif; ?>

      <?php if($this->session->flashdata('post_updated')): ?>
        <?php echo '<p class="alert alert-success">'.$this->session->flashdata('post_updated').'</p>'; ?>
      <?php endif; ?>


      <?php if($this->session->flashdata('post_deleted')): ?>
        <?php echo '<p class="alert alert-success">'.$this->session->flashdata('post_deleted').'</p>'; ?>
      <?php endif; ?>

      <?php if($this->session->flashdata('login_failed')): ?>
        <?php echo '<p class="alert alert-danger">'.$this->session->flashdata('login_failed').'</p>'; ?>
      <?php endif; ?>

      <?php if($this->session->flashdata('Yay_loggedin')): ?>
        <?php echo '<p class="alert alert-success">'.$this->session->flashdata('Yay_loggedin').'</p>'; ?>
      <?php endif; ?>

      <?php if($this->session->flashdata('user_loggedout')): ?>
        <?php echo '<p class="alert alert-success">'.$this->session->flashdata('user_loggedout').'</p>'; ?>
      <?php endif; ?>

     

      




     


     		