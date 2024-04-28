Funcionalidade: Criar usuário;
Contexto: Acessar tela de cadastro de usuário
Dado que acesso a página inicial do site
E clico em Novo

Cenário: Registrar novo usuário sem campo Nome preenchido
E informo e-mail válido
Quando clico no botao Salvar
Então o processo é bloqueado com a mensagem "O campo nome é obrigatório"

Cenário: Registrar novo usuário sem campo E-mail preenchido
E informo nome <= 100 caracteres
Quando clico no botao Salvar
Então o processo é bloqueado com a mensagem "O campo nome é obrigatório"

Cenário: Registrar novo usuário com nome > 100 caracteres
E preencho campo Nome com > 100 caracteres
E preencho email válido
Então o processo é bloqueado com a mensagem "Informe no máximo 100 caracteres para o nome"

Cenário: Registrar novo usuário com email > 60 caracteres
E preencho campo Nome com <= 100 caracteres
E preencho email com > 60 caracteres
Então o processo é bloqueado com a mensagem "Informe no máximo 60 caracteres para o e-mail"

Cenário: Registrar novo usuário com credenciais válidas
E informo um nome <= 100 caracteres,
E informo um e-mail válido,
Quando clico no botão "Salvar",
Então tenho cadastro de usuário salvo com a mensagem "Usuário salvo com sucesso"

Cenário: Cadastrar usuário com e-mail já registrado
E informo nome <= 100 caracteres
E informo e-mail já registrado na base
Quando clico em Salvar
Então o processo é bloqueado com alerta informando e-mail ja utilizado


Funcionalidade: Buscar usuario
Cenário: Buscar usuário pelo nome
Dado que estou na página inicial do site,
Quando insiro o nome no campo
Então o site direciona para o cadastro do usuario,
Mas senao for localizado o site emite alerta de "Usuário não encontrado"

Cenário: Buscar usuário pelo email
Dado que estou na página inicial do site,
Quando insiro o nome no campo
Então o site direciona para o cadastro do usuario,
Mas senao for localizado o site emite alerta de "Usuário não encontrado"





