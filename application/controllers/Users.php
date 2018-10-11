<?php
	class Users extends CI_Controller{
		// user registration
		public function register(){
			$data['title'] = 'Sign Up';
            // validations - also callback check email exits is checking to see if the same email exists
			$this->form_validation->set_rules('name', 'Name', 'required');
			$this->form_validation->set_rules('email', 'Email', 'required|callback_check_email_exists');
			$this->form_validation->set_rules('password', 'Password', 'required');
			$this->form_validation->set_rules('password2', 'Confirm Password', 'matches[password]');

			if($this->form_validation->run() === FALSE){
				$this->load->view('templates/header');
				$this->load->view('users/register', $data);
				$this->load->view('templates/footer');
			} else {
			    // Encrypting password
				$enc_password = md5($this->input->post('password'));
				$this->user_model->register($enc_password);
				// Success message
				$this->session->set_flashdata('user_registered', 'Wooo! You are registered and can log in');
				redirect('users/login');			
		}

	}


		// Log in user
		public function login(){
			$data['title'] = 'Sign In';
			$this->form_validation->set_rules('email', 'email', 'required');
			$this->form_validation->set_rules('password', 'Password', 'required');
			if($this->form_validation->run() === FALSE){
				$this->load->view('templates/header');
				$this->load->view('users/login', $data);
				$this->load->view('templates/footer');
			} else {
				
				// Get email from database
				$email = $this->input->post('email');
				// Get and encrypt the password
				$password = md5($this->input->post('password'));
				// Login user
				$user_id = $this->user_model->login($email, $password);
				if($user_id){
					// Create session
					$user_data = array(
						'user_id' => $user_id,
						'email' => $email,
						'logged_in' => true
					);
					$this->session->set_userdata($user_data);
					// Success message
					$this->session->set_flashdata('user_loggedin', 'Wooo!1You are now logged in');
					redirect('posts');
				} else {
					//error  message
					$this->session->set_flashdata('login_failed', 'Aww..Login is invalid, try again');
					redirect('users/login');
				}		
			}
		}

		// Log out
		public function logout(){
			// Unset user data
			$this->session->unset_userdata('logged_in');
			$this->session->unset_userdata('user_id');
			$this->session->unset_userdata('email');
			// message
			$this->session->set_flashdata('user_loggedout', 'logged out');
			redirect('users/login');
		}

	// Check if email exists
		public function check_email_exists($email){
			$this->form_validation->set_message('check_email_exists', 'Aww sorry..email is taken. choose a different one');
			if($this->user_model->check_email_exists($email)){
				return true;
			} else {
				return false;
		}
	}
}