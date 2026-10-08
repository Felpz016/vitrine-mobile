// Campo de texto reutilizável: rótulo + campo + mensagem de erro, sempre juntos.
// Serve a qualquer formulário do app (login, cadastro e os próximos).
import { Text, TextInput, TextInputProps, View } from "react-native";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { useColorScheme } from "nativewind";
import { CORES_NAVEGACAO } from "@/constants/tema";

// <T extends FieldValues> é um GENÉRICO: T é o tipo do formulário que está
// usando o campo (DadosLogin no login, DadosCadastro no cadastro).
// `extends TextInputProps` faz o campo aceitar tudo que um TextInput aceita
// (placeholder, secureTextEntry, keyboardType...).
interface CampoTextoProps<T extends FieldValues> extends TextInputProps {
  control: Control<T>; // a "ligação" com o useForm da tela
  name: Path<T>; // só aceita nomes que existem em T: erro de digitação vira erro de compilação
  rotulo: string; // texto visível acima do campo (placeholder não é rótulo)
  erro?: string; // mensagem vinda do Yup ou do setError; opcional
}

export function CampoTexto<T extends FieldValues>({
  control,
  name,
  rotulo,
  erro,
  ...resto // "resto": junta as outras props (placeholder etc.) para repassar ao TextInput
}: CampoTextoProps<T>) {
  // placeholderTextColor recebe cor como VALOR, não como className,
  // por isso a cor vem da tabela CORES_NAVEGACAO, escolhida pelo tema.
  const { colorScheme } = useColorScheme();
  const cores = CORES_NAVEGACAO[colorScheme === "dark" ? "dark" : "light"];

  return (
    <View className="mb-4">
      {/* Rótulo sempre visível: o placeholder some quando a pessoa digita */}
      <Text className="text-slate-600 dark:text-suave text-xs mb-1.5">
        {rotulo}
      </Text>

      {/* Controller é a ponte entre o React Hook Form e o TextInput.
          Na web usaria `register`, mas o TextInput não é HTML.
          Ele entrega value, onChange e onBlur para o campo. */}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            // É onChangeText, e NÃO onChange: com onChange o campo não digita.
            onChangeText={onChange}
            // Avisa que a pessoa saiu do campo: é aí que valida (mode: 'onBlur').
            onBlur={onBlur}
            placeholderTextColor={cores.inativo}
            // Acessibilidade: o leitor de tela lê o nome do campo e, se houver, o erro.
            accessibilityLabel={rotulo}
            accessibilityHint={erro}
            // A borda existe sempre e só troca de cor: transparente sem erro,
            // vermelha (claro) ou âmbar (escuro) com erro. Assim o campo
            // não muda de tamanho quando o erro aparece.
            className={`bg-slate-100 dark:bg-superficie text-slate-900 dark:text-white
                        rounded-lg px-4 py-3.5 border ${
                          erro
                            ? "border-red-600 dark:border-alerta"
                            : "border-transparent"
                        }`}
            {...resto} // repassa placeholder, secureTextEntry, keyboardType etc.
          />
        )}
      />

      {/* A mensagem de erro fica logo abaixo do próprio campo, e não solta no rodapé */}
      {erro ? (
        <Text className="text-red-700 dark:text-alerta text-xs mt-1.5">
          {erro}
        </Text>
      ) : null}
    </View>
  );
}
