<?php
$usuario = "jj";
$password = "12";
try {
    $pdo = new PDO('mysql:host=localhost;dbname=spot_music', $usuario, $contraseña);
    $mbd = null;
} catch (PDOException $e) {
    print "¡Error!: " . $e->getMessage() . "<br/>";
    die();
}
?>