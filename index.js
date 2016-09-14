
'use strict'

const JiraApi = require( 'jira' ).JiraApi
const jira = new JiraApi( 'https', 'devnet.eggs.de', 80, 'user', 'pass','2.0.alpha1', null, false, null, 'jira' )

jira.listProjects( projects => console.log( projects ) )
