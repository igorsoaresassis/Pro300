<html>
<body>
<?php
    
    $date = DateTime::createFromFormat('d/m/Y','');
    echo print_r(DateTime::getLastErrors());
    echo "<br/>";
    $errors = DateTime::getLastErrors();
    if (!empty($errors['error_count'])) {
        echo "erro";
    }
    
    //$date = strtotime('06/07/2017');
    //echo $date->format('d/m/Y');
    
    echo "<br/>";
    
    //$strdate = $date->format('d/m/Y');
    //$strdate = date('d/m/Y', $date); 
    //echo $strdate;

?>
</body>
</html>