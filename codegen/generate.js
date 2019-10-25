const {generateTemplateFiles} = require('generate-template-files');

generateTemplateFiles([
    {
        option: 'Create page',
        defaultCase: '(kebabCase)',
        entry: {
            folderPath: './codegen/templates/page.vue',
        },
        stringReplacers: ['__pageName__'],
        output: {
            path: './src/components/__pageName__(kebabCase)-page.vue',
            pathAndFileNameDefaultCase: '(kebabCase)',
        },
        onComplete: (results) => {
            console.log(`results`, results);
        },
    },
    {
        option: 'Create route',
        defaultCase: '(kebabCase)',
        entry: {
            folderPath: './codegen/templates/route.js',
        },
        stringReplacers: ['__pageName__'],
        output: {
            path: './src/router/routes/__pageName__(kebabCase).js',
            pathAndFileNameDefaultCase: '(kebabCase)',
        },
        onComplete: (results) => {
            console.log(`results`, results);
        },
    },
    {
        option: 'Create route w/authentication',
        defaultCase: '(kebabCase)',
        entry: {
            folderPath: './codegen/templates/route-authentication.js',
        },
        stringReplacers: ['__pageName__'],
        output: {
            path: './src/router/routes/__pageName__(kebabCase).js',
            pathAndFileNameDefaultCase: '(kebabCase)',
        },
        onComplete: (results) => {
            console.log(`results`, results);
        },
    },
    {
        option: 'Create route w/authorization',
        defaultCase: '(kebabCase)',
        entry: {
            folderPath: './codegen/templates/route-authorization.js',
        },
        stringReplacers: ['__pageName__'],
        output: {
            path: './src/router/routes/__pageName__(kebabCase).js',
            pathAndFileNameDefaultCase: '(kebabCase)',
        },
        onComplete: (results) => {
            console.log(`results`, results);
        },
    },
    {
        option: 'Create module',
        defaultCase: '(kebabCase)',
        entry: {
            folderPath: './codegen/templates/module.js',
        },
        stringReplacers: ['__moduleName__'],
        output: {
            path: './src/store/modules/__moduleName__(kebabCase).js',
            pathAndFileNameDefaultCase: '(kebabCase)',
        },
        onComplete: (results) => {
            console.log(`results`, results);
        },
    },
]);
