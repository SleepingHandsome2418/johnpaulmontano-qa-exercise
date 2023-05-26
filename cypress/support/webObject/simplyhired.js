class simplyhired_Object {

    JobTitle_Skills_Company_Label(){
        return cy.get('[data-testid="findKeywordFormLabel"]').as('Label for Job Title, Skills or Company')
    }

    JobTitle_Skills_Company_Textbox(){
        return cy.get('[data-testid="findJobsKeywordInput"]').as('Textbox for Job Title, Skills or Company')
    }

    City_State_ZIP_Remote_Label(){
        return cy.get('[data-testid="findLocationFormLabel"]:nth-child(1)').as('Label for City, State, ZIP or "Remote"')
    }

    City_State_ZIP_Remote_Textbox(){
        return cy.get('[data-testid="findJobsLocationInput"]').as('Textbox for City, State, ZIP or "Remote"')
    }




    SeachJobs_btn(){
        return cy.get('[data-testid="findJobsSearchSubmit"]').as('Search Jobs')
    }

}

export default simplyhired_Object