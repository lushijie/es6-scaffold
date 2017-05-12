/*
* @Author: lushijie
* @Date:   2017-05-12 14:34:27
* @Last Modified by:   lushijie
* @Last Modified time: 2017-05-12 15:09:29
*/
module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  plugins: [
    // 'eslint-plugin-react'
  ],
  rules: {
    'jsx-quotes':                   ["error", "prefer-single"], //强制在 JSX 属性中一致地使用单引号
    'no-multi-spaces':              'warn',     // 禁止使用多个空格
    'curly':                        'warn',     // 强制所有控制语句使用一致的括号风格
    'no-debugger':                  'warn',     // 禁用 debugger
    'no-use-before-define':         'warn',     // 禁止在变量定义之前使用它们
    'no-unused-vars':               'warn',     // 禁止出现未使用过的变量
    'no-unused-expressions':        'warn',     // 禁止出现未使用过的表达式
    'no-var':                       'warn',     // 要求使用 let 或 const 而不是 var
    'no-mixed-spaces-and-tabs':     'warn',     // 禁止空格和 tab 的混合缩进
    'eqeqeq':                       'warn',     // 要求使用 === 和 !==
    'no-extra-semi':                'warn',     // 禁止不必要的分号
    'comma-dangle':                 ['warn', 'always-multiline'], // 禁用拖尾逗号
    'indent':                       ['warn', 2],     // 强制使用一致的缩进
    'no-eval':                      'error',    // 禁用 eval()
    'no-redeclare':                 'error',    // 禁止多次声明同一变量'
    'no-cond-assign':               'error',    // 禁止条件表达式中出现赋值操作符
    'no-dupe-args':                 'error',    // 禁止 function 定义中出现重名参数
    'no-dupe-keys':                 'error',    // 禁止对象字面量中出现重复的 key
    'no-duplicate-case':            'error',    // 禁止出现重复的 case 标签
    'no-invalid-regexp':            'error',    // 禁止 RegExp 构造函数中存在无效的正则表达式字符串
    'no-unreachable':               'error',    // 禁止在return、throw、continue 和 break 语句之后出现不可达代码
    'use-isnan':                    'error',    // 要求使用 isNaN() 检查 NaN
    'no-const-assign':              'error',    // 禁止修改 const 声明的变量
    'no-dupe-class-members':        'error',    // 禁止类成员中出现重复的名称
  },
  globals: {
    '$': true
  }
}
