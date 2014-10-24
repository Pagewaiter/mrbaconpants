#! /usr/bin/env node

var Metalsmith = require('metalsmith');
    markdown    = require('metalsmith-markdown'),
    templates   = require('metalsmith-templates'),
    collections = require('metalsmith-collections'),
    permalinks  = require('metalsmith-permalinks'),
    Handlebars  = require('handlebars'),
    fs          = require('fs');

// Handlebar Helpers


// The Build Pipline
Metalsmith(__dirname)
    .source('./content')
    .metadata({
        "title": "Mr. Baconpants",
        "description": "a blog about bacon, beer, and everything else!"
    })
    .use(collections({
        pages: {
            pattern: 'content/pages/*.md'
        },
        posts: {
            pattern: 'content/posts/*.md',
            sortBy: 'date',
            reverse: true
        },
        bacon_live: {
            sortBy: 'date',
            reverse: true
        },
        preview_review: {
            sortBy: 'date',
            reverse: true
        }
    }))
    .use(markdown())
    .use(permalinks('posts/:title'))
    .use(templates({
        engine: 'handlebars',
        directory: 'layouts'
    }))
    .build(function(err){
        if (err) throw err;
    });