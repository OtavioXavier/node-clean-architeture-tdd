# Clean Node API

> Projeto de aprendizado em Clean Architecture aplicada a Node.js usando Test-Driven Development (TDD)

## 📋 Sobre o Projeto

Este é um projeto de estudo desenvolvido por um engenheiro de software júnior com o objetivo de aprender e aplicar os princípios da **Clean Architecture** em Node.js, utilizando **TDD (Test-Driven Development)** como metodologia de desenvolvimento.

O projeto busca implementar uma API REST seguindo os princípios de arquitetura limpa, garantindo:
- **Separação de responsabilidades** entre camadas
- **Independência de frameworks** e bibliotecas externas
- **Testabilidade** através de testes unitários
- **Manutenibilidade** e **escalabilidade** do código

## 🏗️ Arquitetura

O projeto segue os princípios da Clean Architecture, organizando o código em camadas bem definidas:

```
src/
├── presentation/          # Camada de apresentação (HTTP, rotas, controllers)
│   ├── helpers/          # Helpers para respostas HTTP e erros
│   └── routers/          # Rotas da aplicação
├── domain/               # Camada de domínio (entidades, casos de uso)
├── data/                 # Camada de dados (repositórios, acesso a dados)
└── infra/                # Camada de infraestrutura (configurações, adapters)
```

## 🧪 Test-Driven Development (TDD)

Este projeto é desenvolvido seguindo a metodologia TDD, onde:
1. **Red**: Escrevemos um teste que falha
2. **Green**: Implementamos o código mínimo para fazer o teste passar
3. **Refactor**: Refatoramos o código mantendo os testes passando

Todos os componentes possuem testes unitários que garantem o comportamento esperado e servem como documentação viva do código.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Jest** - Framework de testes
- **Standard** - Linter JavaScript
- **Husky** - Git hooks
- **lint-staged** - Lint apenas arquivos staged

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd clean-node-api
```

2. Instale as dependências:
```bash
npm install
```

## 🧪 Executando os Testes

```bash
# Executa os testes em modo watch
npm test

# Executa os testes com coverage
npm run test:ci

# Executa apenas testes relacionados aos arquivos modificados
npm run test:staged
```

## 📝 Scripts Disponíveis

- `npm test` - Executa os testes em modo watch
- `npm run test:staged` - Executa testes relacionados aos arquivos staged
- `npm run test:ci` - Executa todos os testes com relatório de cobertura

## 🎯 Objetivos de Aprendizado

- ✅ Aplicar os princípios da Clean Architecture
- ✅ Desenvolver usando TDD
- ✅ Criar código testável e desacoplado
- ✅ Entender a separação de responsabilidades entre camadas
- ✅ Praticar boas práticas de desenvolvimento

## 📚 Conceitos Aplicados

- **Clean Architecture**: Separação em camadas independentes
- **Dependency Inversion**: Dependências apontam para abstrações
- **Single Responsibility**: Cada classe tem uma única responsabilidade
- **Test-Driven Development**: Desenvolvimento guiado por testes
- **SOLID Principles**: Aplicação dos princípios SOLID

## 🤝 Contribuindo

Este é um projeto de aprendizado pessoal. Sugestões e feedbacks são bem-vindos!

---

**Desenvolvido com foco em aprendizado e boas práticas de engenharia de software.**
