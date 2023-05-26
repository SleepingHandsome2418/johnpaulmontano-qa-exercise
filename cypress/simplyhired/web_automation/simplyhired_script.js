describe('Automation Testing for Simply Hired website', () => {

    context('Desktop View', () => {

        beforeEach(() => {
            cy.viewport('macbook-15')
        })

        it('Navigate to https://www.simplyhired.com/ while in the Desktop view', () => {
            cy.visit('https://www.simplyhired.com/ ')
            cy.url().should('include','https://www.simplyhired.com/')

            //Filter job posts with these criterias: Job type: Full-time, Specific Location: New York, Skills: JavaScript and React, Minimum Salary: $105,000

            //Skills
            cy.get('[data-testid="findKeywordFormLabel"]').as('Label for Job Title, Skills or Company')
            .should('be.visible')
            .and('have.text','Job Title, Skills or Company')

            cy.get('[data-testid="findJobsKeywordInput"]').as('Textbox for Job Title, Skills or Company')
            .should('be.visible')

            cy.get('[data-testid="findJobsKeywordInput"]').then($textbox => {
                cy.get($textbox).click()
                cy.get($textbox).type('{selectall}{backspace}')
                cy.get($textbox).should('not.have.text')
                cy.get($textbox).type('JavaScript and React')
            })

            //Location
            cy.get('[data-testid="findLocationFormLabel"]:nth-child(1)').as('Label for City, State, ZIP or "Remote"')
            .should('be.visible')
            .and('have.text','City, State, ZIP or "Remote"')

            cy.get('[data-testid="findJobsLocationInput"]').as('Textbox for City, State, ZIP or "Remote"')
            .should('be.visible')

            cy.get('[data-testid="findJobsLocationInput"]').then($textbox => {
                cy.get($textbox).click()
                cy.get($textbox).type('{selectall}{backspace}')
                cy.get($textbox).should('not.have.text')
                cy.get($textbox).type('New York')
            })

            cy.get('[data-testid="findJobsSearchSubmit"]').as('Search Jobs').click()

            cy.wait(3000)

            cy.get('[data-testid="findJobsKeywordInput"]').as('Textbox for Job Title, Skills or Company')
            .should('have.value','JavaScript and React')       

            cy.get('[data-testid="findJobsLocationInput"]').as('Textbox for City, State, ZIP or "Remote"')
            .should('have.value','New York') 

            //Job Type - Filter
            cy.get('button[data-testid="dropdown"]:nth-child(4)').then($filter => {
                cy.get($filter).as('Job Type Filter').should('be.visible')
                .and('have.text','Job Type')
                cy.get($filter).click()

                cy.get('[data-testid="dropdown-list"]').then($dropdown => {
                    cy.get($dropdown).as('Dropdown List').should('be.visible')

                    cy.get($dropdown).find('[data-testid="dropdown-option"]').then($option => {
                        cy.get($option).contains('Full-time').click()
                        cy.get($filter).as('Job Type Filter').should('have.text','Full-time')
                        .and('have.css','border-color','rgb(0, 30, 106)')
                        .and('have.css','background-color','rgb(243, 244, 255)')
                    })
                })
            })

            //Validation for Qualifications, Location and Job Type
            cy.get('[data-testid="searchSerpJob"]').each($job => {
                cy.get($job).click()
                cy.wait(2000)

                cy.get('[data-testid="viewJobQualificationsContainer"]').as('Qualifications')
                .should('contain.text','JavaScript')
                .and('contain.text','React')

                cy.get('[data-testid="viewJobCompanyLocation"]').then($location => {
                    const companyLocation = $location.text()

                    if (companyLocation.includes('New York')) {
                        cy.get($location ).as('Company Location')
                        .should('contain.text','New York')
                    } else {
                        cy.get($location ).as('Company Location')
                        .should('contain.text','NY')
                    }
                })

                cy.get('[data-testid="viewJobBodyJobDetailsJobType"]').as('Job Type')
                .should('contain.text','Full-time')
            })


            //Minimum Salary
            cy.get('button[data-testid="dropdown"]:nth-child(6)').then($filter => {
                cy.get($filter).as('Minimum Salary Filter').should('be.visible')
                .and('have.text','Minimum Salary')
                cy.get($filter).click()

                cy.get('[data-testid="dropdown-list"]').then($dropdown => {
                    cy.get($dropdown).as('Dropdown List').should('be.visible')

                    cy.get($dropdown).find('[data-testid="dropdown-option"]').then($option => {
                        cy.get($option).contains('$105,000').click()
                        cy.get($filter).as('Job Type Filter').should('have.text','$105,000')
                        .and('have.css','border-color','rgb(0, 30, 106)')
                        .and('have.css','background-color','rgb(243, 244, 255)')
                    })
                })
            })


            //Validation Job Compensation
            cy.get('[data-testid="searchSerpJob"]').each($job => {
                cy.get($job).click()
                cy.wait(2000)
                // cy.get('[data-testid="viewJobBodyJobCompensation"]').as('Minimum Salary')
                // .should('contain.text','$105,000')
            })

            //Order the results by Date
            cy.get(':nth-child(2) > .chakra-radio__label').then($date => {
                cy.get($date).click()
                cy.get($date).as('Date Button').should('have.css','border-color','rgb(22, 22, 22)')
                .and('have.css','background-color','rgb(243, 244, 255)')
            })


            //Go to Main Page to Return the top 5 job posts
            cy.get('[data-testid="headerLogoLinkMain"]').click()
            cy.get('[data-testid="mainTitle"]').as('Main Tittle')
            .should('be.visible')
            .and('have.text','One Search, Millions of Jobs')

            cy.get('[data-testid="recentSearchesQueriesContainer"]').as('Recent Searched Section')
            .should('be.visible')

            cy.get('[data-testid="homePageRecentSearchesJobsContainer"]').as('Recent Searched Jobs Container')
            .should('be.visible')

            cy.get('#job-list [data-testid="homepageSerpJob"]').as('Job List')
            .should('be.visible')
            .and('have.length',5)

        })

    })

    context('Mobile View', () => {

        beforeEach(() => {
            cy.viewport('iphone-8')
        })

        it('Navigate to https://www.simplyhired.com/ while in the Desktop view', () => {
            cy.visit('https://www.simplyhired.com/ ')
            cy.url().should('include','https://www.simplyhired.com/')

            //Filter job posts with these criterias: Job type: Full-time, Specific Location: New York, Skills: JavaScript and React, Minimum Salary: $105,000

            //Skills

            cy.get('[data-testid="searchFormContainer"]').click()

            cy.get('[data-testid="findKeywordFormLabel"]').as('Label for Job Title, Skills or Company')
            .should('be.visible')
            .and('have.text','Job Title, Skills or Company')

            cy.get('[data-testid="findJobsKeywordInput"]').as('Textbox for Job Title, Skills or Company')
            .should('be.visible')

            cy.get('[data-testid="findJobsKeywordInput"]').then($textbox => {
                cy.get($textbox).click()
                cy.get($textbox).type('{selectall}{backspace}')
                cy.get($textbox).should('not.have.text')
                cy.get($textbox).type('JavaScript and React')
            })

            //Location
            cy.get('[data-testid="findLocationFormLabel"]:nth-child(1)').as('Label for City, State, ZIP or "Remote"')
            .should('be.visible')
            .and('have.text','City, State, ZIP or "Remote"')

            cy.get('[data-testid="findJobsLocationInput"]').as('Textbox for City, State, ZIP or "Remote"')
            .should('be.visible')

            cy.get('[data-testid="findJobsLocationInput"]').then($textbox => {
                cy.get($textbox).click()
                cy.get($textbox).type('{selectall}{backspace}')
                cy.get($textbox).should('not.have.text')
                cy.get($textbox).type('New York')
            })

            cy.get('[data-testid="mobileFindJobsKeywordButtonToggle"]').click()

            cy.get('[data-testid="mobileFindJobsSearchSubmit"]').as('Search Jobs').click()
            cy.wait(3000)

            cy.get('[data-testid="mobileFindJobsKeywordButtonToggle"]').click()

            cy.get('[data-testid="findJobsKeywordInput"]').as('Textbox for Job Title, Skills or Company')
            .should('have.value','JavaScript and React')       

            cy.get('[data-testid="findJobsLocationInput"]').as('Textbox for City, State, ZIP or "Remote"')
            .should('have.value','New York')


            cy.get('[data-testid="mobileFindJobsKeywordButtonToggle"]').click()

            cy.get('[data-testid="sorting-filters-mobile-button"]').as('Sort & Filter').click()


            //Job Type - Filter
            let jobType = 'Full-time'

            cy.get("span[class*='chakra-radio']").contains(jobType).then($radio_btn => {
                cy.get($radio_btn).as('Job Type').click()
                cy.wait(3000)
                cy.get($radio_btn).as('Job Type').should('have.text',jobType)
                .and('have.css','border-color','rgb(22, 22, 22)')
                .and('have.css','background-color','rgb(243, 244, 255)')
                cy.wait(3000)
            })


            //Minimum Salary
            let minumumSalary = '$105,000'

            cy.get("span[class*='chakra-radio']").contains(minumumSalary).then($radio_btn => {
                cy.get($radio_btn).as('Minimum Salary').click()
                cy.wait(3000)
                cy.get($radio_btn).as('Minimum Salary').should('have.text',minumumSalary)
                .and('have.css','border-color','rgb(22, 22, 22)')
                .and('have.css','background-color','rgb(243, 244, 255)')
                cy.wait(3000)
            })


            //Order the results by Date
            cy.get(':nth-child(2) > [data-testid="radio-group-mobile"] > .chakra-wrap > .chakra-wrap__list > :nth-child(2) > .chakra-radio > .chakra-radio__label')
            .then($radio_btn => {
                cy.get($radio_btn).click()
                cy.get($radio_btn).as('Sort by').should('have.text','Date')
                .and('have.css','border-color','rgb(22, 22, 22)')
                .and('have.css','background-color','rgb(243, 244, 255)')
                cy.wait(3000)
            })


            //Validation for Qualifications, Location and Job Type
            cy.get('[data-testid="searchSerpJob"]').each($job => {
                cy.get($job).click()
                cy.wait(2000)

                cy.get('[data-testid="viewJobQualificationsContainer"]').then($qualifications => {
                    const jobQualifications = $qualifications.text()

                    if (jobQualifications.includes('JavaScript') && jobQualifications.includes('React')) {
                        cy.get('[data-testid="viewJobQualificationsContainer"]').as('Qualifications')
                        .should('contain.text','JavaScript')
                        .and('contain.text','React')
                    } else if (jobQualifications.includes('JavaScript')) {
                        cy.get('[data-testid="viewJobQualificationsContainer"]').as('Qualifications')
                        .should('contain.text','JavaScript')
                    } else {
                        cy.get('[data-testid="viewJobQualificationsContainer"]').as('Qualifications')
                        .and('contain.text','React')
                    }
                })

                cy.get('[data-testid="viewJobCompanyLocation"]').then($location => {
                    const companyLocation = $location.text()

                    if (companyLocation.includes('New York')) {
                        cy.get($location ).as('Company Location')
                        .should('contain.text','New York')
                    } else {
                        cy.get($location ).as('Company Location')
                        .should('contain.text','NY')
                    }
                })

                cy.get('[data-testid="viewJobBodyJobDetailsJobType"]').as('Job Type')
                .should('contain.text','Full-time')

                cy.get('button[type="button"]').contains('Back to search results').click()
            })


            //Validation Job Compensation
            cy.get('[data-testid="searchSerpJobSalaryEst"]').each($salary => {
                const salary = '$105,000'
                const selectedMinumumSalary = salary.replace('$','').replace(',','')

                const salaryRange = $salary.text().replace('Estimated: ','').replace('$','').replace('$','').replace('-','').replace(',','').replace(',','').replace('a year','').replace('K','000').replace('K','000').replace(' ','').replace(' ','').replace(' ','')
                const minimumRange = salaryRange.slice('0','6')
                const miximumRange = salaryRange.slice('6','12')

                expect(Number(selectedMinumumSalary),`Selected Minimun Salary`).to.be.within(Number(minimumRange),Number(miximumRange))
            })
            

            //Go to Main Page to Return the top 5 job posts
            cy.get('[data-testid="headerLogoLinkMain"]').click()
            cy.get('[data-testid="mainTitle"]').as('Main Tittle')
            .should('be.visible')
            .and('have.text','One Search, Millions of Jobs')

            cy.get('[data-testid="recentSearchesQueriesContainer"]').as('Recent Searched Section')
            .should('be.visible')

            cy.get('[data-testid="homePageRecentSearchesJobsContainer"]').as('Recent Searched Jobs Container')
            .should('be.visible')

            cy.get('#job-list [data-testid="homepageSerpJob"]').as('Job List')
            .should('be.visible')
            .and('have.length',5)

        })

    })

})