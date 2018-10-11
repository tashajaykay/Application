<?php
class Login_model extends CI_Model{
	public function __construct(){
		$this->load->database();
	}

	public function login($email, $password) {
		$query = $this->db->get_where('users', array('email' => $email, 'password' => $password), 1, 0);

		return $query->num_rows() > 0;
	}

