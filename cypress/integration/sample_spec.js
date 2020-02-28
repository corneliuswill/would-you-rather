describe('Sample Test', function() {
    it('Launch the app and sign in', function() {
        cy.visit('localhost:3000/wouldyourather')

        cy.get('select').select('cwilliams')
        cy.contains('Sign In').click() // Select the 'cwilliams' option
    })
})