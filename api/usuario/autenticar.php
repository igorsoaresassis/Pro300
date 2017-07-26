<?php
    require_once '../log/logentries.php';
    require_once '../util/Config.php';
    require_once '../util/JsonUtil.php';
    require_once '../util/SegurancaUtil.php';

    $postdata = file_get_contents('php://input');
    $request = json_decode($postdata, true);

    $log->debug(print_r($request, true));

    try {
        $conn = new PDO("mysql:host={$DB_HOST};dbname={$DB_NAME}", $DB_USERNAME, $DB_PASSWORD);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn->exec("set names utf8");
        
        $stmt = $conn->prepare("
            SELECT  u.id, 
                    u.email, 
                    u.senha, 
                    u.ra, 
                    u.nome, 
                    u.telefone, 
                    u.perfil_id,
                    p.perfil
             FROM  usuario u
            INNER JOIN perfil p ON p.id = u.perfil_id
            WHERE email = :email ");
               
        $stmt->bindParam(':email', $request['email']);
        $stmt->execute();
        
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if(empty($usuario))
            respostaJson("Usuário com e-mail {$request['email']} não encontrado.", null, false);
            
        $senha = sha1($request['senha']);
        
        $log->debug("Senha do banco: {$usuario['senha']}");
        $log->debug("Senha informada: {$senha}");
            
        if($senha != $usuario['senha'])
            respostaJson('Senha inválida.', null, false);
        
        setUsuario($usuario);
        
        respostaJson('Autenticação realizada com sucesso.', $usuario);
    } catch(PDOException $e) {
        $log->Error($e);
        respostaErroJson($e);
    }
?>