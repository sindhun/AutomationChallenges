/// <reference types="cypress" />
import 'cypress-mochawesome-reporter/register';

describe("this test suite is to test most common automation pitfalls" , () => {
    it("test dynamic id", ()=> {
        cy.visit('/dynamicid')
        cy.get('.btn.btn-primary').click()
    })
    it("test Class Attribute", () => {
        cy.visit('/classattr')
        cy.get('.btn-primary').click()
        cy.on('window:alert', (str)=>{
            expect(str).to.equal('Primary button pressed')
        })
    })
    it("test hidden layers", () => {
        cy.visit('/hiddenlayers')
        cy.get('.btn-success').click()
        cy.get('.btn-success').click({force: true})
    })
    it("test delays", () => {
        cy.visit('/')
        cy.contains('a', 'Load Delay').click()
        cy.get('.btn-primary').click()
    })
    it("test ajax get request", {defaultCommandTimeout: 20000}, () => {
        cy.visit('/ajax')
        cy.get('.btn-primary').click()
        cy.get('.bg-success').should('have.text','Data loaded with AJAX get request.')
    })
    it("test text input",  () => {
        cy.visit('/textinput')
        cy.get('#newButtonName').type('Newbutton')
        cy.get('#updatingButton').click().should('have.text', 'Newbutton')
    })
    it("test scroll bar",  () => {
        cy.visit('/scrollbars')
        cy.get('#hidingButton').click()
    })
    it("test dynamic table",  () => {
        cy.visit('/dynamictable')
        cy.contains('span','Chrome').siblings('span').each($e1 => {
            if($e1.text().includes('%'))
                cy.get('.bg-warning').should('contain', $e1.text())
        })
    })
    it("test verify text",  () => {
        cy.visit('/verifytext')
        cy.contains('.bg-primary span', 'Welcome').find('span').should('contain', 'UserName')
    })
    it("test progress bar",  () => {
        cy.visit('/progressbar')
        cy.get('#startButton').click()
        cy.get('.progress-bar',{ timeout: 30000 }).should('contain', '76')
        cy.get('#stopButton').click()
    })
    it("test visibility",  () => {
        cy.visit('/visibility');
        cy.get('#hideButton').click();
        //cy.get('#removedButton').should('be.visible');
        //cy.get('#zeroWidthButton').should('be.visible');
        cy.get('#overlappedButton').should('be.visible');
        //cy.get('#transparentButton').should('be.visible');
        //cy.get('#invisibleButton').should('be.visible');
        //cy.get('#notdisplayedButton').should('be.visible');
        cy.get('#offscreenButton').should('be.visible');
    })
    it("test login",  () => {
        cy.visit('/sampleapp')
        cy.get('[name="UserName"]').type('Sindhu')
        cy.get('[name="Password"]').type('pwd')
        cy.get('#login').click()
    })
    it("test mouse over",  () => {
        cy.visit('/mouseover')
        cy.contains('a','Click me').click()
        cy.contains('a','Click me').click()
        cy.contains('a','Link Button').click()
        cy.contains('a','Link Button').click()
        cy.get('#clickCount').should('have.text', 2)
        cy.get('#clickButtonCount').should('have.text', 2)
    })
    it("test non breaking space",  () => {
        cy.visit('/nbsp')
        cy.contains('button', 'My Button').click()
    })
    it("test Overlapped Element",  () => {
        cy.visit('/overlapped')
        cy.get('#name').type('Sindhu')
    })
    it.skip("test shadow dom",  () => {
        cy.visit('/shadowdom')
        cy.get('guid-generator').shadow().find('#buttonGenerate').click()
        const textFieldValue = cy.get('guid-generator').shadow().find('#editField').text
        cy.get('guid-generator').shadow().find('button[class="button-copy"]').click()
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        })
        cy.window().then((win) => {
            win.navigator.clipboard.readText().then((text) => {
              // Assert the clipboard content
              expect(text).to.equal(textFieldValue)
            })
        })
    })
    it.skip("test alerts",  () => {
        cy.visit('/alerts')
        cy.get('#promptButton').click()
        //handling prompt alert
        cy.window().then(function(p){
        //stubbing prompt window
        cy.stub(p, "prompt").returns("cats");
        // click on Click for JS Prompt button
        cy.get(':nth-child(3) > button').click()
        })
    })
    it("test iframe & doc upload feature",  () => {
        cy.visit('/upload')
        cy.frameLoaded('[src="/static/upload.html"]')
        cy.iframe().find('.browse-btn').selectFile('.\\cypress\\documents\\JavaScript-All-Methods-Cheat-Sheet.pdf', {
            action: 'drag-drop'
        })
    })
    it("test animated button",  () => {
        cy.visit('/animation')
        cy.get('#animationButton').click()
        cy.get('#movingTarget').should('not.have.class', 'spin').click()
    })
    it("test disabled input",  () => {
        cy.visit('/disabledinput')
        cy.get('#enableButton').click()
        cy.get('#inputField').type('Sindhu')
    })
    
})