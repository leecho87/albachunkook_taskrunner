## 알바천국 gulp 적용기

**목적**
다양한 패키지를 통한 업무효율향상과 결과물의 압축등을 이용, 최종적으로는 사이트의 성능 향상에 대한 기대

**구조**
~~~
/*
* (section) = 각각의 서비스 (ex. main, person, biz) 등등..
* [] = 폴더
*/

@workspace
|-- (section).scss
|-- [section]
| 		|-- _section_modify
| 		|-- _section_add
|
|-- [common]
| 		|-- _initialize
| 		|-- _mixin
| 		|-- _function
| 		|-- _variable
|
|-- [layout]
| 		|-- _header
| 		|-- _footer
|		|-- _aside
|		|-- _aside(service)
|
|-- [goods]
|		|-- _goods_list
|		|-- _goods_table
|		|-- _goods_effect
|
|-- [component]
| 		|-- _button
| 		|-- _layer
| 		|-- _icons
| 		|-- _search
~~~



**순서**

 - node.js 설치
        다운로드 : <https://nodejs.org/ko/>

 - gulp 설치
        `$ npm install -g gulp` (-g 옵션은 전역설치)

 - npm 감시하기
        `$ npm init` 하여 패키지 초기 설정하기 (`$npm init -y`)로 기본값세팅도 가능

 - package 설치법
        `$ npm install --save-dev package` 로 필요한 패키지 설치
                (--save-dev는 -D로, install은  i로 축약해 사용 가능 === `$ npm i -D package`)
(npm i -D는 devDependencies이며 개발용, npm i --save는 외부용 패키지 입니다. (ex.jQuery) )

 - boiler-plate 활용
       boiler-plate (package.json) 가 있다면 별도의 설정이 필요가 없습니다.
       프로젝트폴더에 package.json을 위치 시키고 `$ npm i` 명령어만 실행하면 boiler-plate의 설정대로 설치합니다.

---

기존엔 /css/ 에서 css작업을 하였지만 앞으로는 새로 생성한 /front-workspace/scss/ 에서 작업을 합니다.
/front-script/gulp.config.js에서 경로설정을 할 수 있으며 추가적으로 필요한 task 구성 시
style.task.js에서 추가하시면 되고, gulp 외에 task는 gulpfile.js로 빼놓았습니다.
