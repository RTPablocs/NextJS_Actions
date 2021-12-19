const fs = require('fs')
const core = require('@actions/core')


const testResult = core.getInput('status')
const successBadge = 'https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg'
const failedBadge = 'https://img.shields.io/badge/test-failure-red.svg'

fs.readFile('README.md', 'utf-8', (err,data) => {
    if (err) {
        throw err
    }
    const markdownUpdate = data.replace(
        /(?<=\[!\[Cypress.io\]\()[\s\S]*(?=\)\])/gm,
        testResult !== 'failure' ? successBadge : failedBadge
    )
    fs.writeFile('README.md', markdownUpdate, 'utf-8', (err) => {
        if (err) {
            throw err
        }
        console.log('Markdown Update Successfully')
    })
})
