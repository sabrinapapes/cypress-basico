
describe('Central de Atendimento ao Cliente TAT', function() {

  beforeEach(function() {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function() {
      cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('Campos obrigatorios e mensagem sucesso', function() {
    cy.clock()
    cy.get('#firstName').type('Sabrina')
    cy.get('input[name="lastName"]').type('Papes')
    cy.get('input[type="email"]').type('qapapes@gmail.com')
    cy.get('textarea[name="open-text-area"]').type('MMentoria Cypress')

    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')

  })

  it('Email invalido e mensagem error', function() {
    cy.get('input[name="firstName"]').type('Sabrina')
    cy.get('input[name="lastName"]').type('Papes')
    cy.get('input[type="email"]').type('qapapescom')
    cy.get('textarea[name="open-text-area"]').type('MMentoria Cypress')

    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')

  })

  it('Validar campo telefone quando não numerico', function() {
    cy.get('input[id="phone"]')
      .should('have.value', '').type('acbdefghij')

  })

  it('Mensagem de erro quando telefone obrigatorio mas nao preenchido', function(){
    cy.get('input[name="firstName"]').type('Sabrina')
    cy.get('input[name="lastName"]').type('Papes')
    cy.get('input[type="email"]').type('qapapescom')
    cy.get('#phone-checkbox').check()
    cy.get('textarea[name="open-text-area"]').type('MMentoria Cypress')
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })


  it('Preenche e limpa os campos nome, sobrenome, email e telefone', function(){
    cy.get('#firstName')
      .type('Sabrina')
      .should('have.value', 'Sabrina')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Papes')
      .should('have.value', 'Papes')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('qapapes@gmail.com')
      .should('have.value', 'qapapes@gmail.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('123456789')
      .should('have.value', '123456789')
      .clear()
      .should('have.value', '')
  })

  it('Exibe mensagem de erro ao submeter o formulario sem os campos obrigatorios', function(){
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('Custom Commmands Fill Form', function(){
    cy.fillMandatoryFieldsAndSubmit()

  })

  it('Exibe mensagem de erro ao submeter o formulario sem os campos obrigatorios', function(){
    //cy.get('button[type="submit"]').click()
    cy.contains('Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('Selecionando um produto pelo texto', function(){
    cy.get('#product')
      .select('YouTube')
      .should('have.value','youtube')
  })

  it('Selecionando um produto pelo valor', function(){
    cy.get('#product')
      .select('mentoria')
      .should('have.value','mentoria')
  })

  it('Selecionando um produto pelo indice', function(){
    cy.get('#product')
      .select(1)
      .should('have.value','blog')
  })

  it('Marca o tipo de atendimento "Feedback"', function(){
    cy.get(':nth-child(4) > input').check().should('have.value', 'feedback')
  })

  it('Marca cada tipo de atendimento', function(){
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function($radio){
        cy.wrap($radio).check().should('be.checked')
      })
  })

  it('Marca todos os checkboxes e depois desmarca o último', function(){
    cy.get('#check input[type="checkbox"]')
      .as('checkboxes')
      .check()
      .should('be.checked')

    cy.get('#check input[type="checkbox"]')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('selecionar um arquivo', function(){
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('selecionar um arquivo com drag and drop', function(){
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('selecionar um arquivo com alias', function(){
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Verifica Politica de privacidade abre em outra aba', function(){
    cy.get('a').should('have.attr', 'target', '_blank')
  })

  it('Acessa Politica de Privacidade removendo o target', function(){
    cy.get('a').invoke('removeAttr', 'target').click()
    cy.url().should('include', 'privacy.html')
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
  })

  it('Exibe e esconde mensagens de sucesso e erro', function(){
    cy.get('input[name="firstName"]').type('Sabrina')
    cy.get('input[name="lastName"]').type('Papes')
    cy.get('input[type="email"]').type('qapapescom')
    cy.get('textarea[name="open-text-area"]').type('MMentoria Cypress')

    cy.get('button[type="submit"]').click()

    cy.get('.error')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')

  })

  it('preenche area de texto usando invoke', function(){
    const longText = Cypress._.repeat('testetestetetets', 20)

    cy.get('#open-text-area')
      .invoke('val', longText)
      .should('have.value', longText)
  })

  it('desafio encontre o gato', function(){
    cy.get('span[id="cat"]')
      .invoke('show')
      .should('be.visible')
  })

  it.only('Faz uma requisicao HTTP', function(){
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
      .should(function(response){
        const { status, statusText, body } = response
        expect(status).to.equal(200)
        expect(statusText).to.equal('OK')
        expect(body).to.include('CAC TAT')
      })
  })
})