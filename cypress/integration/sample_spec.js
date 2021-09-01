// selector
const usernameUnderavatar           =   'span.profile-name'
const welcomeMessageAfterLogin      =   'div.learn-press-profile-dashboard'
const profileHeader                 =   '#learn-press-profile-header'
const usernameOnTopRight            =   '#wp-admin-bar-my-account span.display-name'
const topRightDropdown              =   '#wp-admin-bar-my-account'
const listContainingUsername        =   '#wp-admin-bar-user-info'
const usernameInsideList            =   listContainingUsername + ' a'
const navbarListCourses             =   '#menu-item-1254'
const courseNameOnCrumbs            =   'span.current'
const navUnderImage                 =   'nav.learn-press-breadcrumb'
const listOfCourses                 =   'ul.learn-press-courses'
const listOfCourses_CourseName      =   listOfCourses + ' li a h3'
const priceAboveBuyThisCourseButton =   'div.course-price span.price'
const buttonBuyThisCourse           =   'button.lp-button.button.button-purchase-course'
const cartCourseName                =   'td.course-name a'
const cartCoursePrice               =   'td.course-total'

// data
const username  = 'fullstackdemo'
const password  = 'fullstackdemo'
const setOfData = [
    {
        name :  'Learn Automation Without Coding Using Katalon Studio', 
        price:  '₹199.00'
    },
    {
        name :  'API Tests Automation Using Restassured In Hindi',
        price:  '₹999.00'
    },
    {
        name :  'Learn TestNG From Scratch',
        price:  '₹199.00'
    }
]

Cypress.Commands.add('validateCourseNameOnCourseList', (course, price) => {
    cy.get(listOfCourses_CourseName).contains(course).should('have.text', course)
})

Cypress.Commands.add('validateCoursePriceOnCourseList', (course, price) => {
    cy.get(listOfCourses_CourseName).contains(course).parent().next('.course-info').find('div.course-price span.price').should('have.text', price)
})

Cypress.Commands.add('validateElementHaveText', (element, text) => {
    cy.get(element).should('have.text', text) 
})

Cypress.Commands.add('validateElementIncludeText', (element, text) => {
    cy.get(element).should('include.text', text)
})

Cypress.Commands.add('clickElementContains', (element) => {
    cy.contains(element).click()
})

Cypress.Commands.add('justClick', (element) => {
    cy.get(element).click()
})

beforeEach(() => {
    cy.visit('https://testautomasi.com')
    cy.contains('Log In/Register As Student').should('be.visible').click()
    cy.get('#username').should('be.visible').type(username)
    cy.get('#password').type(password)
    cy.get('button').contains('Login').click()
    cy.get('a').contains('Sign out').should('be.visible')
    cy.log(username)
})

describe('basic check', () => {
    describe('Check Username Consistency', () => {
        it('check username inside the dropdown of top right', () => {
            cy.get(topRightDropdown).invoke('show').click()
            cy.validateElementHaveText(usernameInsideList, username)
            cy.go('back')
        });
        it('check username under avatar display', () => {
            cy.validateElementHaveText(usernameUnderavatar, username)
        });
        it('check username on the welcome message', () => {
            cy.validateElementIncludeText(welcomeMessageAfterLogin, username)
        });
        it('check username on the top right', () => {
            cy.validateElementIncludeText(usernameOnTopRight, username)
        });
    })
    it('test courses name and price consistency', () => {
        setOfData.forEach(data => {
            cy.get(navbarListCourses).click()
            cy.validateCourseNameOnCourseList(data.name)
            cy.validateCoursePriceOnCourseList(data.name, data.price)
            cy.clickElementContains(data.name)
            cy.validateElementHaveText(courseNameOnCrumbs, data.name)
            cy.validateElementIncludeText(navUnderImage, data.name)
            cy.validateElementIncludeText(priceAboveBuyThisCourseButton, data.price)
            cy.justClick(buttonBuyThisCourse)
            cy.validateElementIncludeText(cartCourseName, data.name)
            cy.validateElementIncludeText(cartCoursePrice, data.price)
        });
    });
});