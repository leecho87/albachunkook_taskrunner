const WORKSPACE = './front-workspace/';
const SCSS_FILES = `${WORKSPACE}scss/**/*.scss`;
const CSS_ROOT = './css/';
const CSS_STAGE = `${CSS_ROOT}0_work`;
const DEPLOY_STAGE = `${CSS_ROOT}deploy/`;

const NOW = new Date();
const getDatePadding = (dateNumber) => {
    if (!dateNumber ||
        isNaN(dateNumber)) {
        throw new TypeError('Number format required');
    }
    return (Number(dateNumber) < 10) ? `0${dateNumber}` : dateNumber;
};

const STAGE_STYLE_TRANSPILE = {
    ENTRY: SCSS_FILES,
    OPTION: {
        outputStyle: 'expanded',
    },
    DIST: CSS_STAGE,
};

const DEPLOY_STYLE_TRANSPILE = {
    ENTRY: `${CSS_ROOT}/0_work/*.css`,
    OPTION: {
        outputStyle: 'compressed',
        sourceComments: true
    },
    DIST: [
        DEPLOY_STAGE,
        NOW.getFullYear(),
        getDatePadding((NOW.getMonth() + 1)), // month counted from 0
        getDatePadding(NOW.getDate())
    ].join('')
};

module.exports = {
    STYLE_CLEAN_PATH: `${DEPLOY_STAGE}*`,
    STAGE: {
        STYLE_TRANSPILE: STAGE_STYLE_TRANSPILE,
    },
    DEPLOY: {
        STYLE_TRANSPILE: DEPLOY_STYLE_TRANSPILE,
    },
};