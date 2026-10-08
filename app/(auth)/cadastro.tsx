// Tela de cadastro: o mesmo esqueleto do login (useForm + CampoTexto +
// botão com isSubmitting), com quatro campos e uma regra entre campos.
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CampoTexto } from "@/components/CampoTexto";
import { DadosCadastro, esquemaCadastro } from "@/validacao/cadastro";

export default function CadastroScreen() {
  const router = useRouter();

  // Igual ao login, mais o reset, que devolve o formulário aos defaultValues.
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DadosCadastro>({
    // Todos os campos declarados, para nenhum começar "não controlado".
    defaultValues: { nome: "", email: "", senha: "", confirmacao: "" },
    resolver: yupResolver(esquemaCadastro),
    mode: "onBlur", // primeiro aviso ao sair do campo
    reValidateMode: "onChange", // depois do erro, confere a cada tecla
  });

  async function aoEnviar(dados: DadosCadastro) {
    // Simulação: a API de exemplo (DummyJSON) não tem cadastro de verdade.
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Este e-mail faz o papel de "já cadastrado no servidor".
    if (dados.email === "emily.johnson@x.dummyjson.com") {
      // Aqui o erro do servidor PERTENCE A UM CAMPO: setError('email')
      // põe a mensagem embaixo do e-mail, e não num quadro geral (root).
      // No cadastro, dizer que o e-mail existe é necessário (a pessoa deve
      // entrar em vez de se cadastrar). No login, seria um presente para quem ataca.
      setError("email", { message: "Este e-mail já tem cadastro." });
      return;
    }

    console.log("cadastrado:", dados.nome, dados.email);
    reset(); // limpa o formulário depois do sucesso
    router.replace("/login"); // leva a pessoa para entrar, sem empilhar
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white dark:bg-fundo"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerClassName="flex-grow justify-center p-6"
        keyboardShouldPersistTaps="handled" // botão responde no 1º toque com teclado aberto
      >
        <Text className="text-sky-700 dark:text-destaque text-3xl font-bold mb-1">
          Criar conta
        </Text>
        <Text className="text-slate-500 dark:text-suave text-sm mb-8">
          Leva menos de um minuto.
        </Text>

        {/* Cada name é igual a uma chave do esquemaCadastro */}
        <CampoTexto
          control={control}
          name="nome"
          rotulo="Nome"
          erro={errors.nome?.message}
          placeholder="como devemos chamar você"
          autoComplete="name"
        />
        <CampoTexto
          control={control}
          name="email"
          rotulo="E-mail"
          erro={errors.email?.message}
          placeholder="voce@exemplo.com"
          keyboardType="email-address" // teclado com @ e ponto à mão
          autoCapitalize="none"
          autoComplete="email"
        />
        <CampoTexto
          control={control}
          name="senha"
          rotulo="Senha"
          erro={errors.senha?.message}
          placeholder="mínimo de 6 caracteres"
          secureTextEntry
        />
        <CampoTexto
          control={control}
          name="confirmacao"
          rotulo="Confirme a senha"
          erro={errors.confirmacao?.message}
          placeholder="a mesma senha de cima"
          secureTextEntry
        />

        {/* Mesmo botão do login: valida antes de enviar e trava durante o envio */}
        <Pressable
          onPress={handleSubmit(aoEnviar)}
          disabled={isSubmitting}
          accessibilityRole="button"
          accessibilityState={{ disabled: isSubmitting }}
          className={`rounded-full py-4 items-center mt-2 ${
            isSubmitting
              ? "bg-slate-200 dark:bg-superficie"
              : "bg-sky-600 dark:bg-destaque active:opacity-80"
          }`}
        >
          <Text
            className={`font-bold ${
              isSubmitting
                ? "text-slate-500 dark:text-suave"
                : "text-white dark:text-fundo"
            }`}
          >
            {isSubmitting ? "Criando conta..." : "Criar conta"}
          </Text>
        </Pressable>

        {/* Volta ao login; replace evita acumular telas no botão voltar */}
        <Link
          href="/login"
          replace
          className="text-sky-700 dark:text-destaque text-center mt-6"
        >
          Já tenho conta
        </Link>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
