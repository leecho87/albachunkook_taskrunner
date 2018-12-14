const GULP = require('gulp');
const GULP_STYLE = require('./front-script/style.task.js');
const GULP_CONFIG = require('./front-script/gulp.config.js');
const IMAGEMIN = require('gulp-imagemin');
const SPRITE = require('gulp.spritesmith');


GULP_STYLE(GULP);

// task_images
gulp.task('IMAGEMIN',function(){
    return gulp.src('./rsc/images/**')
                .pipe(IMAGEMIN({
                    progressive: true,
                    interlaced:true
                }))
                .pipe(gulp.dest('./dist/images'))
});
gulp.task('sprite',function(){
    var spriteData = gulp.src('./rsc/sprite/*')
                    .pipe(SPRITE({
                        imgName : 'sprite_all.png',
                        cssName : 'sprite_all.css',
                        padding : 10
                    }))
                    spriteData.img.pipe(gulp.dest('./dist/sprite'))
                    spriteData.css.pipe(gulp.dest('./dist/sprite'))
});
GULP.task('default', GULP.series('style:work'));