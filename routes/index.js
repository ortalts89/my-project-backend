module.exports = (app) => {
    require('./users')(app);
    require('./posts')(app);
}