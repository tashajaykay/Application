<html>
<head>
<title>Ajax </title> <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
 <script type="text/javascript">
 var controller = 'ajax_sample';
 var base_url = '<?php echo site_url(); ?>';

function load_data_ajax(type){
 $.ajax({

 'url' : base_url + '/' + controller + '/get_list_view',
 'type' : 'POST', 
 'data' : {'type' : type},
 'success' : function(data){ 

var container = $('#container'); //jquery selector (get element by id)
 if(data){
container.html(data);


 }
 }
 });
 }
 </script>

 </head>
 <body>
 <button onclick="load_data_ajax(1)">Load list (type 1)</button>


 <div id="container">
</div>
</body>
</html>