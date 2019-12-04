module.exports.iniciaChat = function(application, req, res){
    var dadosForm = req.body;

    req.assert('apelido','Nome ou apelido é Obrigatório').notEmpty();
    req.assert('apelido','Nome ou apelido deve ter de 3 a 15 caracteres').len(3,15);

   var erros = req.validationErrors();

   if(erros){
    res.render("index", {validacao: erros});
    return ;
    }

    application.get('io').emit(
        'msgClient',
        {apelido: dadosForm.apelido, mensagem : 'conectou no chat!' }    
    );

    res.render('chat', {dadosForm: dadosForm});
}