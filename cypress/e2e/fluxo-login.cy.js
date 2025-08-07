// describe('Testando fluxo do login', () => {
//   it('Dando certo', () => {
//     //passo 1 - acessar a pagina
//     cy.visit('https://projeto-tiamate-dashboard.vercel.app/');
//     //passo 2 - procurar o campo de email e digitar o email
//     cy.get('#usuario_email').click().type("leo@email.com")
//     //passo 3 - procurar o campo de senha e digitar a senha
//     cy.get('#usuario_senha').click().type("1234")
//     cy.contains('Entrar').click()
//     cy.contains('Dashboard')
//   })
//   it('Com senha invalida', () => {
//     //passo 1 - acessar a pagina
//     cy.visit('https://projeto-tiamate-dashboard.vercel.app/');
//     //passo 2 - procurar o campo de email e digitar o email
//     cy.get('#usuario_email').click().type("leo@email.com")
//     //passo 3 - procurar o campo de senha e digitar a senha
//     cy.get('#usuario_senha').click().type("123456")
//     cy.contains('Entrar').click()
//     cy.contains('usuário ou senha incorreto')
//   })
// })

describe('Testando fluxo de captura de lead', () => {
  it('Dando certo', () => {
    //passo 1 - acessar a pagina
    cy.visit('https://projeto-tiamate.onrender.com/');
    //passo 2 - procurar o campo de email e digitar o email
    cy.get('input[placeholder="Nome e Sobrenome"]').click().type("leonardo")
    cy.get('input[placeholder="email@exemplo.com"]').click().type("leo@email.com")
    cy.get('input[placeholder="Telefone com DDD"]').click().type("85999999999")
    cy.get('select[name="lead_estado"]').select("Ceará")
    cy.get('select[name="lead_cidade"]').select("Fortaleza")
    cy.get('select[name="lead_midia"]').select("Instagram")
    cy.contains('Enviar Cadastro').click()
  })
})