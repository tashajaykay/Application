<?php
	class Pages extends CI_Controller {
		
		public function __construct(){
			parent::__construct();
			// $this->load->model('login_model');
		}

		public function view($page = 'home'){
			if(!file_exists(APPPATH.'views/pages/'.$page.'.php')){
				show_404();
			}
			$data['title'] = ucfirst($page);
			$this->load->view('templates/header');
			$this->load->view('pages/'.$page, $data);
			$this->load->view('templates/footer');
		}

		// public function login() {
		// 	$email = $this->input->post('email');
		// 	$password = $this->input->post('password');

		// 	echo "Email is: " . $email . " Password: " . $password;
		// 	$exists = login_model->login($email, $password);


			
		// 	// Validate - use custom callback:
		// 	// https://codeigniter.com/user_guide/libraries/form_validation.html

		// 	// Callback should call model to check if users exists in db

		// 	// Validation passes or fails, return different views
		// }
	}