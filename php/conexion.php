<?php
$usuario = "root";
$password = "";
try {
    $pdo = new PDO('mysql:host=localhost;dbname=prueba', $usuario, $contraseña);
    $mbd = null;
} catch (PDOException $e) {
    print "¡Error!: " . $e->getMessage() . "<br/>";
    die();
}
?>