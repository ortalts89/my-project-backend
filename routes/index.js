module.exports = (app) => {
    require('./users')(app);
    require('./posts')(app);
    require('./follow')(app);
    require('./search')(app);
    require('./notifications')(app);
}