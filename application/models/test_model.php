<?php

 

class Test_model extends CI_Model {
 
    function __construct(){
        parent::__construct();
    }
 
    function get_data(){
 
        $type = $this->input->post('type');
 
        if($type != 1){
            return array();
        }
 
        return array(
            array(
                'name' => 'Natasha',
                'email' => 'tashakandengwa@gmail.com',
                'dob' => '12/09/1994'
            ),
           
        );
    }
 
}