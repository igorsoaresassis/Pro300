function atividade(){

	this.url = 'classes/Atividade.class.php?acao=listagemAtividade';

	this.listarAtividades = function(tbody){
		
		tbody.empty();
		
		$.ajax({
			url : this.url
		}).done(function(data){
		
				$.each(data, function (key, val){

					var codAtividade = val.cod_atividade;
					
					tr = $("<tr id='" + val.cod_atividade + "'/>");
		
					tr.append($("<td/>").text(val.desc_atividade));
					tr.append($("<td/>").append("<a href='gestaoGrupos.php?codAtividade=" + codAtividade + "' class='btn btn-primary btn-xs' title='Visualizar grupos da atividade'><i class='fa fa-folder'></i> Ver grupos </a>"
											+	"<a href='editarCadastroAtividade.php?codAtividade=" + codAtividade + "' class='btn btn-success btn-xs' title='Editar grupos da atividade'><i class='fa fa-pencil'></i> Editar </a>"
											+   "<a href='lancamentoNota.php?codAtividade=" + codAtividade + "' class='btn btn-info btn-xs' title='Lançar notas dos alunos' title='Lançar notas dos alunos'><i class='fa fa-pencil-square-o'></i> Lançar Notas</a>"
											+   "<a onclick='EnviarEmails("+codAtividade+")' class='btn btn-warning btn-xs' title='Enviar E-mail para os alunos informando que a avaliação de ajudantes e ajudados está disponível'><i class='fa fa-envelope-square'></i> Enviar E-mail</button>"
											+   "<a class='btn btn-danger btn-xs' title='Encerra e fechar a atividade' id='btnEncerrarAtividade'><i class='fa fa-times'></i> Encerrar Atividade </a>"
											+   "<a href='relatorioAtividades.php?CodAtividade="+ codAtividade +"' class='btn btn-dark btn-xs' title='Gerar relatório da atividade'><i class='fa fa-file-pdf-o'></i> Relatório</a>"
					
					));
					
					tbody.append(tr);
				});
		});

	}

}

function EnviarEmails(codAtividade)
{
	var dialog = bootbox.dialog({
		closeButton: false,
		message: '<div class="text-center"><i class="fa 2x fa-spin fa-spinner"></i> Enviando...</div>'
	});

	$.post("classes/Atividade.class.php?acao=enviarEmails", { codAtividade: codAtividade})
		.done(function(result){
			console.log(result);
			dialog.modal('hide');

			bootbox.alert({
				message: '<div class="text-center">'+result.msg+'</div>'
			});
		})
		.error(function(result) {
			console.log(result);
			dialog.modal('hide');

			bootbox.alert({
				message: '<div class="text-center">'+result.msg+'</div>'
			});
		});
}
