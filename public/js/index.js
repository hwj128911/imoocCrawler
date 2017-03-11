require.config({
    paths: {
        jquery: './jquery-3.1.1.min',
        nav: './Nav/nav',
        addButton:'./Nav/addButton',
        navPage:'./Nav/navPage'
    },

});


requirejs(['nav'], function (nav) {
    nav.start();
});