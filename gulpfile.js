/**
 * 1.LESS编译、压缩、合并
 * 2.JS合并、压缩混淆
 * 3.image复制
 * 4.html压缩、复制
 * 5.浏览器同步：当项目文件被修改时浏览器自动同步刷新
 */

 var gulp=require('gulp');
 var less=require('gulp-less');
 var concat=require('gulp-concat');
 var cssnano=require('gulp-cssnano');
 var uglify=require('gulp-uglify');
 var htmlmin=require('gulp-htmlmin');
 var browserSync=require('browser-sync').create();


//html压缩复制
gulp.task('copy',function(){
	gulp.src('src/index.html')
		.pipe(htmlmin({collapseWhitespace:true},{}))//先压缩
		.pipe(gulp.dest('dist/'));//再复制
});
 //less编译，压缩,一般不使用合并，因为可以使用@import引入css或less文件
 gulp.task('less',function(){
 	gulp.src('src/less/*.less')
 		.pipe(less())//编译
 		.pipe(cssnano())//压缩
 		.pipe(gulp.dest('dist/css'));
 });

//js合并，压缩混淆
gulp.task('js',function(){
	gulp.src('src/js/*.js')
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

//浏览器同步
gulp.task('sync',['copy','less','js'],function(){
	browserSync.init({
		server:{
			baseDir:'./dist'
		}
	});

	//监听开始
	gulp.watch('src/index.html',['copy']);
	gulp.watch('src/less/*.less',['less']);
	gulp.watch('src/js/*.js',['js']);
});









