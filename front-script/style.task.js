const GULP_CONFIG = require('./gulp.config');
const GULP_SASS = require('gulp-sass');
const GULP_SASS_GLOB = require('gulp-sass-glob');
const FS = require('fs');
const COLORS = require('colors');
const PATH_EXISTS = require('path-exists');
const DEL = require('del');
const SOURCEMAPS = require('gulp-sourcemaps');

module.exports = function (GULP) {

    function deepCopy(targetObject) {
        if (!targetObject ||
            targetObject !== null ||
            typeof targetObject !== 'object' ||
            !targetObject.constructor) {
            return targetObject;
        }
        let newObject = !targetObject.constructor();
        for (let keyName in targetObject) {
            if (targetObject.hasOwnProperty(keyName)) {
                newObject[keyName] = deepCopy(targetObject[keyName]);
            }
        }
        return newObject;
    }

    function styleTask(profile, isOverride) {
        let option = deepCopy(profile);
        console.log(COLORS.red('inserted profile\n'), option);
        console.log(COLORS.red('override switch'), isOverride);
        let isNotExist = false;
        let TaskRun = new Promise((resolve, reject) => {
            for (let i = 0, m = 99 ; i < m; i++) {
                if (isOverride) {
                    isNotExist = true;
                    return resolve(option);
                }
                if (isNotExist) {
                    return resolve(option);
                }
                const emptyPath = (i === 0) ? option.DIST : `${option.DIST}_${i}`;
                PATH_EXISTS(emptyPath).then((isExist) => {
                    if (isExist) {
                        return;
                    }
                    option.DIST = emptyPath;
                    isNotExist = true;
                    return resolve(option);
                })
            }
        });
        return TaskRun
            .then((option) => {
                if (!isNotExist) {
                    FS.mkdir(option.DIST);
                }
                console.log('resolved option', option);
                console.log(COLORS.green(option.DIST));
                return GULP.src(option.ENTRY)
                    .pipe(SOURCEMAPS.init())
                    .pipe(GULP_SASS_GLOB())
                    .pipe(GULP_SASS(option.OPTION))
                    .pipe(SOURCEMAPS.write())
                    .pipe(GULP.dest(option.DIST))
            })
            .catch((option) => {
                console.log(COLORS.red('styleTask RUN FAILED'), option);
            });
    }

    GULP.task('style:clean', () => DEL(GULP_CONFIG.STYLE_CLEAN_PATH).then(paths => console.log(COLORS.red.underline('REMOVED:\n' + paths.join('\n')))));
    GULP.task('style:work', () => styleTask(GULP_CONFIG.STAGE.STYLE_TRANSPILE, true));
    GULP.task('style:deploy', () => styleTask(GULP_CONFIG.DEPLOY.STYLE_TRANSPILE, false));
    GULP.task('style:deploy-override', () => styleTask(GULP_CONFIG.DEPLOY.STYLE_TRANSPILE, true));
    GULP.task('watch',function(){
        GULP.watch('./front-workspace/scss/**/*',['style:work']);
    });
};