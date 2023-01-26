<a href="./LICENSE">![GitHub](https://img.shields.io/github/license/pedro-afonso/random-user?style=plastic)</a>
![GitHub repo size](https://img.shields.io/github/repo-size/pedro-afonso/random-user?style=plastic)
![GitHub Repo stars](https://img.shields.io/github/stars/pedro-afonso/random-user?color=yellow&style=plastic)

<h1 align="center">Projeto Random User</h1>

<br />

# :pushpin: Índice de conteúdos

- [Screenshots do Projeto](#camera_flash-screenshots-do-projeto)
- [Sobre o Projeto](#monocle_face-sobre-o-projeto)
- [Tecnologias](#globe_with_meridians-tecnologias-usadas)
- [Features](#triangular_flag_on_post-features)
- [Instalação](#question-como-instalar-e-executar-o-projeto)
- [Autor](#closed_book-autor)

</br>

---

# :camera_flash: Screenshots do Projeto

| <p align="center" >:sparkles: Tela de listagem dos usuários com filtros, ordenadores e com um design responsivo :sparkles:</p> |
| ------------------------------------------------------------------------------------------------------------------------------ |
| ![random-user-png](https://user-images.githubusercontent.com/50973575/214949777-1e0401f7-fe60-49ab-9eee-1aad9fcf6bc3.png)      |

---

# :monocle_face: Sobre o Projeto

Este projeto tem o objetivo de listar os usuários da [API](https://randomuser.me), com dados paginados, filtrados e ordenados, e com a funcionalidade de poder pesquisar pelo nome.

<br />

---

# :globe_with_meridians: Tecnologias Usadas

✅ [Next.js](https://nextjs.org) - Framework JS.

✅ [Typescript](https://www.typescriptlang.org) - Para fazer a tipagem.

✅ [Axios](https://axios-http.com) - Biblioteca usada para fazer as requisições http.

✅ [React Query](https://react-query-v3.tanstack.com) - Para gerenciar o cache e o armazenamento dos dados.

✅ [Random User API](https://randomuser.me) - API usada para obter os dados dos usuários aleatórios.

<br />

---

# :triangular_flag_on_post: Features

- [x] Campo para buscar por usuários pelo nome.
- [x] Filtrar usuários por Estado.
- [x] Filtrar usuários por Gênero.
- [x] Ordenar usuários por nome.
- [x] Ordenar usuários por idade.
- [x] Dados paginados.
- [x] Configurar a quantidade de pessoas exibidas por página.
- [x] Layout responsivo.

<br />

---

# :question: Como instalar e executar o projeto

<br />

## Acessando direto pelo site:

- Você pode clicar nesse [link](https://random-user-sepia.vercel.app) e acessar a aplicação que está hospedada na plataforma da Vercel.

## Executar na máquina local:

(certifique-se de ter instalado na sua máquina o [Node](https://nodejs.org/en/).

1. Abra o terminal na pasta desejada para clonar o repositório e execute o comando:

```bash
git clone https://github.com/pedro-afonso/random-user.git
```

2. Depois de concluído, execute os seguintes comandos para iniciar:

```bash
cd random-user
```

Para instalar as dependências:

```bash
npm install
```

Você precisa criar um arquivo .env e adicionar a variável

```bash
NEXT_PUBLIC_BACKEND_URL='http://localhost:3000/api'
```

A variável NEXT_PUBLIC_BACKEND_URL é usada como url base do servidor.

Com isso já é possível iniciar a aplicação

```bash
npm run dev
```

4. Por fim, abra a pasta clonada em seu editor de códigos favorito e faça as suas alterações! xD

<br />

---

# :closed_book: Autor

Feito por [Pedro Afonso](https://github.com/pedro-afonso).

### :link: LinkedIn: https://www.linkedin.com/in/pedro-a-fonso/
