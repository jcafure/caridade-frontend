# 🍽️ Caridade Frontend

Frontend do projeto **Caridade**, uma plataforma solidária para organizar campanhas de distribuição de refeições em comunidades carentes.

## 📌 Visão Geral

Este sistema permite:
- ✅ Criação de contas para doadores
- ✅ Cadastro e gerenciamento de produtos
- ✅ Criação e edição de campanhas solidárias
- ✅ Integração com o microserviço de autenticação via JWT
- ✅ Interface responsiva com layout limpo baseado em Bootstrap

## 🧰 Tecnologias Utilizadas

- [Angular 19](https://angular.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Bootstrap 5](https://getbootstrap.com/)
- [Standalone Components](https://angular.io/guide/standalone-components)
- [RxJS](https://rxjs.dev/)
- [SCSS](https://sass-lang.com/)
- Integração com backend `Spring Boot (Java 22)`

## 🚀 Como rodar o projeto

### Pré-requisitos

- Node.js (versão 18+)
- Angular CLI

### Passos

```bash
# Clone o repositório
git clone https://github.com/jcafure/caridade-frontend.git
cd caridade-frontend

# Instale as dependências
npm install

# Rode o projeto localmente
ng serve
Acesse em: http://localhost:4200

🔐 Autenticação
Este frontend está integrado com o microserviço authorization-service, utilizando JWT.

Fluxo de Registro:
Usuário cria conta com email e senha

O frontend recebe o userId e token JWT

Usuário é redirecionado para completar seu cadastro como Doador

O frontend envia os dados pessoais e endereço ao backend principal (caridade-backend), vinculando ao userId

🖼️ Telas

Tela de Login	Cadastro de Doador	Cadastro de Produto
Em construção	Em breve	✅ Concluído
📁 Estrutura do Projeto
bash
Copiar
Editar
src/
├── app/
│   ├── core/               # Auth, services, interceptors
│   ├── features/           # Funcionalidades (produtos, login, doador, etc)
│   ├── shared/             # Componentes reutilizáveis
│   └── app.routes.ts       # Rotas standalone
├── assets/
└── environments/
📦 Build para produção
bash
Copiar
Editar
ng build --configuration production
👨‍💻 Autor
Desenvolvido por Jaime Cafure ❤️
