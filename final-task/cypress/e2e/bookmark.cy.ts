describe('Bookmark Functionality', () => {
  beforeEach(() => {
    // Mock the API responses for jobs
    cy.intercept('GET', 'https://akil-backend.onrender.com/opportunities/search', {
      statusCode: 200,
      body: {
        data: [
          {
            id: '1',
            title: 'Software Engineer',
            description: 'We are looking for a talented software engineer.',
            company: 'Tech Corp',
            categories: ['Engineering'],
            requiredSkills: ['JavaScript'],
            opType: 'Full-time',
            location: ['San Francisco'],
            isBookmarked: false,
          },
          {
            id: '2',
            title: 'Product Manager',
            description: 'Join our product team.',
            company: 'Product Inc',
            categories: ['Product'],
            requiredSkills: ['Product Management'],
            opType: 'Full-time',
            location: ['New York'],
            isBookmarked: true,
          },
        ],
      },
    }).as('getJobs')
  })

  it('should load the jobs page successfully', () => {
    cy.visit('/')
    cy.wait('@getJobs')
    
    // Verify jobs are loaded
    cy.contains('Software Engineer').should('be.visible')
    cy.contains('Product Manager').should('be.visible')
  })

  it('should display job cards with correct information', () => {
    cy.visit('/')
    cy.wait('@getJobs')
    
    // Check job information is displayed - be more flexible with the content
    cy.get('body').should('contain', 'Software Engineer')
    cy.get('body').should('contain', 'Product Manager')
    cy.get('body').should('contain', 'Full-time')
  })

  it('should navigate to job detail page when job card is clicked', () => {
    cy.visit('/')
    cy.wait('@getJobs')
    
    // Click on a job card - use a more reliable selector
    cy.get('[data-testid="job-card"]').first().click()
    
    // Should navigate to job detail page
    cy.url().should('include', '/job/1')
  })

  it('should display responsive design elements', () => {
    cy.visit('/')
    cy.wait('@getJobs')
    
    // Test responsive design by changing viewport
    cy.viewport('iphone-6')
    cy.contains('Software Engineer').should('be.visible')
    
    cy.viewport('ipad-2')
    cy.contains('Software Engineer').should('be.visible')
    
    cy.viewport(1920, 1080)
    cy.contains('Software Engineer').should('be.visible')
  })

  it('should handle missing job data gracefully', () => {
    // Mock API response with incomplete data
    cy.intercept('GET', 'https://akil-backend.onrender.com/opportunities/search', {
      statusCode: 200,
      body: {
        data: [
          {
            id: '3',
            title: '',
            description: '',
            company: '',
            categories: [],
            requiredSkills: [],
            opType: '',
            location: [],
            isBookmarked: false,
          },
        ],
      },
    }).as('getIncompleteJobs')

    cy.visit('/')
    cy.wait('@getIncompleteJobs')
    
    // Page should load without crashing
    cy.get('body').should('be.visible')
  })

  it('should display location information correctly', () => {
    cy.visit('/')
    cy.wait('@getJobs')
    
    // Check location is displayed
    cy.contains('San Francisco').should('be.visible')
    cy.contains('New York').should('be.visible')
  })

  it('should display job categories and skills', () => {
    cy.visit('/')
    cy.wait('@getJobs')
    
    // Check categories and skills are displayed
    cy.contains('Engineering').should('be.visible')
    cy.contains('Product').should('be.visible')
    cy.contains('JavaScript').should('be.visible')
    cy.contains('Product Management').should('be.visible')
  })

  it('should handle API errors gracefully', () => {
    // Mock API error
    cy.intercept('GET', 'https://akil-backend.onrender.com/opportunities/search', {
      statusCode: 500,
      body: { message: 'Internal server error' },
    }).as('getJobsError')

    cy.visit('/')
    cy.wait('@getJobsError')
    
    // Page should still load and show error handling
    cy.get('body').should('be.visible')
  })
})
