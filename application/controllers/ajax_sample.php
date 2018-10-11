<?php
class Ajax_sample extends CI_Controller {
 
    function __construct(){
        parent::__construct();
        $this->load->helper('url');
    }
 
    /*
     * show list as a table, get data from "test_model"
     * */
    function get_list_view(){
 
        $this->load->model('test_model');
 
        $data = array();
 
        $data['title'] = 'Ajax';
        $data['list'] = $this->test_model->get_data();
 
       
            // $this->load->view('templates/header');
            // $this->load->view('users/sample_table', $data);
            // $this->load->view('templates/footer');
        echo json_encode($data);
    }
 
    function index(){
            $this->load->view('pages/test_page', $data);
    }
 
}