# Landing Page de Alta Conversão — Terreno Urbano no Troviscal, Oliveira do Bairro

Landing page imobiliária desenvolvida em **Next.js (App Router, Turbopack)** com **Tailwind CSS**, design editorial de luxo (verde floresta escuro `#062319` e linho creme `#f6f1e8` com apontamentos a ouro champanhe `#c5a869`), tipografia refinada (**Playfair Display** e **Plus Jakarta Sans**), e integração direta com **Neon Serverless Postgres**.

---

## 🎯 Destaques do Produto e da Estratégia de Conversão

- **Localização:** Troviscal, Oliveira do Bairro (Distrito de Aveiro)
- **Área Total:** 1.474,50 m²
- **Frente Urbana:** 38 metros lineares
- **Topografia:** 100% plano (poupança direta em escavações e muros de suporte)
- **Preço de Oportunidade:** 46.500€ (Negociável — ~31,5€/m²)
- **Público Dual:**
  - **Famílias:** Moradia térrea ou de 2 pisos com piscina, privacidade total e mais de 1.000 m² de jardim livre.
  - **Construtores / Investidores:** Empreendimento de 3 a 4 moradias (em banda ou geminadas) com acessos frontais independentes graças aos 38m de frente. Incidência do solo de apenas 11.600€ a 15.500€ por fração.

---

## 🏛️ Secções da Página

1. **Header Minimalista com CTAs Rápidos:** Contacto telefónico e botão de agendamento.
2. **Abertura Impactante (Hero):** Headline dual, métricas quantitativas precisas e fotografia real do terreno.
3. **Apresentação Dual ("Muito Mais que um Terreno"):** Comparativo lado a lado para Famílias e Construtores em fundo linho creme.
4. **Galeria Triptych com Lightbox Interativo ("Amplitude Redefinida"):** Fotografias reais sob todos os ângulos (`frente.png`, `frente-direita.png`, `lado-direita.png`, `tras.png`, `tras-direita.png`, `mapa.png`) com ampliação em ecrã inteiro.
5. **Vantagens Traduzidas em Valor Real:** Matriz de benefícios reais (sem custos escondidos de obra).
6. **Declaração Imersiva ("Onde o Seu Projeto Ganha Forma"):** Secção de prestígio editorial.
7. **Simulador Financeiro & Volumétrico:** Sliders interativos para cálculo de investimento de autoconstrução ou margens de venda de 3 a 4 frações.
8. **Viabilidade Técnica & PDM:** Acordeão com esclarecimento sobre Área Edificada Consolidada, redes públicas na via e prazos camarários em Oliveira do Bairro.
9. **Formulário de Conversão para Neon Postgres:** Campos de Nome, Email, Telefone, Tipo de Interesse, Data sugerida e Mensagem.
10. **Barra Flutuante de Conversão (Floating CTA):** Pílula persistente com botão de agendamento, gatilho direto para WhatsApp e regresso ao topo.
11. **Rodapé Editorial:** Enquadramento jurídico, avisos legais e contactos.

---

## 🗄️ Configuração do Banco de Dados Neon Postgres

A rota de submissão do formulário (`/api/lead`) está configurada para guardar os pedidos diretamente na base de dados Neon Postgres utilizando `@neondatabase/serverless`.

### 1. Obter a Connection String do Neon
1. Aceda ao painel do Neon: [https://console.neon.tech](https://console.neon.tech)
2. Crie ou selecione o seu projeto.
3. Copie a connection string (Pooled ou Direct).

### 2. Configurar a Variável de Ambiente
Crie ou edite o ficheiro `.env.local` na raiz do projeto:

```env
DATABASE_URL="postgresql://neondb_owner:sua-senha@ep-exemplo.eu-central-1.aws.neon.tech/neondb?sslmode=require"
```

> **Nota de Resiliência:** Caso a variável `DATABASE_URL` ainda não esteja preenchida, o sistema ativa automaticamente um modo de simulação gracioso, registando a lead e apresentando o ecrã de sucesso sem quebrar a aplicação. Assim que a connection string for configurada, a tabela `leads_terreno_troviscal` é criada e alimentada automaticamente.

---

## 🚀 Como Executar o Projeto Localmente

```bash
# Instalar dependências (já instaladas)
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Compilar para produção
npm run build
```

Aceda a: [http://localhost:3000](http://localhost:3000)
