Cypress.Commands.add('validateCoursePriceOnCourseList', (course, price) => {
    cy.get('ul.learn-press-courses').contains(course).parent().next('.course-info').find('div.course-price span.price').should('have.text', price)
})