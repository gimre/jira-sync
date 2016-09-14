
'use strict'

const async = require( 'asyncawait/async' );
const await = require( 'asyncawait/await' );
const jira = require( './jira' )
const localOptions = {

}
const remoteOptions = {
    host: 'https://devnet.eggs.de/jira',
    user: 'asd',
    pass: 'asd'
}

const local  = jira( localOptions )
const remote = jira( remoteOptions )

remote.readLogs( {
    user: '',
    startDate: new Date,
    endDate: new Date
} )
// jira.readProjects( ).then( projects => projects.map( ( { key, name } ) => console.log( key, name ) ) )
const issues = await( jira.readIssuesInProjects( 'SAG' ) )

    .then( ( { issues } ) =>
        issues.map( issue =>
            console.log( issue.fields.worklog.worklogs.filter( log => log.author.key === 'gimre' ) )
            // jira.readIssueWorklog( issue.id ).then( log => console.log( log ) )
        )
    )
    .catch( e => console.error( e ) )