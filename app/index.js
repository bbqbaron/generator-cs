'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

// TODO do you want to use LiveScript? Typescript?
// TODO do you want a dev server?
// TODO do you want to use Exoskeleton, if we can get it to work with Marionette?
// TODO do you need to fix CSRF for Django?
// TODO do you want bootstrap styling?

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the glorious' + chalk.red('Cs') + ' generator!'
    ));
  },

  writing: {
    app: function () {
      this.fs.copy(
          this.sourceRoot(),
          this.destinationRoot()
      )
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
