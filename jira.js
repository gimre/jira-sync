
'use strict'

const fetch = require( 'isomorphic-fetch' )

exports = module.exports = ( {
    apiVersion = 2,
    host, pass, user
} ) => {
    const auth = new Buffer( `${ user }:${ pass }` ).toString( 'base64' )
    const headers = {
        'Authorization': `Basic ${ auth }`,
        'Content-Type':  'application/json'
    }
    
    const apiFetch = ( path, ... args ) => fetch( `${ host }/rest/api/${ apiVersion }/${ path }`, ... args )
        .then( response => response.json( ) )

    return {
        readProjects: ( ) => apiFetch( 'project', { method: 'GET', headers } ),
        readIssuesInProjects: ( ... projects ) =>
            apiFetch( 'search', { method: 'POST', headers, body: JSON.stringify( {
                jql: `project in (${ projects.join( ) }) AND issueFunction in workLogged("after 2016/09/01 before 2016/09/30 by currentUser()")`,
                expand: [ 'worklog' ],
                fields: [ 'summary', 'worklog' ],
                maxResults: -1,
                startAt: 0,
                validateQuery: false
            } ) } ),
        readIssueWorklog: ( issueId ) =>
            apiFetch( `issue/${ issueId }/worklog`, { method: 'GET', headers } )
    }
}