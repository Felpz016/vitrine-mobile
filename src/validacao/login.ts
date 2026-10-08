// Regras de validação do formulário de login.
// Ficam num arquivo separado da tela: a tela cuida do visual, e este arquivo
// descreve como um dado correto se parece (validação declarativa, com o Yup).
import * as yup from "yup";

export const esquemaLogin = yup.object({
  // Cada chave deste objeto é o nome de um campo do formulário.
  // O mesmo nome precisa aparecer no `name` do CampoTexto da tela.
  usuario: yup
    .string() // TextInput sempre entrega texto
    .required("Informe o usuário") // vazio → esta mensagem
    // ^ e $ amarram do começo ao fim; \S+ = um ou mais caracteres que não são espaço.
    // Ou seja: nenhum espaço em lugar nenhum do texto.
    .matches(/^\S+$/, "O usuário não tem espaços")
    .min(3, "O usuário tem ao menos 3 caracteres"), // em texto, min conta caracteres
  senha: yup
    .string()
    .required("Informe a senha")
    .min(6, "A senha tem ao menos 6 caracteres"),
});
// As regras são conferidas na ordem em que aparecem, e cada uma traz a
// própria mensagem, escrita para dizer O QUE FAZER, e não só o que falhou.

// O tipo TypeScript nasce do esquema: { usuario: string; senha: string }.
// Assim o tipo e as regras nunca desalinham, porque saem do mesmo lugar.
// O TypeScript confere o código antes de rodar; o Yup confere o que a pessoa
// digitou, com o app rodando. Um não substitui o outro.
export type DadosLogin = yup.InferType<typeof esquemaLogin>;
