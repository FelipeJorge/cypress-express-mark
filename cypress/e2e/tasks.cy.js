/// <reference types="cypress" />


describe('tarefas', () => {

    it.only('deve cadastrar uma nova tarefa', () => {

        cy.request({
            url: 'http://localhost:3333/helper/tasks',
            method: 'DELETE',
            body: { name: 'ler um livro de node.js' }
        }).then(response => {
            expect(response.status).to.eq(204)
        })

        cy.visit('http://localhost:8080')

        cy.get('input[placeholder="Add a new Task"]')
            .type('ler um livro de node.js')

        cy.contains('button', 'Create').click()

        cy.contains('main div p', 'ler um livro de node.js')
            .should('be.visible')
    })

    it('não deve permitir tarefas duplicadas', () =>{

        cy.request({
            url: 'http://localhost:3333/helper/tasks',
            method: 'DELETE',
            body: { name: 'Estudar js' }
        }).then(response => {
            expect(response.status).to.eq(204)
        })

        cy.request({
            url: 'http://localhost:3333/tasks',
            method: 'POST',
            body: {name: "Estudar js", is_done:false}
        }).then(response => {
            expect(response.status).to.eq(201)
        })

        cy.visit('http://localhost:8080')

        cy.get('input[placeholder="Add a new Task"]')
            .type('Estudar js')

        cy.contains('button', 'Create').click()

        cy.get('.swal2-html-container')
            .should('be.visible')
            .should('have.text','Task already exists!')

    })

})